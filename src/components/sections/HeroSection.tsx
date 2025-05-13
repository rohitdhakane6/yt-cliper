"use client"
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Scissors, Play } from 'lucide-react';

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  return (
    <section ref={ref} className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-950 -z-10" />
      
      {/* Animated shapes */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div 
          className="absolute top-1/4 left-1/4 h-56 w-56 rounded-full bg-gradient-to-r from-purple-300 to-indigo-300 blur-3xl opacity-30 dark:opacity-10"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.3 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-orange-300 to-pink-300 blur-3xl opacity-30 dark:opacity-10"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.3 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        />
      </div>
      
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            style={{ y, opacity }}
            className="mb-6 flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Scissors className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              Clip any YouTube video in seconds
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Create and Share YouTube Clips with Ease
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Transform any YouTube video into shareable snippets in just a few clicks. No software to install, no sign-up required.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg">
              Start Clipping Now
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Play className="h-4 w-4" />
              Watch Demo
            </Button>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-16 md:mt-20 relative max-w-5xl mx-auto"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.pexels.com/photos/4009409/pexels-photo-4009409.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="ClipCraft in action" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-sm font-medium">Live Demo</span>
                </div>
                <h3 className="text-xl font-semibold mb-1">Quick Tutorial: How to Create Your First Clip</h3>
                <p className="text-sm text-gray-300">See how easy it is to clip and share your favorite moments</p>
              </div>
            </div>
          </div>
          
          {/* Floating controls */}
          <div className="absolute -top-6 md:-top-8 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 shadow-lg rounded-full px-6 py-3 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Clip</span>
            </div>
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-700"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Share</span>
            </div>
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-700"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Download</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-20 flex flex-wrap justify-center gap-8 md:gap-16"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="flex flex-col items-center">
            <p className="text-3xl md:text-4xl font-bold text-indigo-600 dark:text-indigo-400">2M+</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Clips Created</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-3xl md:text-4xl font-bold text-indigo-600 dark:text-indigo-400">45K+</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Daily Users</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-3xl md:text-4xl font-bold text-indigo-600 dark:text-indigo-400">4.9</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">User Rating</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}