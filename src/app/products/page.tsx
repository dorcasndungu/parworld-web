'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import { GolfItem, fetchAllItems } from '@/lib/firebase';
import { formatPrice, getCategoryDisplayName } from '@/lib/utils';

export default function ProductsPage() {
  const [products, setProducts] = useState<GolfItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const items = await fetchAllItems();
        setProducts(items);
        
        // Extract unique categories from products
        const categories = [...new Set(items.map(item => item.category).filter(Boolean))];
        setAvailableCategories(categories);
        
        console.log('Available categories from Firebase:', categories);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Smart sticky bar behavior - only show when scrolling down past hero section
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = 400; // Approximate hero section height
      
      // Show sticky bar when scrolled past hero and scrolling down
      if (currentScrollY > heroHeight && currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowStickyBar(true);
      } else if (currentScrollY < heroHeight || currentScrollY < lastScrollY) {
        setShowStickyBar(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Helper function to get products by category
  const getProductsByCategory = (category: string) => {
    if (!products.length) return [];

    let filtered = products;

    // Filter by search term first
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Then filter by category
    return filtered.filter(product => {
      const productCategory = (product.category || '').toString().trim();
      return productCategory.toLowerCase() === category.toLowerCase();
    });
  };

  // Get all products (for search or "all" category)
  const getAllProducts = () => {
    if (!searchTerm) return products;

    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  if (loading) {
    return (
      <main className="min-h-screen">
        <ScrollProgress />
        <Navigation />
        <div className="pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center py-20">
              <div className="animate-spin w-12 h-12 border-4 border-golf-green-900 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-golf-green-900 font-medium">Loading premium golf equipment...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <Navigation />
      
      {/* Hero Section - Mobile First */}
      <section className="pt-20 sm:pt-24 pb-8 sm:pb-12 text-white relative overflow-hidden" style={{ backgroundColor: '#004225' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom right, rgba(0, 66, 37, 0.8), rgba(27, 79, 48, 0.4), rgba(31, 99, 58, 0.6))' }}></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-8 sm:top-16 left-8 sm:left-24 w-16 sm:w-32 h-16 sm:h-32 rounded-full border" style={{ borderColor: 'rgba(241, 217, 86, 0.3)' }}></div>
          <div className="absolute bottom-6 sm:bottom-12 right-8 sm:right-24 w-12 sm:w-24 h-12 sm:h-24 rounded-full border" style={{ borderColor: 'rgba(241, 217, 86, 0.3)' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6"
          >
            Premium Golf <span className="drop-shadow-lg" style={{ color: '#f1d956' }}>Equipment</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg lg:text-2xl max-w-3xl mx-auto font-medium drop-shadow-lg px-4"
            style={{ color: '#f0f9f4' }}
          >
            Discover our complete collection of professional‑grade golf equipment from the world's leading brands
          </motion.p>
        </div>
      </section>

      {/* Search & Filter Section - Mobile First */}
      <section className="py-8 sm:py-10 md:py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Mobile-First Search Bar */}
          <div className="max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search our premium collection..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 text-sm sm:text-base md:text-lg border-2 border-gray-200 rounded-full focus:ring-4 focus:ring-golf-green-500/20 focus:border-golf-green-500 transition-all duration-300 bg-white shadow-lg"
              />
              <div className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            </div>

          {/* Mobile-First Category Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <motion.button
              onClick={() => setSelectedCategory('all')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 border-2 relative ${
                selectedCategory === 'all'
                  ? 'shadow-lg ring-2'
                  : 'bg-white shadow-md hover:shadow-lg'
              }`}
              style={{
                backgroundColor: selectedCategory === 'all' ? '#C9A646' : '#ffffff',
                color: selectedCategory === 'all' ? '#004225' : '#004225',
                borderColor: selectedCategory === 'all' ? '#C9A646' : '#004225',
                ringColor: selectedCategory === 'all' ? 'rgba(201, 166, 70, 0.3)' : 'transparent'
              }}
            >
              All Products
              <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: selectedCategory === 'all' ? 'rgba(0, 66, 37, 0.2)' : 'rgba(0, 66, 37, 0.1)',
                      color: '#004225'
                    }}>
                {products.length}
              </span>
            </motion.button>
            {loading ? (
              // Loading skeleton for categories
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="px-6 py-3 rounded-full bg-gray-200 animate-pulse">
                  <div className="w-20 h-4 bg-gray-300 rounded"></div>
                </div>
              ))
            ) : (
              availableCategories.map((category) => {
                const productCount = getProductsByCategory(category).length;
                return (
                  <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 border-2 relative ${
                    selectedCategory === category
                        ? 'shadow-lg ring-2'
                        : 'bg-white shadow-md hover:shadow-lg'
                  }`}
                    style={{
                      backgroundColor: selectedCategory === category ? '#C9A646' : '#ffffff',
                      color: selectedCategory === category ? '#004225' : '#004225',
                      borderColor: selectedCategory === category ? '#C9A646' : '#004225',
                      ringColor: selectedCategory === category ? 'rgba(201, 166, 70, 0.3)' : 'transparent'
                    }}
                >
                  {getCategoryDisplayName(category)}
                    {productCount > 0 && (
                      <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: selectedCategory === category ? 'rgba(0, 66, 37, 0.2)' : 'rgba(0, 66, 37, 0.1)',
                              color: '#004225'
                            }}>
                        {productCount}
                      </span>
                    )}
                  </motion.button>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Professional Minimal Sticky Bar - Only Categories */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-20 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100/50 shadow-sm"
          >
            <div className="max-w-7xl mx-auto px-4 py-3">
              <div className="flex flex-wrap justify-center gap-2">
                <motion.button
                  onClick={() => setSelectedCategory('all')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1.5 rounded-full font-medium text-xs transition-all duration-200 border ${
                    selectedCategory === 'all'
                      ? 'shadow-sm'
                      : 'hover:shadow-sm'
                  }`}
                  style={{
                    backgroundColor: selectedCategory === 'all' ? '#C9A646' : 'rgba(255, 255, 255, 0.8)',
                    color: selectedCategory === 'all' ? '#004225' : '#004225',
                    borderColor: selectedCategory === 'all' ? '#C9A646' : 'rgba(0, 66, 37, 0.2)'
                  }}
                >
                  All
                </motion.button>
                {availableCategories.slice(0, 6).map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-1.5 rounded-full font-medium text-xs transition-all duration-200 border ${
                      selectedCategory === category
                        ? 'shadow-sm'
                        : 'hover:shadow-sm'
                    }`}
                    style={{
                      backgroundColor: selectedCategory === category ? '#C9A646' : 'rgba(255, 255, 255, 0.8)',
                      color: selectedCategory === category ? '#004225' : '#004225',
                      borderColor: selectedCategory === category ? '#C9A646' : 'rgba(0, 66, 37, 0.2)'
                    }}
                  >
                    {getCategoryDisplayName(category)}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Products by Category */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {selectedCategory === 'all' ? (
            // Show all categories separated
            <div className="space-y-16">
              {availableCategories.map((category) => {
                const categoryProducts = getProductsByCategory(category);
                if (categoryProducts.length === 0) return null;

                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-8"
                  >
                    {/* Titleist-Style Category Header */}
                    <div className="text-center mb-12">
                      <div className="inline-block">
                        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 relative" style={{ color: '#004225' }}>
                          {getCategoryDisplayName(category)}
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 rounded-full" style={{ backgroundColor: '#C9A646' }}></div>
                        </h2>
                      </div>
                      <p className="text-xl font-light mt-6 max-w-2xl mx-auto" style={{ color: '#374151' }}>
                        Precision-engineered {getCategoryDisplayName(category).toLowerCase()} designed for peak performance and uncompromising quality
                      </p>
                    </div>

                    {/* Mobile-Optimized Products Grid - 3 cards on mobile */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                      {categoryProducts.map((product, index) => (
                  <Link href={`/product/${product.id}`} key={product.id}>
                    <motion.div
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
                              <div className="text-center text-gray-300">
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
                  </Link>
                      ))}
                    </div>
                  </motion.div>
                );
              })}

              {/* Show message if no products found */}
              {availableCategories.every(cat => getProductsByCategory(cat).length === 0) && (
            <div className="text-center py-20">
                  <div className="w-24 h-24 bg-golf-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-golf-gold-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                    </svg>
                  </div>
              <h3 className="text-2xl font-semibold text-golf-green-900 mb-2">No products found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria</p>
                </div>
              )}
            </div>
          ) : (
            // Show single category
            <div>
              {(() => {
                const categoryProducts = selectedCategory === 'all' ? getAllProducts() : getProductsByCategory(selectedCategory);

                if (categoryProducts.length === 0) {
                  return (
                    <div className="text-center py-20">
                      <div className="w-24 h-24 bg-golf-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-golf-gold-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                        </svg>
                      </div>
                      <h3 className="text-2xl font-semibold text-golf-green-900 mb-2">No {selectedCategory} found</h3>
                      <p className="text-gray-600">Try searching for different products</p>
                    </div>
                  );
                }

                return (
                  <>
                    {/* Category Header */}
                    <div className="text-center mb-12">
                      <div className="flex items-center justify-center mb-4">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-golf-gold-400"></div>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-golf-green-900 px-8">
                          {selectedCategory}
                </h2>
                        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-golf-gold-400"></div>
                      </div>
                      <p className="text-gray-600 text-lg mb-4">
                        Premium {selectedCategory.toLowerCase()} for the discerning golfer
                      </p>
                      <p className="text-golf-green-900 font-semibold">
                        {categoryProducts.length} Product{categoryProducts.length !== 1 ? 's' : ''} Available
                      </p>
              </div>

                    {/* Mobile-Optimized Products Grid - 3 cards on mobile */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
                      {categoryProducts.map((product, index) => (
                  <Link href={`/product/${product.id}`} key={product.id}>
                    <motion.div
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
                              <div className="text-center text-gray-300">
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
                  </Link>
                ))}
              </div>
            </>
                );
              })()}
            </div>
          )}
        </div>
      </section>
      
      {/* Back to Top Button */}
      <BackToTop />
    </main>
  );
}
