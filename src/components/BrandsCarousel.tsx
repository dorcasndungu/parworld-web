'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function BrandsCarousel() {
  const brandLogos = [
    { src: '/Brands/Titleist-removebg-preview.png', alt: 'Titleist', sizeClass: 'h-10 md:h-12 w-40' },
    { src: '/Brands/Callaway-removebg-preview.png', alt: 'Callaway', sizeClass: 'h-10 md:h-12 w-36' },
    { src: '/Brands/Ping-logo-design-removebg-preview.png', alt: 'PING', sizeClass: 'h-9 md:h-11 w-28' },
    { src: '/Brands/Foot-Joy-logo-design-removebg-preview.png', alt: 'FootJoy', sizeClass: 'h-9 md:h-11 w-28' },
    { src: '/Brands/pngwing.com-removebg-preview.png', alt: 'Nike Golf', sizeClass: 'h-10 md:h-12 w-36' },
    { src: '/Brands/ProGM-removebg-preview (1).png', alt: 'Pro GM', sizeClass: 'h-9 md:h-11 w-24' },
  ];

  // Duplicate brands for seamless loop
  const duplicatedBrands = [...brandLogos, ...brandLogos];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h3 className="font-serif text-3xl font-bold mb-4" style={{ color: '#004225' }}>
            Premium <span style={{ color: '#C9A646' }}>Brands</span>
          </h3>
          <p className="max-w-2xl mx-auto" style={{ color: '#374151' }}>
            Featuring equipment from the world's most prestigious golf brands -
            the same gear trusted by professionals and champions worldwide.
          </p>
        </motion.div>
      </div>

      {/* Infinite scrolling brand logos */}
      <div className="relative">
        <div className="flex animate-scroll-brands">
          {duplicatedBrands.map((logo, index) => (
            <div
              key={`${logo.src}-${index}`}
              className="flex-shrink-0 mx-8 w-52 h-28 flex items-center justify-center bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={200}
                height={100}
                className="object-contain w-auto h-20 max-w-[180px] p-3"
              />
            </div>
          ))}
        </div>
        
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
      </div>
    </section>
  );
}
