'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/lib/cart';
import { formatPrice } from '@/lib/cart';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, checkout } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [userContact, setUserContact] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userContact.name || !userContact.phone) {
      alert('Please provide your name and phone number to continue.');
      return;
    }
    checkout(userContact);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-24 h-24 bg-golf-green-900 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <ShoppingBag className="w-12 h-12 text-golf-gold-400" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-golf-green-900 mb-6">
              Your Cart is Empty
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Looks like you haven't added any premium golf equipment to your cart yet. 
              Discover our collection of top-tier gear and start building your perfect golf setup.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <button className="btn-premium text-lg px-8 py-4 shadow-2xl transform hover:scale-105 transition-all duration-300">
                  Browse Products
                </button>
              </Link>
              <Link href="/">
                <button className="bg-white border-2 border-golf-green-900 text-golf-green-900 font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:bg-golf-green-900 hover:text-white transition-all duration-300">
                  Back to Home
                </button>
              </Link>
              </div>
            </motion.div>
          </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-20">
      <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <motion.div
          initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-golf-green-900 mb-4">
            Your <span className="text-golf-gold-500">Golf Cart</span>
          </h1>
          <p className="text-xl text-gray-600">
            Review your selected premium golf equipment before checkout
          </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-3xl shadow-2xl p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold text-golf-green-900 mb-6 flex items-center">
                <ShoppingBag className="w-6 h-6 mr-3 text-golf-gold-500" />
                Cart Items ({totalItems})
              </h2>
              
              <div className="space-y-6">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl"
                  >
                      {/* Product Image */}
                    <div className="w-20 h-20 bg-white rounded-xl overflow-hidden flex-shrink-0">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                          className="w-full h-full object-cover"
                          />
                        ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <ShoppingBag className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-golf-green-900 text-lg mb-1 truncate">
                          {item.name}
                        </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {item.brand && `${item.brand} • `}{item.condition || 'Premium Quality'}
                      </p>
                      <div className="text-2xl font-bold text-golf-gold-500">
                          {formatPrice(item.price)}
                      </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-golf-green-900 text-white rounded-full flex items-center justify-center hover:bg-golf-green-800 transition-colors"
                        >
                        <Minus className="w-4 h-4" />
                        </button>
                      <span className="text-lg font-semibold text-golf-green-900 min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-golf-green-900 text-white rounded-full flex items-center justify-center hover:bg-golf-green-800 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            </div>

          {/* Checkout Section */}
          <div className="lg:col-span-1">
              <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 sticky top-8"
            >
              <h2 className="text-2xl font-bold text-golf-green-900 mb-6">
                Order Summary
              </h2>

              {/* Order Details */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Items ({totalItems})</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-xl font-bold text-golf-green-900">
                    <span>Total</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  </div>
                </div>

              {/* Checkout Form */}
              {!isCheckingOut ? (
                <button
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full btn-premium text-lg py-4 shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  Proceed to Checkout
                </button>
              ) : (
                <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-golf-green-900 mb-2">
                      Full Name *
                    </label>
                  <input
                    type="text"
                      required
                      value={userContact.name}
                      onChange={(e) => setUserContact({...userContact, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-golf-gold-400 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-golf-green-900 mb-2">
                      Phone Number *
                    </label>
                  <input
                    type="tel"
                      required
                      value={userContact.phone}
                      onChange={(e) => setUserContact({...userContact, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-golf-gold-400 focus:border-transparent transition-all"
                      placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-golf-green-900 mb-2">
                      Email (Optional)
                    </label>
                  <input
                    type="email"
                      value={userContact.email}
                      onChange={(e) => setUserContact({...userContact, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-golf-gold-400 focus:border-transparent transition-all"
                      placeholder="Enter your email"
                  />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-golf-green-900 mb-2">
                      Address (Optional)
                    </label>
                    <textarea
                      value={userContact.address}
                      onChange={(e) => setUserContact({...userContact, address: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-golf-gold-400 focus:border-transparent transition-all"
                      placeholder="Enter your delivery address"
                      rows={3}
                    />
              </div>

                  <div className="flex space-x-3">
                <button
                      type="button"
                      onClick={() => setIsCheckingOut(false)}
                      className="flex-1 bg-gray-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-gray-600 transition-colors"
                >
                      Back
                </button>
                <button
                      type="submit"
                      className="flex-1 btn-premium py-3 px-6 shadow-2xl transform hover:scale-105 transition-all duration-300"
                    >
                      Place Order
                    </button>
                  </div>
                </form>
              )}

              {/* Back to Shopping */}
              <div className="mt-6 text-center">
                <Link href="/products">
                  <button className="text-golf-green-900 hover:text-golf-gold-500 transition-colors flex items-center justify-center mx-auto">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Continue Shopping
                </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
