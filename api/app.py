import os
import uuid
import subprocess
import time
import random
import logging
from flask import Flask, request, jsonify, send_file
from tempfile import TemporaryDirectory
from flask_cors import CORS
import sys
from datetime import datetime

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("youtube_clip_api.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Configuration
COOKIES_DIR = os.environ.get('COOKIES_DIR', './cookies')
os.makedirs(COOKIES_DIR, exist_ok=True)

# Cookie management
class CookieManager:
    def __init__(self, cookies_dir=COOKIES_DIR):
        self.cookies_dir = cookies_dir
        
    def get_available_cookie_file(self):
        """Returns path to a working cookie file from the pool"""
        cookie_files = [f for f in os.listdir(self.cookies_dir) if f.endswith('.txt')]
        
        if not cookie_files:
            logger.warning("No cookie files available")
            return None
            
        # Shuffle to distribute load
        random.shuffle(cookie_files)
        
        for cookie_file in cookie_files:
            path = os.path.join(self.cookies_dir, cookie_file)
            # Check if this cookie is not too old
            if self._is_cookie_fresh(path):
                return path
                
        # If we get here, all cookies might be stale
        logger.warning("All cookies may be stale")
        if cookie_files:  # Return the first one anyway if we have any
            return os.path.join(self.cookies_dir, cookie_files[0])
        return None
    
    def _is_cookie_fresh(self, cookie_path):
        """Check if the cookie file is still fresh enough to use"""
        modified_time = os.path.getmtime(cookie_path)
        age_in_days = (time.time() - modified_time) / (60*60*24)
        return age_in_days < 7  # Consider cookies older than 7 days as potentially stale

# Initialize cookie manager
cookie_manager = CookieManager()

# Utility to convert seconds to HH:MM:SS
def seconds_to_time(seconds):
    h = seconds // 3600
    m = (seconds % 3600) // 60
    s = seconds % 60
    return f"{h:02}:{m:02}:{s:02}"

# Download a video clip from YouTube using yt-dlp and ffmpeg
def download_video(url, start_time, end_time, output_path, retry_count=2):
    section = f"*{start_time}-{end_time}"
    output_base = output_path.replace(".mp4", "")  # yt-dlp will append .mp4
    
    # Get a cookie file if available
    cookie_file = cookie_manager.get_available_cookie_file()
    
    # Different user agents to rotate through
    user_agents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"
    ]
    
    for attempt in range(retry_count + 1):
        try:
            # Select a random user agent
            user_agent = random.choice(user_agents)
            
            ydl_command = [
                'yt-dlp',
                '-f', 'bestvideo[height<=720]+bestaudio/best[height<=720]',  # Limit quality to reduce bandwidth impact
                '--merge-output-format', 'mp4',
                '--download-sections', section,
                '-o', output_base,
                '--user-agent', user_agent,
                '--no-warnings'
            ]
            
            # Add cookies if available
            if cookie_file:
                ydl_command.extend(['--cookies', cookie_file])
                
            # Add retry options
            ydl_command.extend([
                '--retries', '3',
                '--fragment-retries', '3',
                '--file-access-retries', '3'
            ])
            
            # Add the URL
            ydl_command.append(url)
            
            logger.info(f"Starting download attempt {attempt+1} for {url}")
            # Remove sensitive info for logging
            log_command = ydl_command.copy()
            if cookie_file:
                cookie_index = log_command.index('--cookies')
                log_command[cookie_index+1] = "[COOKIE_PATH_REDACTED]"
            logger.debug(f"Command: {' '.join(log_command)}")
            
            # Execute the command
            process = subprocess.run(
                ydl_command, 
                check=True, 
                capture_output=True, 
                text=True
            )
            
            # Check if the file exists
            final_path = output_base + ".mp4"
            if not os.path.exists(final_path):
                raise FileNotFoundError(f"Expected output not found: {final_path}")
            
            logger.info(f"Successfully downloaded {url} to {final_path}")
            return final_path
            
        except subprocess.CalledProcessError as e:
            logger.error(f"Download failed on attempt {attempt+1}: {e}")
            logger.error(f"STDOUT: {e.stdout}")
            logger.error(f"STDERR: {e.stderr}")
            
            # Check for authentication errors
            if "Sign in to confirm you're not a bot" in e.stderr:
                logger.warning("Authentication error detected - cookie might be invalid")
                # Try with a different cookie next time
                cookie_file = None
            
            # Rate limiting or temporary issue
            if attempt < retry_count:
                backoff_time = (2 ** attempt) + random.uniform(0, 1)  # Exponential backoff
                logger.info(f"Retrying in {backoff_time:.2f} seconds...")
                time.sleep(backoff_time)
            else:
                raise

@app.route('/api/download', methods=['POST'])
def download_video_clip():
    data = request.json
    url = data.get('url')
    start = data.get('start_time')
    end = data.get('end_time')

    # Log request (without sensitive info)
    logger.info(f"Received download request for URL: {url}")

    if not url or end is None:
        return jsonify({'error': 'Missing url or end_time'}), 400

    try:
        start = int(start)
        end = int(end)
    except ValueError:
        return jsonify({'error': 'start_time and end_time must be integers'}), 400

    if end <= start:
        return jsonify({'error': 'end_time must be greater than start_time'}), 400

    # Limit clip duration to prevent abuse
    if end - start > 300:  # 5 minute limit
        return jsonify({'error': 'Clip duration cannot exceed 5 minutes'}), 400

    start_time = seconds_to_time(start)
    end_time = seconds_to_time(end)

    clip_id = str(uuid.uuid4())[:8]
    filename = f"clip_{clip_id}.mp4"

    try:
        with TemporaryDirectory() as tmpdir:
            output_path = os.path.join(tmpdir, filename)
            final_path = download_video(url, start_time, end_time, output_path)

            logger.info(f"Sending file: {filename}")
            return send_file(
                final_path,
                mimetype='video/mp4',
                as_attachment=True,
                download_name=filename
            )

    except subprocess.CalledProcessError as e:
        error_msg = "Download failed"
        if "Sign in to confirm you're not a bot" in str(e.stderr):
            error_msg = "YouTube authentication required. Please try again later."
        
        logger.error(f"Download error: {error_msg}")
        return jsonify({'error': error_msg, 'details': str(e.stderr)}), 500
    
    except FileNotFoundError as fe:
        logger.error(f"File not found: {str(fe)}")
        return jsonify({'error': 'Clip not found', 'details': str(fe)}), 500
    
    except Exception as ex:
        logger.error(f"Unexpected error: {str(ex)}", exc_info=True)
        return jsonify({'error': 'An unexpected error occurred'}), 500

@app.route('/api/status', methods=['GET'])
def api_status():
    status = {
        'status': 'online',
        'time': datetime.now().isoformat(),
        'cookies_available': os.path.exists(COOKIES_DIR) and len(os.listdir(COOKIES_DIR)) > 0
    }
    return jsonify(status)

@app.route('/')
def root():
    return jsonify({'message': 'Welcome to the YouTube Clip API'})

# Script to generate a cookie file from a browser session
def generate_cookie_file():
    """
    This is a placeholder for a function that would use browser automation
    to generate fresh cookie files. In a real implementation, you would:
    1. Use Playwright or Selenium to automate browser login
    2. Export cookies to the cookies directory
    """
    logger.info("Cookie generation would happen here")
    pass

if __name__ == '__main__':
    # Check for environment argument
    env = sys.argv[1] if len(sys.argv) > 1 else 'dev'

    if env == 'prod':
        # In production, might want to use gunicorn or uwsgi instead
        app.run(host='0.0.0.0', port=8000)
    else:
        app.run(debug=True)