"use client"
import { useRef } from 'react';
import { 
  ScissorsSquare, 
  Share2, 
  Clock, 
  Download 
} from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

function FeatureCard({ icon, title, description, index }: FeatureCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="border-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 h-full">
        <CardContent className="pt-6">
          <div className="mb-5 inline-flex p-3 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
            {icon}
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const features = [
    {
      icon: <ScissorsSquare className="h-6 w-6" />,
      title: "One-Click Clipping",
      description: "Simply paste a YouTube URL, set your start and end times, and create a perfect clip in seconds.",
    },
    {
      icon: <Share2 className="h-6 w-6" />,
      title: "Instant Sharing",
      description: "Share your clips directly to social media or copy a short link to send anywhere.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Time-Saving",
      description: "No need to download videos or use complicated software. Everything happens in your browser.",
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Download Options",
      description: "Save your clips in multiple formats and qualities for offline viewing or editing.",
    },
  ];
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  return (
    <section id="features" ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-950">
      <div className="container px-4 mx-auto">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Powerful Features, <span className="text-indigo-600 dark:text-indigo-400">Simple Interface</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Our tool combines powerful video editing capabilities with an intuitive interface, 
            making it easy for anyone to create professional-looking clips.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
        
        <motion.div 
          className="mt-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden"
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Background pattern */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
            <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M0 20 L40 20" fill="none" stroke="white" strokeWidth="1" />
                  <path d="M20 0 L20 40" fill="none" stroke="white" strokeWidth="1" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
            </svg>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="md:w-1/2">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to create your first YouTube clip?
              </h3>
              <p className="text-indigo-100 mb-6">
                Start creating engaging, shareable video clips from your favorite YouTube videos 
                in just a few seconds.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a 
                  href="#"
                  className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Get Started for Free
                  <svg 
                    className="ml-2 h-5 w-5" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </a>
              </motion.div>
            </div>
            
            <div className="md:w-2/5">
              <div className="bg-white/10 backdrop-blur p-6 rounded-lg border border-white/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-400"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                    <div className="h-3 w-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-1 h-6 bg-white/5 rounded text-center flex items-center justify-center">
                    <span className="text-xs text-white/60">clipcraft.app</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-8 bg-white/5 rounded w-full"></div>
                  <div className="h-24 bg-white/5 rounded w-full"></div>
                  <div className="flex space-x-2">
                    <div className="h-8 bg-indigo-400/20 rounded w-1/2"></div>
                    <div className="h-8 bg-indigo-400/40 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}