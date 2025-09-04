import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Cloudinary image optimization
export function getOptimizedImageUrl(url: string, options: {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'jpg' | 'png';
} = {}) {
  if (!url || !url.includes('cloudinary')) return url;
  
  const { width = 800, height, quality = 80, format = 'auto' } = options;
  
  // Extract the public_id from Cloudinary URL
  const publicIdMatch = url.match(/\/v\d+\/(.+)\./);
  if (!publicIdMatch) return url;
  
  const publicId = publicIdMatch[1];
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  
  if (!cloudName) return url;
  
  let transformations = `c_fill,f_${format},q_${quality}`;
  if (width) transformations += `,w_${width}`;
  if (height) transformations += `,h_${height}`;
  
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${publicId}.${format === 'auto' ? 'jpg' : format}`;
}

// Format price for display
export function formatPrice(price: string | undefined): string {
  if (!price) return 'Price on request';
  
  // Remove any non-numeric characters except decimal point
  const numericPrice = price.replace(/[^\d.]/g, '');
  const parsedPrice = parseFloat(numericPrice);
  
  if (isNaN(parsedPrice)) return 'Price on request';
  
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(parsedPrice);
}

// Generate WhatsApp message for orders
export function generateWhatsAppMessage(items: Array<{
  name: string;
  price?: string;
  quantity: number;
}>, customerInfo: {
  name: string;
  phone: string;
}) {
  const itemsList = items.map(item => 
    `• ${item.name} (Qty: ${item.quantity}) - ${formatPrice(item.price)}`
  ).join('\n');
  
  const total = items.reduce((sum, item) => {
    const price = parseFloat(item.price?.replace(/[^\d.]/g, '') || '0');
    return sum + (price * item.quantity);
  }, 0);
  
  return encodeURIComponent(`🏌️ New Order from ${customerInfo.name}

📱 Phone: ${customerInfo.phone}

📦 Items:
${itemsList}

💰 Estimated Total: ${formatPrice(total.toString())}

Please confirm availability and final pricing. Thank you!`);
}

// Scroll animations utility
export function useScrollAnimation() {
  if (typeof window === 'undefined') return;
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
      }
    });
  }, observerOptions);
  
  // Observe all elements with data-animate attribute
  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });
  
  return () => observer.disconnect();
}

// Category mapping for better UX
export const categoryDisplayNames: Record<string, string> = {
  'clubs': 'Golf Clubs',
  'apparel': 'Golf Apparel',
  'shoes': 'Golf Shoes',
  'accessories': 'Accessories',
  'bags': 'Golf Bags',
  'balls': 'Golf Balls',
  'gloves': 'Golf Gloves',
  'training': 'Training Aids',
};

export function getCategoryDisplayName(category: string): string {
  return categoryDisplayNames[category.toLowerCase()] || category;
}
