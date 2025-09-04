// Shopping Cart Management with Session Storage
export interface CartItem {
  id: string;
  name: string;
  price: number;
  brand?: string;
  condition: string;
  imageUrl?: string;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
  location?: string;
}

const CART_STORAGE_KEY = 'parworld_golf_cart';
const CUSTOMER_STORAGE_KEY = 'parworld_golf_customer';

// Cart Management Functions
export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const cartData = sessionStorage.getItem(CART_STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error('Error loading cart:', error);
    return [];
  }
};

export const saveCart = (cart: CartItem[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    // Dispatch custom event for cart updates
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart }));
  } catch (error) {
    console.error('Error saving cart:', error);
  }
};

export const addToCart = (item: Omit<CartItem, 'quantity'>): void => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
  
  if (existingItemIndex > -1) {
    // Item already exists, increase quantity
    cart[existingItemIndex].quantity += 1;
  } else {
    // New item, add to cart
    cart.push({ ...item, quantity: 1 });
  }
  
  saveCart(cart);
};

export const removeFromCart = (itemId: string): void => {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.id !== itemId);
  saveCart(updatedCart);
};

export const updateCartItemQuantity = (itemId: string, quantity: number): void => {
  if (quantity <= 0) {
    removeFromCart(itemId);
    return;
  }
  
  const cart = getCart();
  const itemIndex = cart.findIndex(item => item.id === itemId);
  
  if (itemIndex > -1) {
    cart[itemIndex].quantity = quantity;
    saveCart(cart);
  }
};

export const clearCart = (): void => {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(CART_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('cartUpdated', { detail: [] }));
};

export const getCartTotal = (): number => {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const getCartItemCount = (): number => {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};

// Customer Information Management
export const getCustomerInfo = (): CustomerInfo | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const customerData = sessionStorage.getItem(CUSTOMER_STORAGE_KEY);
    return customerData ? JSON.parse(customerData) : null;
  } catch (error) {
    console.error('Error loading customer info:', error);
    return null;
  }
};

export const saveCustomerInfo = (customer: CustomerInfo): void => {
  if (typeof window === 'undefined') return;
  
  try {
    sessionStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customer));
  } catch (error) {
    console.error('Error saving customer info:', error);
  }
};

export const clearCustomerInfo = (): void => {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(CUSTOMER_STORAGE_KEY);
};

// WhatsApp Checkout Functions
export const generateWhatsAppMessage = (cart: CartItem[], customer: CustomerInfo): string => {
  const itemsList = cart.map(item => 
    `• ${item.name} ${item.brand ? `(${item.brand})` : ''} - ${formatPrice(item.price)} x${item.quantity} = ${formatPrice(item.price * item.quantity)}`
  ).join('\n');
  
  const total = getCartTotal();
  
  return `Hi! I'd like to place an order:

*Customer Details:*
Name: ${customer.name}
Phone: ${customer.phone}
${customer.email ? `Email: ${customer.email}` : ''}
${customer.location ? `Location: ${customer.location}` : ''}

*Order Items:*
${itemsList}

*Total: ${formatPrice(total)}*

Please confirm my order. Thank you!`;
};

export const formatPrice = (price: number | string | null | undefined): string => {
  if (!price) return 'Price on request';
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(numPrice)) return 'Price on request';

  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
  }).format(numPrice);
};

// Cart Hook for React Components
export const useCart = () => {
  if (typeof window === 'undefined') {
    return {
      cart: [],
      addToCart: () => {},
      removeFromCart: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      total: 0,
      itemCount: 0
    };
  }

  const cart = getCart();
  
  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity: updateCartItemQuantity,
    clearCart,
    total: getCartTotal(),
    itemCount: getCartItemCount()
  };
};
