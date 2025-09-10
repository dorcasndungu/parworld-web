'use client';

import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import BrandsCarousel from '@/components/BrandsCarousel';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import { Users, Award, Headphones, ArrowRight, MessageCircle } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <Navigation />
      <HeroSection />
      <BrandsCarousel />
      <FeaturedProducts />

      {/* Fixed Community CTA Section */}
<section className="py-24 text-white relative overflow-hidden isolate z-20" style={{ backgroundColor: 'var(--golf-green-900)' }}>
  {/* Sophisticated layered background for depth without shock */}
  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom right, rgba(0, 66, 37, 0.8), rgba(27, 79, 48, 0.4), rgba(31, 99, 58, 0.6))' }}></div>
  
  {/* Subtle pattern overlay for premium feel */}
  <div className="absolute inset-0 opacity-8">
    <div className="absolute top-24 left-24 w-40 h-40 rounded-full" style={{ border: '1px solid rgba(241, 217, 86, 0.3)' }}></div>
    <div className="absolute bottom-24 right-24 w-32 h-32 rounded-full" style={{ border: '1px solid rgba(241, 217, 86, 0.3)' }}></div>
    <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full" style={{ border: '1px solid rgba(241, 217, 86, 0.3)' }}></div>
  </div>

  <div className="max-w-7xl mx-auto text-center px-4 md:px-8 relative z-20">
    <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight text-white drop-shadow-2xl">
      Join the <span className="drop-shadow-lg" style={{ color: 'var(--golf-gold-400)' }}>Golf Circle</span>
    </h2>
    <p className="text-lg md:text-xl lg:text-2xl mb-12 md:mb-16 max-w-4xl mx-auto font-medium leading-relaxed drop-shadow-lg" style={{ color: 'var(--golf-green-50)' }}>
      Become part of our exclusive community. Live golf, breathe excellence,
      and connect with fellow enthusiasts who share your passion.
    </p>

         {/* CTA Buttons with sophisticated styling */}
    <div className="flex flex-col sm:flex-row gap-6 md:gap-8 justify-center items-center mb-16 md:mb-20">
       <a
         href="/community#join-form"
         className="btn-premium text-lg md:text-xl px-10 md:px-12 py-5 md:py-6 min-w-[240px] md:min-w-[250px] rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 inline-block text-center"
         onMouseEnter={(e) => {
           e.currentTarget.style.boxShadow = '0 25px 50px rgba(241, 217, 86, 0.5)';
         }}
         onMouseLeave={(e) => {
           e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.15)';
         }}
       >
        Join the Circle
       </a>
       <a
         href="/community"
         className="backdrop-blur-sm border-2 text-lg md:text-xl px-10 md:px-12 py-5 md:py-6 min-w-[240px] md:min-w-[250px] rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:bg-golf-gold-400 hover:text-golf-green-900"
         style={{
           backgroundColor: 'rgba(27, 79, 48, 0.6)',
           borderColor: 'rgba(241, 217, 86, 0.5)',
           color: 'var(--golf-gold-300)'
         }}
         onMouseEnter={(e) => {
           e.currentTarget.style.boxShadow = '0 25px 50px rgba(241, 217, 86, 0.4)';
         }}
         onMouseLeave={(e) => {
           e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.15)';
         }}>
        Learn More
       </a>
    </div>

    {/* Stats Section with sophisticated visual separation */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pt-12 md:pt-16" style={{ borderTop: '1px solid rgba(241, 217, 86, 0.3)' }}>
      <div className="text-center backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:bg-opacity-60 cursor-pointer" 
           style={{ 
             backgroundColor: 'rgba(27, 79, 48, 0.4)', 
             border: '1px solid rgba(241, 217, 86, 0.3)' 
           }}
           onMouseEnter={(e) => {
             e.currentTarget.style.backgroundColor = 'rgba(27, 79, 48, 0.6)';
             e.currentTarget.style.boxShadow = '0 25px 50px rgba(241, 217, 86, 0.3)';
           }}
           onMouseLeave={(e) => {
             e.currentTarget.style.backgroundColor = 'rgba(27, 79, 48, 0.4)';
             e.currentTarget.style.boxShadow = 'none';
           }}>
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 drop-shadow-lg transition-all duration-300" style={{ color: 'var(--golf-gold-400)' }}>500+</div>
        <div className="text-lg md:text-xl font-semibold" style={{ color: 'var(--golf-green-50)' }}>Happy Golfers</div>
      </div>
      <div className="text-center backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:bg-opacity-60 cursor-pointer" 
           style={{ 
             backgroundColor: 'rgba(27, 79, 48, 0.4)', 
             border: '1px solid rgba(241, 217, 86, 0.3)' 
           }}
           onMouseEnter={(e) => {
             e.currentTarget.style.backgroundColor = 'rgba(27, 79, 48, 0.6)';
             e.currentTarget.style.boxShadow = '0 25px 50px rgba(241, 217, 86, 0.3)';
           }}
           onMouseLeave={(e) => {
             e.currentTarget.style.backgroundColor = 'rgba(27, 79, 48, 0.4)';
             e.currentTarget.style.boxShadow = 'none';
           }}>
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 drop-shadow-lg transition-all duration-300" style={{ color: 'var(--golf-gold-400)' }}>20+</div>
        <div className="text-lg md:text-xl font-semibold" style={{ color: 'var(--golf-green-50)' }}>Premium Brands</div>
      </div>
      <div className="text-center backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:bg-opacity-60 cursor-pointer" 
           style={{ 
             backgroundColor: 'rgba(27, 79, 48, 0.4)', 
             border: '1px solid rgba(241, 217, 86, 0.3)' 
           }}
           onMouseEnter={(e) => {
             e.currentTarget.style.backgroundColor = 'rgba(27, 79, 48, 0.6)';
             e.currentTarget.style.boxShadow = '0 25px 50px rgba(241, 217, 86, 0.3)';
           }}
           onMouseLeave={(e) => {
             e.currentTarget.style.backgroundColor = 'rgba(27, 79, 48, 0.4)';
             e.currentTarget.style.boxShadow = 'none';
           }}>
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 drop-shadow-lg transition-all duration-300" style={{ color: 'var(--golf-gold-400)' }}>24/7</div>
        <div className="text-lg md:text-xl font-semibold" style={{ color: 'var(--golf-green-50)' }}>Expert Support</div>
      </div>
    </div>
  </div>
</section>

      {/* Back to Top Button */}
      <BackToTop />
    </main>
  );
}
