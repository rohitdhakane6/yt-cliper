"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Scissors } from 'lucide-react';
import { toast } from 'sonner';

export default function CTASection() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!youtubeUrl) {
      toast.error("Please enter a YouTube URL");
      return;
    }
    
    // Simple validation
    if (!youtubeUrl.includes('youtube.com') && !youtubeUrl.includes('youtu.be')) {
      toast.error("Please enter a valid YouTube URL");
      return;
    }
    
    toast("Your clip is being created. This would redirect to the editor.");
    
    // In a real app, this would redirect to the editor or process the URL
    console.log("Processing URL:", youtubeUrl);
  };
  
  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="bg-gradient-to-br from-indigo-600 to-purple-700 dark:from-indigo-700 dark:to-purple-900 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Background pattern */}
            <div className="absolute top-0 left-0 right-0 h-full overflow-hidden">
              <div className="absolute -top-4 -right-4 h-32 w-32 bg-white/10 rounded-full"></div>
              <div className="absolute bottom-0 left-0 h-40 w-40 bg-white/10 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
              <div className="absolute top-1/2 right-1/4 h-24 w-24 bg-white/10 rounded-full transform translate-y-1/2"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <div className="md:flex-1">
                  <div className="flex items-center gap-2 mb-6">
                    <Scissors className="h-6 w-6 text-white" />
                    <span className="text-lg font-bold text-white">ClipCraft</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Ready to Create Your First Clip?
                  </h2>
                  <p className="text-indigo-100 mb-6 md:mb-0">
                    Just paste a YouTube URL below to get started. No sign-up required - it's completely free!
                  </p>
                </div>
                
                <div className="md:flex-1">
                  <form onSubmit={handleSubmit}>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-inner">
                      <label className="block text-white text-sm font-medium mb-2" htmlFor="youtube-url">
                        YouTube URL
                      </label>
                      <div className="flex gap-3 flex-col sm:flex-row">
                        <Input
                          id="youtube-url"
                          type="text"
                          value={youtubeUrl}
                          onChange={(e) => setYoutubeUrl(e.target.value)}
                          placeholder="https://www.youtube.com/watch?v=..."
                          className="bg-white/20 border-white/20 text-white placeholder:text-white/60"
                        />
                        <Button 
                          type="submit" 
                          variant="default"
                          className="bg-white text-indigo-600 hover:bg-indigo-100 font-semibold whitespace-nowrap"
                        >
                          Create Clip
                        </Button>
                      </div>
                      <p className="mt-3 text-xs text-white/70">
                        By using our service, you agree to our Terms of Service and Privacy Policy.
                      </p>
                    </div>
                  </form>
                  
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        <div className="h-8 w-8 rounded-full bg-indigo-400 border-2 border-indigo-600 flex items-center justify-center text-xs font-bold text-white">JD</div>
                        <div className="h-8 w-8 rounded-full bg-purple-400 border-2 border-indigo-600 flex items-center justify-center text-xs font-bold text-white">MK</div>
                        <div className="h-8 w-8 rounded-full bg-pink-400 border-2 border-indigo-600 flex items-center justify-center text-xs font-bold text-white">RB</div>
                      </div>
                      <div className="text-sm text-white">Trusted by 100,000+ users</div>
                    </div>
                    
                    <div className="hidden sm:flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="h-4 w-4 fill-yellow-300 text-yellow-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h3>
            <div className="grid gap-6 mt-8 md:grid-cols-2">
              <div className="text-left">
                <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Is ClipCraft completely free?</h4>
                <p className="text-gray-600 dark:text-gray-400">Yes, the basic clip creation functionality is completely free. We also offer premium features for more advanced users.</p>
              </div>
              <div className="text-left">
                <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Do I need to create an account?</h4>
                <p className="text-gray-600 dark:text-gray-400">No account is needed for basic clips. Creating an account gives you access to clip history and more sharing options.</p>
              </div>
              <div className="text-left">
                <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">How long can my clips be?</h4>
                <p className="text-gray-600 dark:text-gray-400">Free users can create clips up to 3 minutes long. Premium users can create clips up to 10 minutes.</p>
              </div>
              <div className="text-left">
                <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Can I add my own branding?</h4>
                <p className="text-gray-600 dark:text-gray-400">Premium users can add custom watermarks, intros, and outros to their clips.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}