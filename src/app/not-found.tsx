'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full border-2" style={{ borderColor: 'var(--golf-green-900)' }}></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full border-2" style={{ borderColor: 'var(--golf-gold-500)' }}></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full border-2" style={{ borderColor: 'var(--golf-green-600)' }}></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Golf Ball Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-golf-green-900 to-golf-green-700 rounded-full flex items-center justify-center shadow-2xl">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-golf-gold-500 rounded-full flex items-center justify-center">
                  <span className="text-golf-green-900 font-bold text-lg">4</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl font-bold text-golf-green-900 mb-4">
              404
            </h1>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-golf-green-800 mb-4">
              Page Not Found
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-lg mx-auto leading-relaxed">
              Looks like this page has gone out of bounds. Don't worry, even the best golfers miss the fairway sometimes.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-golf-green-900 to-golf-green-800 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3"
              >
                <Home className="w-5 h-5" />
                <span>Back to Home</span>
              </motion.button>
            </Link>
            
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-golf-gold-500 to-golf-gold-600 text-golf-green-900 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3"
              >
                <Search className="w-5 h-5" />
                <span>Browse Products</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Helpful Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 pt-8 border-t border-gray-200"
          >
            <p className="text-gray-500 mb-4">Or try these popular pages:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/products" className="text-golf-green-600 hover:text-golf-green-800 font-medium transition-colors">
                Shop Equipment
              </Link>
              <Link href="/community" className="text-golf-green-600 hover:text-golf-green-800 font-medium transition-colors">
                Join Community
              </Link>
              <Link href="/about" className="text-golf-green-600 hover:text-golf-green-800 font-medium transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="text-golf-green-600 hover:text-golf-green-800 font-medium transition-colors">
                Contact
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
