'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import ScrollProgress from '@/components/ScrollProgress';
import { addCommunityMember, getCommunityMemberCount } from '@/lib/firebase';
import { 
  Target, 
  Gem, 
  BookOpen, 
  Trophy, 
  Handshake, 
  Zap, 
  Users, 
  Award, 
  Headphones 
} from 'lucide-react';

export default function CommunityPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interests: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [memberCount, setMemberCount] = useState(0);

  const interestOptions = [
    'Premium Equipment',
    'Golf Lessons',
    'Tournament Updates',
    'New Product Launches',
    'Exclusive Deals',
    'Golf Tips & Techniques',
    'Community Events',
    'Equipment Reviews'
  ];

  useEffect(() => {
    const loadMemberCount = async () => {
      const count = await getCommunityMemberCount();
      // Add 50 to the database count to show a more impressive number
      setMemberCount(count + 50);
    };
    loadMemberCount();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addCommunityMember({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        interests: formData.interests
      });

      setShowSuccess(true);
      setMemberCount(prev => prev + 1);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        interests: []
      });

    } catch (error: any) {
      alert(error.message || 'Failed to join community. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
              Join The <span className="drop-shadow-lg" style={{ color: '#f1d956' }}>Parworld Circle</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed mb-8 font-medium drop-shadow-lg" style={{ color: '#f0f9f4' }}>
              Become part of Kenya's most exclusive golf community. Get early access to premium equipment, 
              expert insights, and connect with fellow golf enthusiasts.
            </p>
            
            {/* Enhanced Stats with better mobile layout */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-2xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center backdrop-blur-sm rounded-xl p-4 md:p-6 border transition-all duration-300 hover:bg-opacity-60"
                style={{ 
                  backgroundColor: 'rgba(27, 79, 48, 0.4)', 
                  borderColor: 'rgba(241, 217, 86, 0.3)' 
                }}
              >
                <Users className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2" style={{ color: '#f1d956' }} />
                <div className="text-2xl md:text-3xl font-bold" style={{ color: '#f1d956' }}>{memberCount}+</div>
                <div className="text-sm md:text-base font-medium" style={{ color: '#f0f9f4' }}>Members</div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center backdrop-blur-sm rounded-xl p-4 md:p-6 border transition-all duration-300 hover:bg-opacity-60"
                style={{ 
                  backgroundColor: 'rgba(27, 79, 48, 0.4)', 
                  borderColor: 'rgba(241, 217, 86, 0.3)' 
                }}
              >
                <Award className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2" style={{ color: '#f1d956' }} />
                <div className="text-2xl md:text-3xl font-bold" style={{ color: '#f1d956' }}>20+</div>
                <div className="text-sm md:text-base font-medium" style={{ color: '#f0f9f4' }}>Premium Brands</div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center backdrop-blur-sm rounded-xl p-4 md:p-6 border transition-all duration-300 hover:bg-opacity-60"
                style={{ 
                  backgroundColor: 'rgba(27, 79, 48, 0.4)', 
                  borderColor: 'rgba(241, 217, 86, 0.3)' 
                }}
              >
                <Headphones className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2" style={{ color: '#f1d956' }} />
                <div className="text-2xl md:text-3xl font-bold" style={{ color: '#f1d956' }}>24/7</div>
                <div className="text-sm md:text-base font-medium" style={{ color: '#f0f9f4' }}>Expert Support</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20" style={{ background: 'linear-gradient(to bottom right, #f0f9f4, #ffffff)' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6" style={{ color: '#004225' }}>Exclusive Member Benefits</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join our community and unlock premium perks designed for serious golfers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Target,
                title: "Early Access",
                description: "Be the first to know about new premium equipment arrivals and limited edition releases."
              },
              {
                icon: Gem,
                title: "Exclusive Deals",
                description: "Member-only discounts and special pricing on premium golf equipment and accessories."
              },
              {
                icon: BookOpen,
                title: "Expert Insights",
                description: "Weekly tips from golf professionals, equipment reviews, and technique improvements."
              },
              {
                icon: Trophy,
                title: "Tournament Updates",
                description: "Stay updated on local tournaments, golf events, and community competitions."
              },
              {
                icon: Handshake,
                title: "Community Network",
                description: "Connect with fellow golf enthusiasts, share experiences, and build lasting friendships."
              },
              {
                icon: Zap,
                title: "Priority Support",
                description: "Get priority customer service and personalized equipment recommendations."
              }
            ].map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                  className="group bg-white rounded-2xl p-6 md:p-8 hover:shadow-xl transition-all duration-300 border"
                  style={{ 
                    borderColor: '#dcf2e3',
                    backgroundColor: 'white'
                  }}
                >
                  <div className="flex justify-center mb-4">
                    <IconComponent className="w-10 h-10 md:w-12 md:h-12 group-hover:scale-110 transition-all duration-300" style={{ color: '#C9A646' }} />
                  </div>
                  <h3 className="font-serif text-lg md:text-xl font-bold mb-3 text-center" style={{ color: '#004225' }}>{benefit.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed text-center">{benefit.description}</p>
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Join Form Section */}
      <section id="join-form" className="py-16 md:py-20" style={{ backgroundColor: '#f0f9f4' }}>
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 shadow-2xl border"
            style={{ borderColor: '#dcf2e3' }}
          >
            <div className="text-center mb-6 md:mb-8">
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4" style={{ color: '#004225' }}>
                Ready to Join?
              </h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Fill out the form below and become part of Kenya's premier golf community
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg md:rounded-xl focus:ring-2 focus:ring-golf-green-500 focus:border-transparent transition-all duration-300 text-sm md:text-base"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg md:rounded-xl focus:ring-2 focus:ring-golf-green-500 focus:border-transparent transition-all duration-300 text-sm md:text-base"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number (Optional)</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg md:rounded-xl focus:ring-2 focus:ring-golf-green-500 focus:border-transparent transition-all duration-300 text-sm md:text-base"
                  placeholder="+254722897985"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 md:mb-4">What interests you most? (Select all that apply)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
                  {interestOptions.map((interest) => (
                    <motion.button
                      key={interest}
                      type="button"
                      onClick={() => handleInterestToggle(interest)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-2 md:p-3 rounded-lg md:rounded-xl border-2 text-xs md:text-sm font-medium transition-all duration-300 ${
                        formData.interests.includes(interest)
                          ? 'shadow-lg'
                          : 'bg-white hover:bg-opacity-50'
                      }`}
                      style={{
                        borderColor: formData.interests.includes(interest) ? '#f1d956' : '#bce5ca',
                        backgroundColor: formData.interests.includes(interest) ? '#f1d956' : 'white',
                        color: formData.interests.includes(interest) ? '#004225' : '#1f633a'
                      }}
                    >
                      {interest}
                    </motion.button>
                  ))}
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full font-bold py-3 md:py-4 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                style={{
                  background: 'linear-gradient(to right, #C9A646, #f1d956)',
                  color: '#004225'
                }}
              >
                {isSubmitting ? 'Joining...' : 'Join The ParWorld Circle'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowSuccess(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-bold text-golf-green-900 mb-4">Welcome to The Golf Circle!</h3>
              <p className="text-gray-600 mb-6">
                You've successfully joined our exclusive community. Check your email for a welcome message with your member benefits.
              </p>
              <button
                onClick={() => setShowSuccess(false)}
                className="bg-golf-gold-500 hover:bg-golf-gold-600 text-golf-green-900 font-bold px-8 py-3 rounded-xl transition-colors"
              >
                Continue Exploring
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
