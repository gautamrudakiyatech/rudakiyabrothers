import { MapPin, Phone, Mail, Clock, Send, ShieldCheck, Star, Calendar } from 'lucide-react';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <main className="bg-[#fafafa] min-h-screen">
      {/* Header */}
      <section className="py-20 bg-white border-b border-gray-100 text-center animate-fade-in-up">
        <h1 className="font-playfair text-5xl text-rudakiya-dark mb-6">Contact Us</h1>
        <p className="font-inter text-gray-500 max-w-xl mx-auto">
          Whether you need assistance tracing an order, exploring bespoke jewelry options, or booking a diamond consultation, the Rudakiya Brothers team is here for you.
        </p>
      </section>

      {/* Main Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column: Form & Booking */}
          <div className="space-y-12">
            
            {/* Contact Form */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-rudakiya-goldHover"></div>
              <h2 className="font-playfair text-3xl text-rudakiya-dark mb-2">Drop us a message</h2>
              <p className="font-inter text-gray-500 text-sm mb-8">We aim to respond to all inquiries within 24 hours.</p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-inter text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rudakiya-goldHover focus:ring-1 focus:ring-rudakiya-goldHover outline-none transition-colors" placeholder="John" required />
                  </div>
                  <div>
                    <label className="block font-inter text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rudakiya-goldHover focus:ring-1 focus:ring-rudakiya-goldHover outline-none transition-colors" placeholder="Doe" required />
                  </div>
                </div>

                <div>
                  <label className="block font-inter text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rudakiya-goldHover focus:ring-1 focus:ring-rudakiya-goldHover outline-none transition-colors" placeholder="john@example.com" required />
                </div>

                <div>
                  <label className="block font-inter text-sm font-medium text-gray-700 mb-2">Inquiry Type</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rudakiya-goldHover focus:ring-1 focus:ring-rudakiya-goldHover outline-none transition-colors bg-white">
                    <option>General Inquiry</option>
                    <option>Order Support / Tracking</option>
                    <option>Bespoke Jewelry Customization</option>
                    <option>Schedule a Virtual Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block font-inter text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rudakiya-goldHover focus:ring-1 focus:ring-rudakiya-goldHover outline-none transition-colors resize-none" placeholder="How can we help you today?" required></textarea>
                </div>

                <button type="submit" className="w-full bg-rudakiya-dark text-white font-inter font-medium py-4 rounded-xl hover:bg-rudakiya-gold transition-colors flex items-center justify-center">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center">
                <ShieldCheck className="w-8 h-8 text-rudakiya-gold mb-3" />
                <h4 className="font-inter font-semibold text-rudakiya-dark text-sm">Secure Communication</h4>
                <p className="text-xs text-gray-500 mt-1">Your data is always encrypted</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center">
                <Star className="w-8 h-8 text-rudakiya-gold mb-3" />
                <h4 className="font-inter font-semibold text-rudakiya-dark text-sm">5-Star Support</h4>
                <p className="text-xs text-gray-500 mt-1">Expert jewelry consultants</p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Info & Bookings */}
          <div className="space-y-8">
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50">
              <h3 className="font-playfair text-2xl text-rudakiya-dark mb-8">Reach Out Directly</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <Phone className="w-5 h-5 text-rudakiya-gold" />
                  </div>
                  <div>
                    <h4 className="font-inter font-semibold text-rudakiya-dark mb-1">Talk to Customer Support</h4>
                    <a href="tel:+919324883465" className="text-gray-600 hover:text-rudakiya-gold transition-colors">+91 93248 83465</a>
                    <p className="text-xs text-gray-400 mt-1">Mon-Sat, 10:00 AM – 7:00 PM (IST)</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <Mail className="w-5 h-5 text-rudakiya-gold" />
                  </div>
                  <div>
                    <h4 className="font-inter font-semibold text-rudakiya-dark mb-1">Email Us</h4>
                    <a href="mailto:support@rudakiyabrothers.com" className="text-gray-600 hover:text-rudakiya-gold transition-colors">support@rudakiyabrothers.com</a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <MapPin className="w-5 h-5 text-rudakiya-gold" />
                  </div>
                  <div>
                    <h4 className="font-inter font-semibold text-rudakiya-dark mb-1">Visit Our Office</h4>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      Rudakiya Brothers H.Q.<br/>
                      Diamond District Plaza,<br/>
                      Mumbai, Maharashtra, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Virtual Booking Callout */}
            <div className="bg-rudakiya-dark p-8 rounded-3xl text-white relative overflow-hidden group cursor-pointer hover:shadow-2xl transition-all">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-rudakiya-goldHover rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700"></div>
              <h3 className="font-playfair text-2xl mb-3 relative z-10 flex items-center">
                <Calendar className="w-6 h-6 mr-3 text-rudakiya-goldHover" />
                Schedule a Meeting
              </h3>
              <p className="font-inter text-gray-400 text-sm mb-6 relative z-10 leading-relaxed">
                Experience our jewelry up close from the comfort of your home. Book a 1-on-1 virtual consultation with a diamond expert.
              </p>
              <button className="bg-white text-rudakiya-dark px-6 py-2.5 rounded-full font-inter text-sm font-semibold hover:bg-rudakiya-goldHover hover:text-white transition-colors relative z-10">
                Book Calendar Now
              </button>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
