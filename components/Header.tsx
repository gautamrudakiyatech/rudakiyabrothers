'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Search, User, ChevronDown, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isJewelryOpen, setIsJewelryOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gray-900 text-white text-xs md:text-sm py-2 px-4 text-center font-inter tracking-wide hidden md:block">
        100% Lab Grown Diamonds &nbsp;&nbsp;|&nbsp;&nbsp; Free Shipping &nbsp;&nbsp;|&nbsp;&nbsp; 7-Day Easy Returns
      </div>
      <div className="bg-gray-900 text-white text-xs py-2 px-4 text-center font-inter block md:hidden">
        100% Lab Grown Diamonds | Free Shipping
      </div>

      {/* Header / Navigation */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-4' : 'bg-[#fafafa] py-6'}`}>
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            {/* Desktop Logo */}
            <img
              src="/logo.png"
              alt="Rudakiya Brothers Logo"
              className="h-[60px] w-auto object-contain object-left invert hidden md:block transform scale-[2.5] origin-left"
            />
            {/* Mobile Logo */}
            <img
              src="/logo.png"
              alt="Rudakiya Brothers Logo"
              className="h-[50px] w-auto object-contain object-left invert md:hidden block transform scale-[1.5] origin-left"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8 font-inter text-sm font-medium text-gray-800">
            <Link href="/category/rings" className="hover:text-amber-600 transition-colors">Engagement Rings</Link>

            <div className="relative group"
              onMouseEnter={() => setIsJewelryOpen(true)}
              onMouseLeave={() => setIsJewelryOpen(false)}>
              <button className="flex items-center hover:text-amber-600 transition-colors py-2">
                Jewelry <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              {isJewelryOpen && (
                <div className="absolute top-full left-0 mt-0 w-48 bg-white shadow-xl border border-gray-100 rounded-md py-2 z-50 animate-fadeInUp">
                  <Link href="/category/earrings" className="block px-4 py-2 hover:bg-gray-50 hover:text-amber-600 text-gray-700">Earrings</Link>
                  <Link href="/category/pendants" className="block px-4 py-2 hover:bg-gray-50 hover:text-amber-600 text-gray-700">Pendants</Link>
                  <Link href="/category/pendants" className="block px-4 py-2 hover:bg-gray-50 hover:text-amber-600 text-gray-700">Solitaire Pendants</Link>
                  <Link href="/category/bracelets" className="block px-4 py-2 hover:bg-gray-50 hover:text-amber-600 text-gray-700">Bracelets</Link>
                </div>
              )}
            </div>

            <Link href="/about" className="hover:text-amber-600 transition-colors">About Us</Link>
            <Link href="/blog" className="hover:text-amber-600 transition-colors">Blog</Link>
            <Link href="/faqs" className="hover:text-amber-600 transition-colors">FAQs</Link>
            <Link href="/contact" className="hover:text-amber-600 transition-colors">Contact Us</Link>
          </nav>

          {/* Icons */}
          <div className="hidden lg:flex items-center space-x-6 text-gray-800 font-inter">
            <button className="hover:text-amber-600 transition-colors"><Search className="w-5 h-5" /></button>
            <button className="hover:text-amber-600 transition-colors"><User className="w-5 h-5" /></button>
            <Link href="/cart" className="flex items-center hover:text-amber-600 transition-colors group">
              <ShoppingCart className="w-5 h-5 mr-2" />
              <span className="text-sm font-semibold group-hover:text-amber-600">Rs. 0.00</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center space-x-4 lg:hidden">
            <Link href="/cart" className="flex items-center hover:text-amber-600 transition-colors">
              <ShoppingCart className="w-5 h-5" />
            </Link>
            <button className="text-gray-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 px-4 bg-white border-t border-gray-100 font-inter text-gray-800 flex flex-col space-y-4 shadow-inner max-h-[70vh] overflow-y-auto">
            <Link href="/category/rings" className="pt-4 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Engagement Rings</Link>
            <div className="flex flex-col space-y-2">
              <span className="font-medium">Jewelry</span>
              <div className="pl-4 flex flex-col space-y-2 text-gray-600">
                <Link href="/category/earrings" onClick={() => setIsMobileMenuOpen(false)}>Earrings</Link>
                <Link href="/category/pendants" onClick={() => setIsMobileMenuOpen(false)}>Pendants</Link>
                <Link href="/category/pendants" onClick={() => setIsMobileMenuOpen(false)}>Solitaire Pendants</Link>
                <Link href="/category/bracelets" onClick={() => setIsMobileMenuOpen(false)}>Bracelets</Link>
              </div>
            </div>
            <Link href="/about" className="font-medium" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
            <Link href="/blog" className="font-medium" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
            <Link href="/faqs" className="font-medium" onClick={() => setIsMobileMenuOpen(false)}>FAQs</Link>
            <Link href="/contact" className="font-medium" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button className="flex items-center"><Search className="w-5 h-5 mr-2" /> Search</button>
              <button className="flex items-center"><User className="w-5 h-5 mr-2" /> Account</button>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
