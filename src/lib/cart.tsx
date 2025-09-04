'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  brand?: string;
  condition?: string;
  imageUrl?: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  checkout: (userContact: UserContact) => void;
}

interface UserContact {
  name: string;
  phone: string;
  email?: string;
  address?: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from session storage on mount
  useEffect(() => {
    const savedCart = sessionStorage.getItem('golf-cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
        sessionStorage.removeItem('golf-cart');
      }
    }
  }, []);

  // Save cart to session storage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('golf-cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === newItem.id);
      if (existingItem) {
        return currentItems.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentItems, { ...newItem, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    sessionStorage.removeItem('golf-cart');
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const checkout = (userContact: UserContact) => {
    if (items.length === 0) return;

    // Create order message for WhatsApp
    const orderItems = items.map(item => 
      `• ${item.name} (${item.brand || 'Premium Brand'}) - ${item.condition || 'Premium Quality'} - $${item.price.toFixed(2)} x${item.quantity}`
    ).join('\n');

    const total = totalPrice.toFixed(2);
    
    const message = `🏌️‍♂️ *NEW GOLF EQUIPMENT ORDER* 🏌️‍♂️

*Customer Details:*
👤 Name: ${userContact.name}
📱 Phone: ${userContact.phone}
${userContact.email ? `📧 Email: ${userContact.email}` : ''}
${userContact.address ? `📍 Address: ${userContact.address}` : ''}

*Order Items:*
${orderItems}

💰 *Total: $${total}*

*Order Summary:*
📦 Total Items: ${totalItems}
💳 Payment: To be arranged with shop
🚚 Delivery: To be discussed

Please contact the customer to confirm order details and arrange payment/delivery.`;

    // Encode message for WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/254700000000?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Clear cart after successful checkout
    clearCart();
    
    // Show success message
    alert('🎉 Order sent successfully! The shop will contact you shortly to arrange payment and delivery.');
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      checkout
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

// Utility functions for external use
export const addToCart = (item: Omit<CartItem, 'quantity'>) => {
  const savedCart = sessionStorage.getItem('golf-cart');
  let currentItems: CartItem[] = [];
  
  if (savedCart) {
    try {
      currentItems = JSON.parse(savedCart);
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }

  const existingItem = currentItems.find(cartItem => cartItem.id === item.id);
  if (existingItem) {
    currentItems = currentItems.map(cartItem =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  } else {
    currentItems.push({ ...item, quantity: 1 });
  }

  sessionStorage.setItem('golf-cart', JSON.stringify(currentItems));
};

export const formatPrice = (price: string | number | null | undefined): string => {
  // Handle null, undefined, or invalid values
  if (price === null || price === undefined || price === '') {
    return 'KSh 0';
  }
  
  // Convert to number and validate
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  // Check if it's a valid number
  if (isNaN(numPrice) || !isFinite(numPrice)) {
    return 'KSh 0';
  }
  
  // Ensure price is not negative
  const validPrice = Math.max(0, numPrice);
  
  // Format as KSh with no decimals for cleaner look
  return `KSh ${validPrice.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

