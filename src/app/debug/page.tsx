'use client';

import { useState, useEffect } from 'react';
import { fetchAllItems, fetchVisibleItems, fetchFeaturedItems } from '@/lib/firebase';

export default function DebugPage() {
  const [allItems, setAllItems] = useState<any[]>([]);
  const [visibleItems, setVisibleItems] = useState<any[]>([]);
  const [featuredItems, setFeaturedItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testFirebase = async () => {
      try {
        console.log('🔥 Starting Firebase Debug Test...');
        
        // Test 1: Fetch ALL items
        console.log('📋 Test 1: Fetching ALL items...');
        const all = await fetchAllItems();
        setAllItems(all);
        console.log('✅ All items:', all);
        
        // Test 2: Fetch visible items
        console.log('👁️ Test 2: Fetching visible items...');
        const visible = await fetchVisibleItems();
        setVisibleItems(visible);
        console.log('✅ Visible items:', visible);
        
        // Test 3: Fetch featured items
        console.log('⭐ Test 3: Fetching featured items...');
        const featured = await fetchFeaturedItems(3);
        setFeaturedItems(featured);
        console.log('✅ Featured items:', featured);
        
        console.log('🎉 Firebase Debug Test Complete!');
        
      } catch (err: any) {
        console.error('❌ Firebase Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    testFirebase();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-golf-green-900 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-golf-green-900 font-medium">Testing Firebase Connection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-golf-green-900 mb-8">🔥 Firebase Debug Dashboard</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <strong>Error:</strong> {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* All Items */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              📋 All Items ({allItems.length})
            </h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {allItems.length === 0 ? (
                <p className="text-gray-500">No items found in database</p>
              ) : (
                allItems.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded p-3 text-sm">
                    <div className="font-medium text-golf-green-900">{item.name}</div>
                    <div className="text-gray-600">Brand: {item.brand || 'N/A'}</div>
                    <div className="text-gray-600">Price: {item.price || 'N/A'}</div>
                    <div className="text-gray-600">
                      Visible: {item.isVisible ? '✅' : '❌'} | 
                      Complete: {item.isComplete ? '✅' : '❌'}
                    </div>
                    <div className="text-gray-600">Images: {item.imageUrls?.length || 0}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Visible Items */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              👁️ Visible Items ({visibleItems.length})
            </h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {visibleItems.length === 0 ? (
                <p className="text-gray-500">No visible items found</p>
              ) : (
                visibleItems.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded p-3 text-sm">
                    <div className="font-medium text-golf-green-900">{item.name}</div>
                    <div className="text-gray-600">Brand: {item.brand || 'N/A'}</div>
                    <div className="text-gray-600">Price: {item.price || 'N/A'}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Featured Items */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              ⭐ Featured Items ({featuredItems.length})
            </h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {featuredItems.length === 0 ? (
                <p className="text-gray-500">No featured items found</p>
              ) : (
                featuredItems.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded p-3 text-sm">
                    <div className="font-medium text-golf-green-900">{item.name}</div>
                    <div className="text-gray-600">Brand: {item.brand || 'N/A'}</div>
                    <div className="text-gray-600">Price: {item.price || 'N/A'}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">🔍 Debug Instructions</h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Check the browser console (F12) for detailed logs</li>
            <li>If "All Items" shows 0, check your Firebase connection</li>
            <li>If "All Items" has data but "Visible Items" is 0, check isVisible field</li>
            <li>Make sure your Firebase Security Rules allow public read access</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
