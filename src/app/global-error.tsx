'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global application error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-20 w-32 h-32 rounded-full border-2" style={{ borderColor: 'var(--golf-green-900)' }}></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full border-2" style={{ borderColor: 'var(--golf-gold-500)' }}></div>
            <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full border-2" style={{ borderColor: 'var(--golf-green-600)' }}></div>
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
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-golf-green-900 mb-4">
                  System Error
                </h1>
                <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-semibold text-golf-green-800 mb-4">
                  Application Unavailable
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 max-w-lg mx-auto leading-relaxed mb-4">
                  We're experiencing technical difficulties. Our team is working to resolve this issue as quickly as possible.
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
                  className="bg-gradient-to-r from-golf-green-900 to-golf-green-800 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>Try Again</span>
                </motion.button>
                
                <motion.button
                  onClick={() => window.location.href = '/'}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-golf-gold-500 to-golf-gold-600 text-golf-green-900 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3"
                >
                  <Home className="w-5 h-5" />
                  <span>Go Home</span>
                </motion.button>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-12 pt-8 border-t border-gray-200"
              >
                <p className="text-gray-500 mb-4">If this problem persists, please contact us:</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a 
                    href="https://wa.me/254722897985" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-golf-green-600 hover:text-golf-green-800 font-medium transition-colors"
                  >
                    WhatsApp: +254 722 897 985
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
