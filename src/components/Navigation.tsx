'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Menu, X } from 'lucide-react';
import { useDeviceOptimization } from '@/hooks/useDeviceOptimization';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { deviceInfo, getOptimalColor, getTextClasses } = useDeviceOptimization();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Shop', href: '/products' },
    { name: 'Community', href: '/community' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-golf' 
          : 'bg-black/40 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo - Mobile First */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
            <Image
              src="/parworld-logo.png"
              alt="Parworld Golf"
              width={40}
              height={40}
              className="rounded-full shadow-golf object-contain bg-white/0 sm:w-12 sm:h-12"
              priority
            />
            <div className="flex flex-col">
              <span className={`font-serif text-lg sm:text-2xl font-bold transition-colors leading-tight ${
                isScrolled ? 'text-golf-green-900' : 'text-white'
              }`}>
                PARWORLD
              </span>
              <span className={`font-sans text-xs sm:text-sm font-medium transition-colors ${
                isScrolled ? 'text-golf-gold-600' : 'text-golf-gold-400'
              }`}>
                GOLF
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-all duration-300 relative group ${
                  isScrolled ? 'text-golf-green-900' : 'text-white'
                }`}
              >
                <span className="relative z-10 group-hover:text-golf-gold-400 transition-colors duration-300">
                {item.name}
                </span>
                <div className="absolute inset-0 bg-golf-gold-400/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-0"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-golf-gold-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
            ))}
          </div>

          {/* Right side icons - Mobile First */}
          <div className="flex items-center space-x-2 sm:space-x-4">

            {/* WhatsApp - Mobile Optimized */}
            <a
              href="https://wa.me/254722897985"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 sm:p-2 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-1.5 sm:p-2 rounded-full hover:bg-white/20 transition-colors ${
                isScrolled ? 'text-golf-green-900' : 'text-white'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-golf-green-100"
          >
            <div className="px-4 py-4 sm:py-6 space-y-3 sm:space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block font-semibold hover:text-golf-gold-500 transition-colors text-base sm:text-lg py-2 ${getTextClasses()}`}
                  style={{ color: getOptimalColor('#004225') }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
