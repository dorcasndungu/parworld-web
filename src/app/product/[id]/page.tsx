'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import ScrollProgress from '@/components/ScrollProgress';
import { GolfItem, fetchAllItems } from '@/lib/firebase';
import { getOptimizedImageUrl, formatPrice } from '@/lib/utils';

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<GolfItem | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const items = await fetchAllItems();
        const foundProduct = items.find(item => item.id === params.id);
        setProduct(foundProduct || null);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadProduct();
    }
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen">
        <ScrollProgress />
        <Navigation />
        <div className="pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center py-20">
              <div className="animate-spin w-16 h-16 border-4 border-golf-green-900 border-t-transparent rounded-full mx-auto mb-6"></div>
              <p className="text-golf-green-900 font-medium text-lg">Loading premium golf equipment...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen">
        <ScrollProgress />
        <Navigation />
        <div className="pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center py-20">
            <h1 className="text-4xl font-bold text-golf-green-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
            <button 
              onClick={() => window.history.back()}
              className="bg-golf-gold-500 hover:bg-golf-gold-600 text-golf-green-900 font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </main>
    );
  }

  const images = product.imageUrls || [];

  return (
    <main className="min-h-screen bg-gray-50">
      <ScrollProgress />
      <Navigation />
      
      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Breadcrumb */}
          <motion.nav 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Home</span>
              <span>/</span>
              <span>Products</span>
              <span>/</span>
              <span className="text-golf-green-900 font-medium">{product.name}</span>
            </div>
          </motion.nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Image Gallery Section */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Main Image */}
              <div className="relative group">
                <div className="aspect-square bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
                  <motion.img
                    key={selectedImageIndex}
                    src={images[selectedImageIndex] || images[0]}
                    alt={product.name}
                    className="w-full h-full object-contain bg-white cursor-zoom-in"
                    onClick={() => setIsImageModalOpen(true)}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    onError={(e) => {
                      console.log('Product image failed to load:', images[selectedImageIndex] || images[0]);
                    }}
                  />
                  
                  {/* Zoom Indicator */}
                  <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to zoom
                  </div>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="flex space-x-4 overflow-x-auto pb-2">
                  {images.map((image, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                        selectedImageIndex === index 
                          ? 'border-golf-gold-500 shadow-lg' 
                          : 'border-gray-200 hover:border-golf-gold-300'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-contain bg-white"
                        onError={(e) => {
                          console.log('Thumbnail failed to load:', image);
                        }}
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Details Section */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Brand & Condition */}
              <div className="flex items-center justify-between">
                {product.brand && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="px-4 py-2 bg-golf-gold-500 text-golf-green-900 rounded-full font-bold text-sm tracking-wider"
                  >
                    {product.brand.toUpperCase()}
                  </motion.div>
                )}
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className={`px-4 py-2 rounded-full font-semibold text-sm ${
                    product.condition === 'New' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {product.condition}
                </motion.div>
              </div>

              {/* Product Title */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-serif text-4xl lg:text-5xl font-bold text-golf-green-900 leading-tight"
              >
                {product.name}
              </motion.h1>

              {/* Price */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl font-bold text-golf-green-900"
              >
                {formatPrice(product.price)}
              </motion.div>

              {/* Description */}
              {product.description && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="prose prose-lg text-gray-700"
                >
                  <p>{product.description}</p>
                </motion.div>
              )}

              {/* Product Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-2 gap-6 p-6 bg-white rounded-2xl shadow-lg"
              >
                {product.category && (
                  <div>
                    <div className="text-sm text-gray-500 font-medium">Category</div>
                    <div className="text-golf-green-900 font-semibold capitalize">{product.category}</div>
                  </div>
                )}
                {product.gender && (
                  <div>
                    <div className="text-sm text-gray-500 font-medium">Gender</div>
                    <div className="text-golf-green-900 font-semibold">{product.gender}</div>
                  </div>
                )}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-4"
              >
                <motion.button
                  onClick={() => window.open(`https://wa.me/254722897985?text=Hi! I want to order: ${product.name} - ${formatPrice(product.price)}`, '_blank')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-golf-gold-500 to-golf-gold-600 text-golf-green-900 font-bold text-xl py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-3">
                    <span>Order via WhatsApp</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </span>
                  
                  {/* Button Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </motion.button>


              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {isImageModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsImageModalOpen(false)}
          >
            <motion.img
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              src={images[selectedImageIndex] || images[0]}
              alt={product.name}
              className="max-w-full max-h-full object-contain rounded-lg bg-white"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute top-4 right-4 text-white text-4xl hover:text-golf-gold-400 transition-colors"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
