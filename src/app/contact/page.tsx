'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import ScrollProgress from '@/components/ScrollProgress';
import { MapPin, Phone, Mail, MessageCircle, Clock, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create WhatsApp message
    const whatsappMessage = `
*New Contact Form Submission*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Subject:* ${formData.subject}

*Message:*
${formData.message}
    `.trim();

    // Open WhatsApp
    const whatsappUrl = `https://wa.me/254722897985?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });

    setIsSubmitting(false);
    alert('Your message has been sent via WhatsApp! We will get back to you shortly.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="min-h-screen bg-gray-50">
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
        
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
              Get In <span className="drop-shadow-lg" style={{ color: '#f1d956' }}>Touch</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-lg" style={{ color: '#f0f9f4' }}>
              Ready to elevate your golf game? We're here to help you find the perfect equipment with warm, personalized service.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="py-16 md:py-20" style={{ background: 'linear-gradient(to bottom right, #f0f9f4, #ffffff)' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl border" style={{ borderColor: '#dcf2e3' }}>
                <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6 md:mb-8" style={{ color: '#004225' }}>Send us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium style={{ color: '#374151' }} mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300"
                        style={{ borderColor: '#dcf2e3' }}
                        onFocus={(e) => e.target.style.borderColor = '#f1d956'}
                        onBlur={(e) => e.target.style.borderColor = '#dcf2e3'}
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium style={{ color: '#374151' }} mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300"
                        style={{ borderColor: '#dcf2e3' }}
                        onFocus={(e) => e.target.style.borderColor = '#f1d956'}
                        onBlur={(e) => e.target.style.borderColor = '#dcf2e3'}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium style={{ color: '#374151' }} mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300"
                        style={{ borderColor: '#dcf2e3' }}
                        onFocus={(e) => e.target.style.borderColor = '#f1d956'}
                        onBlur={(e) => e.target.style.borderColor = '#dcf2e3'}
                        placeholder="+254722897985"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium style={{ color: '#374151' }} mb-2">Subject *</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300"
                        style={{ borderColor: '#dcf2e3' }}
                        onFocus={(e) => e.target.style.borderColor = '#f1d956'}
                        onBlur={(e) => e.target.style.borderColor = '#dcf2e3'}
                      >
                        <option value="">Select a subject</option>
                        <option value="Product Inquiry">Product Inquiry</option>
                        <option value="Equipment Consultation">Equipment Consultation</option>
                        <option value="Custom Order">Custom Order</option>
                        <option value="Partnership">Partnership</option>
                        <option value="General Question">General Question</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium style={{ color: '#374151' }} mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300 resize-none"
                      style={{ borderColor: '#dcf2e3' }}
                      onFocus={(e) => e.target.style.borderColor = '#f1d956'}
                      onBlur={(e) => e.target.style.borderColor = '#dcf2e3'}
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full font-bold py-3 md:py-4 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{
                      background: 'linear-gradient(to right, #C9A646, #f1d956)',
                      color: '#004225'
                    }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message via WhatsApp'}
                    <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Contact Details */}
              <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl border" style={{ borderColor: '#dcf2e3' }}>
                <h3 className="font-serif text-xl md:text-2xl font-bold mb-6" style={{ color: '#004225' }}>Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#f1d956' }}>
                      <MapPin className="w-6 h-6" style={{ color: '#004225' }} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: '#004225' }}>Visit Us</h4>
                      <p className="style={{ color: '#4b5563' }}">Thika Rd, Total Energies Ground Floor<br />Next to Queen of Apostles Catholic Church<br />Opp. Safari Park Hotel, Nairobi</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#f1d956' }}>
                      <Phone className="w-6 h-6" style={{ color: '#004225' }} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: '#004225' }}>Call Us</h4>
                      <p style={{ color: '#4b5563' }}>(+254) 722 897 985</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#f1d956' }}>
                      <Mail className="w-6 h-6" style={{ color: '#004225' }} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: '#004225' }}>Email Us</h4>
                      <p className="style={{ color: '#4b5563' }}">info@parworldgolfent.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#f1d956' }}>
                      <MessageCircle className="w-6 h-6" style={{ color: '#004225' }} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: '#004225' }}>WhatsApp</h4>
                      <p className="style={{ color: '#4b5563' }}">(+254) 722 897 985</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl border" style={{ borderColor: '#dcf2e3' }}>
                <h3 className="font-serif text-xl md:text-2xl font-bold mb-6" style={{ color: '#004225' }}>Business Hours</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Clock className="w-5 h-5" style={{ color: '#C9A646' }} />
                    <div className="flex justify-between w-full">
                      <span className="style={{ color: '#4b5563' }}">Monday - Saturday</span>
                      <span className="font-semibold" style={{ color: '#004225' }}>8:00 AM - 8:00 PM</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Clock className="w-5 h-5" style={{ color: '#C9A646' }} />
                    <div className="flex justify-between w-full">
                      <span className="style={{ color: '#4b5563' }}">Sunday</span>
                      <span className="font-semibold" style={{ color: '#004225' }}>Closed</span>
                  </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 md:mt-20"
          >
            <div className="text-center mb-8">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4" style={{ color: '#004225' }}>Find Us</h2>
              <p className="text-lg style={{ color: '#4b5563' }} max-w-2xl mx-auto">
                Visit our store at Thika Road, conveniently located next to Queen of Apostles Catholic Church
              </p>
            </div>
            
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl border" style={{ borderColor: '#dcf2e3' }}>
              <div className="aspect-video rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8!2d36.8!3d-1.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTgnMDAuMCJTIDM2wrA0OCcwMC4wIkU!5e0!3m2!1sen!2ske!4v1234567890123!5m2!1sen!2ske&q=Thika+Road+Total+Energies+Queen+of+Apostles+Catholic+Church+Safari+Park+Hotel+Nairobi+Kenya"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ParWorld Golf Location - Thika Road, Total Energies Ground Floor"
                ></iframe>
              </div>
              
              <div className="mt-6 text-center">
                <p className="style={{ color: '#4b5563' }} mb-4">
                  <strong>Address:</strong> Thika Rd, Total Energies Ground Floor<br />
                  Next to Queen of Apostles Catholic Church<br />
                  Opposite Safari Park Hotel, Nairobi
                </p>
                <motion.a
                  href="https://maps.app.goo.gl/EtDVWcdXPMBJaWvNA"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-xl shadow-lg transition-all duration-300"
                  style={{
                    background: 'linear-gradient(to right, #C9A646, #f1d956)',
                    color: '#004225'
                  }}
                >
                  <MapPin className="w-5 h-5" />
                  Get Directions
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
