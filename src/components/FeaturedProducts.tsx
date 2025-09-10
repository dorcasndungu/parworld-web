'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { GolfItem, fetchFeaturedItems, fetchAllItems } from '@/lib/firebase';
import { formatPrice } from '@/lib/utils';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<GolfItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        console.log('🔍 FeaturedProducts: Starting to load products...');

        // First, let's see ALL items in the database
        console.log('🔍 Testing: Fetching ALL items first...');
        const allItems = await fetchAllItems();
        console.log('🔍 ALL ITEMS in database:', allItems);
        console.log('🔍 Total items found:', allItems.length);

        if (allItems.length > 0) {
          console.log('🔍 Sample item structure:', allItems[0]);
          console.log('🔍 Items with isVisible=true:', allItems.filter(item => item.isVisible === true).length);
          console.log('🔍 Items with isComplete=true:', allItems.filter(item => item.isComplete === true).length);
        }

        // Now try the filtered query
        console.log('🔍 Now trying filtered query...');
        const items = await fetchFeaturedItems(3);
        console.log('🔍 Filtered items:', items);

        // For now, let's show ANY items if filtered returns empty
        if (items.length === 0 && allItems.length > 0) {
          console.log('🔍 No filtered items, showing first 3 from all items');
          setProducts(allItems.slice(0, 3));
        } else {
          setProducts(items);
        }

      } catch (error) {
        console.error('❌ FeaturedProducts: Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#004225' }}>
              Featured <span style={{ color: '#C9A646' }}>Equipment</span>
            </h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8" style={{ color: '#374151' }}>
              Loading premium golf equipment...
            </p>
            <div className="animate-spin w-12 h-12 border-4 border-t-transparent rounded-full mx-auto" style={{ borderColor: '#004225' }}></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative z-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4" style={{ color: '#004225' }}>
            Equip Like a <span style={{ color: '#C9A646' }}>Pro</span>
          </h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: '#374151' }}>
            Discover our handpicked selection of premium golf equipment, 
            chosen by professionals for champions like you.
          </p>
        </motion.div>

        {/* Products Display */}
        {products.length === 0 ? (
          <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg" style={{ backgroundColor: '#004225' }}>
                <svg className="w-12 h-12" style={{ color: '#f1d956' }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-bold mb-3" style={{ color: '#004225' }}>
                Premium Collection Loading
              </h3>
              <p className="mb-6 leading-relaxed" style={{ color: '#374151' }}>
                Our curated selection of Titleist, Callaway, and TaylorMade equipment
                is being prepared for you. Experience golf excellence.
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm" style={{ color: '#6b7280' }}>
                <span className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#C9A646' }}></div>
                  Premium Brands
                </span>
                <span className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#C9A646' }}></div>
                  Expert Curation
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            {products.slice(0, 3).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: "easeOut"
              }}
              whileHover={{
                y: -4,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              className="group relative cursor-pointer"
              onClick={() => window.open(`/product/${product.id}`, '_blank')}
            >
              {/* Premium Card - Apple/Rolex Level Design */}
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 border border-gray-100/30 group-hover:border-golf-gold-200/50">
                
                {/* Premium Image Section with Brand Tag */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  {product.imageUrls && product.imageUrls.length > 0 && product.imageUrls[0] ? (
                    <motion.img
                      src={product.imageUrls[0]}
                      alt={product.name}
                      className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500 ease-out"
                      onError={(e) => {
                        console.log('Image failed to load:', product.imageUrls[0]);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                      <div className="text-center" style={{ color: '#d1d5db' }}>
                        <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                        </svg>
                        <p className="text-sm font-medium">Premium Equipment</p>
                      </div>
                    </div>
                  )}

                  {/* Brand Tag - Bottom Left Corner */}
                  {product.brand && (
                    <motion.div
                      className="absolute bottom-3 left-3"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <div className="px-2 py-1 rounded-md bg-black/70 backdrop-blur-sm text-white text-xs font-medium shadow-lg">
                        {product.brand}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Premium Product Info - Max 4 Elements */}
                <div className="p-5 space-y-3">
                  {/* Product Title - Serif Font */}
                    <motion.h3
                    className="font-serif font-medium text-lg leading-tight line-clamp-2"
                    style={{ color: '#111827' }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      {product.name}
                    </motion.h3>

                  {/* Wholesale Price Chip - Only for non-shoes */}
                  {((product.category || '').toLowerCase() !== 'shoes' && !/shoe/i.test(product.name)) && (
                      <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <span className="inline-block px-3 py-1 text-xs rounded-full bg-green-100/80 backdrop-blur-sm border border-green-200/50" style={{ color: '#004225' }}>
                        Wholesale Price
                      </span>
                      </motion.div>
                  )}

                  {/* Meta chips - Only shoes get size chip, only headwear gets gender */}
                  <div className="flex flex-wrap gap-2">
                    {product.gender && product.gender !== 'Unisex' && (product.category || '').toLowerCase() === 'headwear' && (
                      <span className="px-2 py-1 text-xs rounded-md border border-gray-200 bg-gray-50" style={{ color: '#4b5563' }}>{product.gender}</span>
                    )}
                    {((product.category || '').toLowerCase() === 'shoes' && !/bag/i.test(product.name)) && (
                      <span className="px-2 py-1 text-xs rounded-md border border-amber-200 text-amber-700 bg-amber-50">Available in different Sizes</span>
                    )}
                  </div>

                  {/* Price - Clean, Prominent */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="text-xl font-semibold"
                    style={{ color: '#111827' }}
                  >
                    {formatPrice(product.price)}
                  </motion.div>
                </div>

                {/* Premium hover effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                     style={{ boxShadow: '0 0 30px rgba(201, 166, 70, 0.3)' }}></div>
              </div>
            </motion.div>
          ))}
          </div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Link href="/products">
          <button className="btn-premium text-xl px-12 py-6 shadow-2xl transform hover:scale-105 transition-all duration-300">
            View All Products
          </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
