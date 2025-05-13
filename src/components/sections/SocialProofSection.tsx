import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  avatar: string;
  delay: number;
}

function Testimonial({ quote, author, role, avatar, delay }: TestimonialProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Card className="p-6 h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900">
        <div className="flex space-x-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <blockquote className="text-gray-700 dark:text-gray-300 mb-6">
          "{quote}"
        </blockquote>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={avatar} />
            <AvatarFallback>{author.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-gray-900 dark:text-gray-100">{author}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{role}</div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default function SocialProofSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const testimonials = [
    {
      quote: "I used to spend hours trying to share specific parts of YouTube videos with my team. ClipCraft has made this process incredibly simple and efficient.",
      author: "Alex Morgan",
      role: "Marketing Director",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      quote: "As a teacher, I regularly clip YouTube videos for my online classes. ClipCraft saves me so much time and the sharing options are perfect for my students.",
      author: "Sarah Johnson",
      role: "High School Teacher",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      quote: "The simplicity of ClipCraft is what makes it stand out. I can create professional-looking clips for my social media in just a few clicks.",
      author: "James Wilson",
      role: "Content Creator",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];
  
  const brands = [
    "TechCrunch", "Wired", "Forbes", "Business Insider", "Product Hunt"
  ];
  
  return (
    <section id="testimonials" ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-950">
      <div className="container px-4 mx-auto">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Trusted by <span className="text-indigo-600 dark:text-indigo-400">Thousands</span> of Users
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Don't just take our word for it. Here's what our users have to say about their ClipCraft experience.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial 
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              avatar={testimonial.avatar}
              delay={index * 0.1}
            />
          ))}
        </div>
        
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-8">
            Featured in
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            {brands.map((brand, index) => (
              <motion.div 
                key={index}
                className="text-xl md:text-2xl font-bold text-gray-400 dark:text-gray-600"
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                {brand}
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-20 bg-white dark:bg-gray-900 rounded-2xl p-8 md:p-12 shadow-lg grid md:grid-cols-3 gap-8 items-center"
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-10 w-1 bg-indigo-600 dark:bg-indigo-400"></div>
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">SUCCESS STORY</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              How a marketing agency saved 15+ hours per week with ClipCraft
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              "Our social media team used to spend hours creating clips from longer videos. 
              With ClipCraft, we've streamlined our workflow and significantly increased our content output."
            </p>
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src="https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                <AvatarFallback>MJ</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100">Michael Jordan</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">CEO, Digital Edge Marketing</div>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute -top-6 -left-6 h-20 w-20 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg z-0"></div>
              <div className="absolute -bottom-6 -right-6 h-20 w-20 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg z-0"></div>
              <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-4 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="font-medium">Time spent on video editing</div>
                  <div className="text-sm text-gray-500">Per week</div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Before ClipCraft</span>
                      <span className="text-sm font-bold">23h</span>
                    </div>
                    <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 w-[95%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">With ClipCraft</span>
                      <span className="text-sm font-bold">8h</span>
                    </div>
                    <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-[30%]"></div>
                    </div>
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