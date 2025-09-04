'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full border-2" style={{ borderColor: 'var(--golf-green-900)' }}></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full border-2" style={{ borderColor: 'var(--golf-gold-500)' }}></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full border-2" style={{ borderColor: 'var(--golf-green-600)' }}></div>
      </div>

      <div className="relative z-10 text-center">
        {/* Animated Golf Ball */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-20 h-20 mx-auto bg-gradient-to-br from-golf-green-900 to-golf-green-700 rounded-full flex items-center justify-center shadow-2xl"
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-golf-gold-500 rounded-full"></div>
            </div>
          </motion.div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="font-serif text-2xl font-semibold text-golf-green-900 mb-2">
            Loading...
          </h2>
          <p className="text-gray-600">
            Preparing your premium golf experience
          </p>
        </motion.div>

        {/* Loading Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center space-x-2 mt-6"
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
              className="w-2 h-2 bg-golf-green-600 rounded-full"
            />
          ))}
        </motion.div>
      </div>
    </main>
  );
}
