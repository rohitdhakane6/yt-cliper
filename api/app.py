import os
import uuid
import subprocess
from flask import Flask, request, jsonify, send_file
from tempfile import TemporaryDirectory
from flask_cors import CORS
import sys

app = Flask(__name__)
CORS(app)

# Utility to convert seconds to HH:MM:SS
def seconds_to_time(seconds):
    h = seconds // 3600
    m = (seconds % 3600) // 60
    s = seconds % 60
    return f"{h:02}:{m:02}:{s:02}"

# Download a video clip from YouTube using yt-dlp and ffmpeg
def download_video(url, start_time, end_time, output_path):
    section = f"*{start_time}-{end_time}"
    output_base = output_path.replace(".mp4", "")  # yt-dlp will append .mp4

    ydl_command = [
        'yt-dlp',
        '-f', 'bestvideo+bestaudio',
        '--merge-output-format', 'mp4',
        '--download-sections', section,
        '-o', output_base,
        url
    ]

    subprocess.run(ydl_command, check=True)

    final_path = output_base + ".mp4"
    if not os.path.exists(final_path):
        raise FileNotFoundError(f"Expected output not found: {final_path}")
    
    return final_path

@app.route('/api/download', methods=['POST'])
def download_video_clip():
    data = request.json
    url = data.get('url')
    start = data.get('start_time')
    end = data.get('end_time')

    if not url or end is None:
        return jsonify({'error': 'Missing url or end_time'}), 400

    try:
        start = int(start)
        end = int(end)
    except ValueError:
        return jsonify({'error': 'start_time and end_time must be integers'}), 400

    if end <= start:
        return jsonify({'error': 'end_time must be greater than start_time'}), 400

    start_time = seconds_to_time(start)
    end_time = seconds_to_time(end)

    clip_id = str(uuid.uuid4())[:8]
    filename = f"clip_{clip_id}.mp4"

    try:
        with TemporaryDirectory() as tmpdir:
            output_path = os.path.join(tmpdir, filename)
            final_path = download_video(url, start_time, end_time, output_path)

            return send_file(
                final_path,
                mimetype='video/mp4',
                as_attachment=True,
                download_name=filename
            )

    except subprocess.CalledProcessError as e:
        return jsonify({'error': 'Download failed', 'details': str(e)}), 500
    except FileNotFoundError as fe:
        return jsonify({'error': 'Clip not found', 'details': str(fe)}), 500

@app.route('/')
def root():
    return jsonify({'message': 'Welcome to the YouTube Clip API'})

if __name__ == '__main__':

    # Check for environment argument
    env = sys.argv[1] if len(sys.argv) > 1 else 'dev'

    if env == 'prod':
        app.run(host='0.0.0.0', port=8000)
    else:
        app.run(debug=True)
