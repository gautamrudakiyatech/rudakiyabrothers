import Link from 'next/link';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#fafafa] pt-16 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-center md:text-left">
          
          {/* Column 1: Website Links */}
          <div>
            <h3 className="font-playfair font-bold text-xl text-rudakiya-dark mb-6 tracking-wide">Website Links</h3>
            <ul className="space-y-3 font-inter text-gray-600 text-sm">
              <li><Link href="/category/rings" className="hover:text-rudakiya-gold transition-colors">Engagement Rings</Link></li>
              <li><Link href="/category/jewelry" className="hover:text-rudakiya-gold transition-colors">Jewelry</Link></li>
              <li><Link href="/about" className="hover:text-rudakiya-gold transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-rudakiya-gold transition-colors">Blog</Link></li>
              <li><Link href="/faqs" className="hover:text-rudakiya-gold transition-colors">FAQs</Link></li>
              <li><Link href="/contact" className="hover:text-rudakiya-gold transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 2: Contact Us */}
          <div>
            <h3 className="font-playfair font-bold text-xl text-rudakiya-dark mb-6 tracking-wide">Contact Us</h3>
            <ul className="space-y-3 font-inter text-gray-600 text-sm">
              <li><Link href="/schedule" className="hover:text-rudakiya-gold transition-colors">Schedule a meeting</Link></li>
              <li><Link href="/message" className="hover:text-rudakiya-gold transition-colors">Drop us a message</Link></li>
              <li><Link href="/support" className="hover:text-rudakiya-gold transition-colors">Talk to customer support</Link></li>
            </ul>
          </div>

          {/* Column 3: Stay in touch */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-playfair font-bold text-xl text-rudakiya-dark mb-6 tracking-wide">Stay in touch</h3>
            <div className="flex space-x-5">
              <a href="#" className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-rudakiya-gold hover:text-white hover:border-rudakiya-gold transition-all shadow-sm">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-rudakiya-gold hover:text-white hover:border-rudakiya-gold transition-all shadow-sm">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-rudakiya-gold hover:text-white hover:border-rudakiya-gold transition-all shadow-sm">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-rudakiya-dark py-6 text-center text-gray-400 font-inter text-xs">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-4">
          <span>&copy; Rudakiya Brothers 2026</span>
          <span className="hidden md:inline">|</span>
          <Link href="/terms" className="hover:text-rudakiya-gold transition-colors">Terms &amp; Conditions</Link>
          <span className="hidden md:inline">|</span>
          <Link href="/privacy" className="hover:text-rudakiya-gold transition-colors">Privacy Policy</Link>
          <span className="hidden md:inline">|</span>
          <Link href="/shipping" className="hover:text-rudakiya-gold transition-colors">Shipping Policy</Link>
          <span className="hidden md:inline">|</span>
          <Link href="/cancellation" className="hover:text-rudakiya-gold transition-colors">Cancellation &amp; Exchange</Link>
        </div>
      </div>
    </footer>
  );
}
