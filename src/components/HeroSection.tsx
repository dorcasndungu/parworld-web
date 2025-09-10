'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-[85vh] sm:h-[90vh] md:h-screen flex items-end justify-start overflow-hidden bg-golf-green-900">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-image.jpg"
          alt="Golf Course"
          className="w-full h-full object-cover"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />

        {/* Gradient overlay for premium positioning */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
      </div>

      {/* Content - Mobile First Positioning */}
      <div className="relative z-20 text-left text-white max-w-2xl mx-4 sm:mx-6 md:mx-16 lg:mx-20 pb-16 sm:pb-20 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight">
            Elevate Your Game
          </h1>
          <h2 className="text-golf-gold-400 text-lg sm:text-xl md:text-2xl font-medium tracking-wide mb-6 sm:mb-8 md:mb-10">
            Premium Gear. Timeless Style.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Link href="/products">
          <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
              className="btn-premium text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 min-w-[180px] sm:min-w-[200px] md:min-w-[220px] shadow-2xl font-semibold tracking-wide"
          >
            Shop Now
          </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Subtle Scroll Indicator - Mobile Optimized */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-white z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center space-y-1 sm:space-y-2"
        >
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 opacity-70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
