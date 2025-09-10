'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import ScrollProgress from '@/components/ScrollProgress';
import { Star, Target, Handshake, Users, Award, Clock, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 text-white relative overflow-hidden" style={{ backgroundColor: '#004225' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom right, rgba(0, 66, 37, 0.8), rgba(27, 79, 48, 0.4), rgba(31, 99, 58, 0.6))' }}></div>
        
        {/* Premium pattern overlay for life */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-24 left-24 w-40 h-40 rounded-full border" style={{ borderColor: 'rgba(241, 217, 86, 0.3)' }}></div>
          <div className="absolute bottom-24 right-24 w-32 h-32 rounded-full border" style={{ borderColor: 'rgba(241, 217, 86, 0.3)' }}></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full border" style={{ borderColor: 'rgba(241, 217, 86, 0.3)' }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
              About <span className="drop-shadow-lg" style={{ color: '#f1d956' }}>PARWORLD GOLF</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-lg" style={{ color: '#f0f9f4' }}>
              Kenya&apos;s premier destination for luxury golf equipment and exclusive community experiences
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-20" style={{ background: 'linear-gradient(to bottom right, #f0f9f4, #ffffff)' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ color: '#004225' }}>Our Story</h2>
              <p className="text-base md:text-lg style={{ color: '#374151' }} mb-6 leading-relaxed">
                ParWorld was born from a simple yet powerful vision: making premium golf equipment accessible to every golfer in Kenya. Founded by passionate golf enthusiasts who understood the challenges of finding quality gear, we set out to create a home for golfers - a place where excellence meets accessibility.
              </p>
              <p className="text-base md:text-lg style={{ color: '#374151' }} mb-8 leading-relaxed">
                We believe golf is more than a sport; it's a community. That's why we've built ParWorld as a warm, welcoming space where every golfer - from beginners taking their first swing to seasoned professionals - can find not just equipment, but guidance, support, and a sense of belonging.
              </p>
              
              {/* Enhanced Stats with Icons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
                <div className="text-center bg-white rounded-xl p-4 md:p-6 shadow-lg border" style={{ borderColor: '#dcf2e3' }}>
                  <Users className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2" style={{ color: '#f1d956' }} />
                  <div className="text-2xl md:text-3xl font-bold" style={{ color: '#f1d956' }}>500+</div>
                  <div className="text-sm md:text-base style={{ color: '#4b5563' }} font-medium">Happy Golfers</div>
                </div>
                <div className="text-center bg-white rounded-xl p-4 md:p-6 shadow-lg border" style={{ borderColor: '#dcf2e3' }}>
                  <Award className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2" style={{ color: '#f1d956' }} />
                  <div className="text-2xl md:text-3xl font-bold" style={{ color: '#f1d956' }}>20+</div>
                  <div className="text-sm md:text-base style={{ color: '#4b5563' }} font-medium">Premium Brands</div>
                </div>
                <div className="text-center bg-white rounded-xl p-4 md:p-6 shadow-lg border" style={{ borderColor: '#dcf2e3' }}>
                  <Clock className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2" style={{ color: '#f1d956' }} />
                  <div className="text-2xl md:text-3xl font-bold" style={{ color: '#f1d956' }}>24/7</div>
                  <div className="text-sm md:text-base style={{ color: '#4b5563' }} font-medium">Support</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border" 
                   style={{ borderColor: '#dcf2e3' }}>
                <img
                  src="/parworld-storefront.webp"
                  alt="Premium Golf Excellence - ParWorld storefront"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6" style={{ color: '#004225' }}>Our Values</h2>
            <p className="text-lg md:text-xl style={{ color: '#4b5563' }} max-w-3xl mx-auto leading-relaxed">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Accessible Excellence",
                description: "Making premium golf equipment accessible to every golfer in Kenya, regardless of skill level or budget. Quality shouldn't be exclusive.",
                icon: Star
              },
              {
                title: "Warm, Personal Service",
                description: "We're not just a store - we're your golf family. Our team provides warm, personalized guidance to help you find exactly what you need.",
                icon: Target
              },
              {
                title: "Community Commitment",
                description: "Active participants in Kenya's golf community, supporting tournaments, recognizing talent, and nurturing the next generation of golfers.",
                icon: Handshake
              }
            ].map((value, index) => {
              const IconComponent = value.icon;
              return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                  className="group bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border"
                  style={{ borderColor: '#dcf2e3' }}
                >
                  <div className="flex justify-center mb-4">
                    <IconComponent className="w-10 h-10 md:w-12 md:h-12 group-hover:scale-110 transition-all duration-300" style={{ color: '#C9A646' }} />
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl font-bold mb-4 text-center" style={{ color: '#004225' }}>{value.title}</h3>
                  <p className="text-sm md:text-base style={{ color: '#4b5563' }} leading-relaxed text-center">{value.description}</p>
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Involvement */}
      <section className="py-16 md:py-20" style={{ background: 'linear-gradient(to bottom right, #f0f9f4, #ffffff)' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6" style={{ color: '#004225' }}>Active in the Golf Community</h2>
            <p className="text-lg md:text-xl style={{ color: '#4b5563' }} max-w-3xl mx-auto leading-relaxed">
              Supporting Kenya's golf community through active participation and meaningful contributions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="font-serif text-2xl md:text-3xl font-bold mb-6" style={{ color: '#004225' }}>Supporting Golf Excellence</h3>
              <p className="text-base md:text-lg style={{ color: '#374151' }} mb-6 leading-relaxed">
                At Parworld, we're not just equipment suppliers - we're active participants in Kenya's golf community. We believe in giving back and supporting the sport that brings us all together.
              </p>
              <p className="text-base md:text-lg style={{ color: '#374151' }} mb-8 leading-relaxed">
                Through our community initiatives, we support local tournaments, recognize outstanding golfers, and contribute to the growth of golf across Kenya. Our involvement goes beyond business - it's about nurturing the next generation of golf talent.
              </p>
              
              {/* Community Impact Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="text-center bg-white rounded-xl p-4 md:p-6 shadow-lg border" style={{ borderColor: '#dcf2e3' }}>
                  <Award className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2" style={{ color: '#f1d956' }} />
                  <div className="text-2xl md:text-3xl font-bold" style={{ color: '#f1d956' }}>15+</div>
                  <div className="text-sm md:text-base style={{ color: '#4b5563' }} font-medium">Tournaments Supported</div>
                </div>
                <div className="text-center bg-white rounded-xl p-4 md:p-6 shadow-lg border" style={{ borderColor: '#dcf2e3' }}>
                  <Users className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2" style={{ color: '#f1d956' }} />
                  <div className="text-2xl md:text-3xl font-bold" style={{ color: '#f1d956' }}>50+</div>
                  <div className="text-sm md:text-base style={{ color: '#4b5563' }} font-medium">Golfers Recognized</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border bg-white" 
                   style={{ borderColor: '#dcf2e3' }}>
                <img
                  src="/Brands/parworldrep.jpeg"
                  alt="ParWorld representative supporting golf excellence"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>

          {/* ParWorld in Action Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h3 className="font-serif text-2xl md:text-3xl font-bold mb-8" style={{ color: '#004225' }}>Parworld in Action</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[
                {
                  src: "/Brands/Karen LadiesInvitationalPrizes.jpeg",
                  title: "Karen Ladies Invitational",
                  description: "Prize Presentation"
                },
                {
                  src: "/Brands/KiambuLadiesOpenParworldGifting.jpeg",
                  title: "Kiambu Ladies Open",
                  description: "Parworld Gifting"
                },
                {
                  src: "/Brands/LimuruLadiesOpenGiveaways.jpeg",
                  title: "Limuru Ladies Open",
                  description: "Giveaways & Support"
                },
                {
                  src: "/Brands/VetlabPrizesforcharitygolf.jpeg",
                  title: "Vetlab Charity Golf",
                  description: "Prize Contributions"
                },
                {
                  src: "/Brands/SponsorTalkrepParworld.jpeg",
                  title: "Sponsor Engagement",
                  description: "Community Partnership"
                },
                {
                  src: "/Brands/IMG_3642.jpeg",
                  title: "Golf Excellence",
                  description: "Community Recognition"
                }
              ].map((item, index) => (
              <motion.div
                  key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative aspect-square rounded-xl shadow-lg border overflow-hidden cursor-pointer"
                  style={{ borderColor: '#dcf2e3' }}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className={`w-full h-full group-hover:scale-105 transition-transform duration-500 ${
                      index === 0 ? 'object-cover object-top' : 'object-cover'
                    }`}
                  />
                  
                  {/* Overlay with description */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-3 md:p-4 text-white w-full">
                      <h4 className="font-semibold text-sm md:text-base mb-1">{item.title}</h4>
                      <p className="text-xs md:text-sm opacity-90">{item.description}</p>
                    </div>
                  </div>
                  
                  {/* Mobile description below image */}
                  <div className="absolute -bottom-16 left-0 right-0 p-2 bg-white rounded-b-lg shadow-lg md:hidden">
                    <h4 className="font-semibold text-sm style={{ color: '#111827' }} mb-1">{item.title}</h4>
                    <p className="text-xs style={{ color: '#4b5563' }}">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 text-white relative overflow-hidden" style={{ backgroundColor: '#004225' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom right, rgba(0, 66, 37, 0.8), rgba(27, 79, 48, 0.4), rgba(31, 99, 58, 0.6))' }}></div>
        
        {/* Premium pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-24 left-24 w-40 h-40 rounded-full border" style={{ borderColor: 'rgba(241, 217, 86, 0.3)' }}></div>
          <div className="absolute bottom-24 right-24 w-32 h-32 rounded-full border" style={{ borderColor: 'rgba(241, 217, 86, 0.3)' }}></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">Ready to Elevate Your Game?</h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-lg" style={{ color: '#f0f9f4' }}>
              Join the PARWORLD GOLF community and discover premium equipment that transforms your golf experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
              <motion.a
                href="/products"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group font-bold px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(to right, #C9A646, #f1d956)',
                  color: '#004225'
                }}
              >
                Shop Premium Equipment
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.a>
              <motion.a
                href="/community"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group border-2 font-bold px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl transition-all duration-300 flex items-center justify-center gap-2"
                style={{
                  borderColor: '#f1d956',
                  color: '#f1d956'
                }}
              >
                Join Our Community
                <Users className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-300" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
