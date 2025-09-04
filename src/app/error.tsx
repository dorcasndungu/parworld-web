'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Link from 'next/link';
import { Home, RefreshCw, AlertTriangle } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <main className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f0f9f4 0%, #ffffff 50%, #f1d956 100%)' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full border-2 animate-pulse" style={{ borderColor: '#004225' }}></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full border-2 animate-bounce" style={{ borderColor: '#f1d956' }}></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full border-2 animate-pulse" style={{ borderColor: '#004225' }}></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full border-2 animate-bounce" style={{ borderColor: '#f1d956' }}></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Error Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl">
              <AlertTriangle className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-4" style={{ color: '#004225' }}>
              Oops!
            </h1>
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-semibold mb-4" style={{ color: '#004225' }}>
              Something went wrong
            </h2>
            <p className="text-lg sm:text-xl max-w-lg mx-auto leading-relaxed mb-4" style={{ color: '#004225' }}>
              We encountered an unexpected error. Don't worry, our team has been notified and we're working to fix it.
            </p>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-4 p-4 bg-gray-100 rounded-lg text-left">
                <summary className="cursor-pointer font-medium text-gray-700">Error Details (Development)</summary>
                <pre className="mt-2 text-sm text-gray-600 overflow-auto">
                  {error.message}
                </pre>
              </details>
            )}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              onClick={reset}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3"
              style={{ 
                background: 'linear-gradient(135deg, #004225 0%, #006633 100%)',
                color: '#ffffff',
                boxShadow: '0 10px 25px rgba(0, 66, 37, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 66, 37, 0.4), 0 0 20px rgba(241, 217, 86, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 66, 37, 0.3)';
              }}
            >
              <RefreshCw className="w-5 h-5" />
              <span>Try Again</span>
            </motion.button>
            
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3"
                style={{ 
                  background: 'linear-gradient(135deg, #f1d956 0%, #e6c547 100%)',
                  color: '#004225',
                  boxShadow: '0 10px 25px rgba(241, 217, 86, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(241, 217, 86, 0.4), 0 0 20px rgba(0, 66, 37, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(241, 217, 86, 0.3)';
                }}
              >
                <Home className="w-5 h-5" />
                <span>Go Home</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 pt-8"
            style={{ borderTop: '2px solid rgba(0, 66, 37, 0.2)' }}
          >
            <p className="mb-4 font-medium" style={{ color: '#004225' }}>Need help? Contact our support team:</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a 
                href="https://wa.me/254722897985" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-semibold transition-all duration-300 hover:scale-105"
                style={{ color: '#004225' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#f1d956';
                  e.currentTarget.style.textShadow = '0 0 10px rgba(241, 217, 86, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#004225';
                  e.currentTarget.style.textShadow = 'none';
                }}
              >
                WhatsApp Support
              </a>
              <Link 
                href="/contact" 
                className="font-semibold transition-all duration-300 hover:scale-105"
                style={{ color: '#004225' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#f1d956';
                  e.currentTarget.style.textShadow = '0 0 10px rgba(241, 217, 86, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#004225';
                  e.currentTarget.style.textShadow = 'none';
                }}
              >
                Contact Form
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
