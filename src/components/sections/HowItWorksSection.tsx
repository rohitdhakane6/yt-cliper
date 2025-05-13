"use client"
import React from 'react';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link2, ScissorsSquare, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

function Step({ number, title, description, icon, isActive, onClick }: StepProps) {
  return (
    <motion.div
      className={`relative flex items-start gap-4 p-6 border rounded-lg cursor-pointer transition-all duration-300 ${
        isActive 
          ? 'border-indigo-300 bg-indigo-50 shadow-md dark:border-indigo-800 dark:bg-indigo-900/30' 
          : 'border-gray-200 hover:border-indigo-200 dark:border-gray-800 dark:hover:border-indigo-900'
      }`}
      whileHover={{ y: -5 }}
      onClick={onClick}
    >
      <div className={`flex items-center justify-center h-10 w-10 rounded-full text-white ${
        isActive ? 'bg-indigo-600 dark:bg-indigo-500' : 'bg-gray-400 dark:bg-gray-700'
      }`}>
        {number}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <div className={`p-1 rounded ${
            isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'
          }`}>
            {icon}
          </div>
          <h3 className={`font-semibold ${
            isActive ? 'text-indigo-800 dark:text-indigo-300' : 'text-gray-900 dark:text-gray-100'
          }`}>
            {title}
          </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
      </div>
    </motion.div>
  );
}

export default function HowItWorksSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = React.useState(1);
  
  const steps = [
    {
      number: 1,
      title: "Paste YouTube URL",
      description: "Start by pasting the URL of the YouTube video you want to clip.",
      icon: <Link2 className="h-5 w-5" />,
    },
    {
      number: 2,
      title: "Create Your Clip",
      description: "Set your start and end time to create the perfect clip.",
      icon: <ScissorsSquare className="h-5 w-5" />,
    },
    {
      number: 3,
      title: "Share and Download",
      description: "Share your clip via a short link or download for offline use.",
      icon: <Share2 className="h-5 w-5" />,
    },
  ];
  
  // Content for each step
  const stepContent = [
    // Step 1
    <div key={1} className="bg-white dark:bg-gray-900 shadow-xl rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
      <div className="p-4 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex space-x-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-300">clipcraft.app</div>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">Secure connection</div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Step 1: Paste Your YouTube URL</h3>
        <div className="mb-6">
          <div className="border rounded-lg overflow-hidden">
            <div className="p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Enter YouTube URL</span>
            </div>
            <div className="p-4 flex gap-2">
              <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded p-2 text-sm text-gray-500 dark:text-gray-400">
                https://www.youtube.com/watch?v=dQw4w9WgXcQ
              </div>
              <Button variant="default" size="sm" className="whitespace-nowrap">
                Fetch Video
              </Button>
            </div>
          </div>
        </div>
        <div className="h-40 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
      </div>
    </div>,
    
    // Step 2
    <div key={2} className="bg-white dark:bg-gray-900 shadow-xl rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
      <div className="p-4 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex space-x-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-300">clipcraft.app</div>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">Video loaded</div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Step 2: Create Your Clip</h3>
        <div className="mb-6">
          <div className="h-40 bg-gray-900 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                <div className="h-8 w-8 rounded-full bg-white"></div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/80 to-transparent p-2 flex items-center">
              <div className="w-full bg-gray-700 h-1 rounded-full overflow-hidden">
                <div className="bg-red-600 h-full w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Start Time</div>
            <div className="flex gap-2">
              <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-center flex-1">
                <span className="text-gray-900 dark:text-gray-100">00:45</span>
              </div>
              <Button variant="outline" size="sm" className="whitespace-nowrap">
                Set Current
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">End Time</div>
            <div className="flex gap-2">
              <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-center flex-1">
                <span className="text-gray-900 dark:text-gray-100">01:32</span>
              </div>
              <Button variant="outline" size="sm" className="whitespace-nowrap">
                Set Current
              </Button>
            </div>
          </div>
        </div>
        <Button className="w-full">Create Clip</Button>
      </div>
    </div>,
    
    // Step 3
    <div key={3} className="bg-white dark:bg-gray-900 shadow-xl rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
      <div className="p-4 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex space-x-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-300">clipcraft.app</div>
        </div>
        <div className="text-xs py-1 px-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded">Clip Ready</div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Step 3: Share and Download</h3>
        <div className="mb-6">
          <div className="h-40 bg-gray-900 rounded-lg relative overflow-hidden flex items-center justify-center">
            <div className="text-white font-bold">Your clip is ready!</div>
          </div>
        </div>
        <div className="mb-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Share Link</div>
          <div className="flex gap-2">
            <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded p-2 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              https://clipcraft.app/c/a1b2c3d4
            </div>
            <Button variant="outline" size="sm" className="whitespace-nowrap">
              Copy
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="flex gap-2 items-center justify-center">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.2039 15.5229L19.9199 15.9049C19.9199 9.43291 13.4859 8.69691 13.4859 8.69691V3.60291L7.78387 9.30491L13.4859 15.0069V10.4389C18.0199 11.0509 18.2039 15.5229 18.2039 15.5229Z" />
              <path d="M13.4859 16.5449H5.48587V19.3909H13.4859V22.9949L19.1879 17.2929L13.4859 11.5909V16.5449Z" />
            </svg>
            Share
          </Button>
          <Button variant="default" className="flex gap-2 items-center justify-center">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
            Download
          </Button>
        </div>
      </div>
    </div>,
  ];
  
  return (
    <section id="how-it-works" ref={sectionRef} className="py-20 bg-white dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            <span className="text-indigo-600 dark:text-indigo-400">How It Works</span> - Simple as 1-2-3
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Creating and sharing YouTube clips has never been easier. 
            Follow these simple steps to make your first clip.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-4"
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {steps.map((step) => (
              <Step 
                key={step.number}
                number={step.number}
                title={step.title}
                description={step.description}
                icon={step.icon}
                isActive={activeStep === step.number}
                onClick={() => setActiveStep(step.number)}
              />
            ))}
          </motion.div>
          
          <motion.div
            className="lg:pl-8"
            initial={{ x: 50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {stepContent[activeStep - 1]}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}