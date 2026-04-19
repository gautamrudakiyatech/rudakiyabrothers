'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Menu, X } from 'lucide-react';
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
      <div className="bg-rudakiya-dark text-white text-xs md:text-sm py-2 px-4 text-center font-inter tracking-wide hidden md:block">
        100% Lab Grown Diamonds &nbsp;&nbsp;|&nbsp;&nbsp; Free Shipping &nbsp;&nbsp;|&nbsp;&nbsp; 7-Day Easy Returns
      </div>
      <div className="bg-rudakiya-dark text-white text-xs py-2 flex overflow-hidden w-full md:hidden whitespace-nowrap">
        <div className="animate-marquee inline-block font-inter font-medium">
          100% Lab Grown Diamonds &nbsp;&nbsp;|&nbsp;&nbsp; Free Shipping &nbsp;&nbsp;|&nbsp;&nbsp; 7-Day Easy Returns
        </div>
      </div>

      {/* Header / Navigation */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-4' : 'bg-[#fafafa] py-6'}`}>
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            {/* Desktop Logo */}
            <Image
              src="/logo.png"
              alt="Rudakiya Brothers Logo"
              width={200} height={60}
              className="h-[60px] w-auto object-contain object-left hidden md:block transform md:scale-[2.5] origin-left"
              priority
            />
            {/* Mobile Logo */}
            <Image
              src="/logo.png"
              alt="Rudakiya Brothers Logo"
              width={160} height={50}
              className="h-[45px] sm:h-[50px] w-auto object-contain object-left md:hidden block transform scale-[1.8] origin-left ml-2 sm:ml-4"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8 font-inter text-sm font-medium text-gray-800">
            <Link href="/category/rings" className="hover:text-rudakiya-gold transition-colors">Engagement Rings</Link>

            <div className="relative group"
              onMouseEnter={() => setIsJewelryOpen(true)}
              onMouseLeave={() => setIsJewelryOpen(false)}>
              <button className="flex items-center hover:text-rudakiya-gold transition-colors py-2">
                Jewelry <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              {isJewelryOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-gray-100 rounded-3xl py-3 z-50 animate-fadeInUp transition-all duration-300">
                  <Link href="/category/earrings" className="block px-5 py-2.5 mx-2 rounded-2xl hover:bg-rudakiya-goldLight hover:text-rudakiya-gold text-gray-700 transition-colors">Earrings</Link>
                  <Link href="/category/pendants" className="block px-5 py-2.5 mx-2 rounded-2xl hover:bg-rudakiya-goldLight hover:text-rudakiya-gold text-gray-700 transition-colors">Pendants</Link>
                  <Link href="/category/pendants" className="block px-5 py-2.5 mx-2 rounded-2xl hover:bg-rudakiya-goldLight hover:text-rudakiya-gold text-gray-700 transition-colors">Solitaire Pendants</Link>
                  <Link href="/category/bracelets" className="block px-5 py-2.5 mx-2 rounded-2xl hover:bg-rudakiya-goldLight hover:text-rudakiya-gold text-gray-700 transition-colors">Bracelets</Link>
                </div>
              )}
            </div>

            <Link href="/about" className="hover:text-rudakiya-gold transition-colors">About Us</Link>
            <Link href="/blog" className="hover:text-rudakiya-gold transition-colors">Blog</Link>
            <Link href="/faqs" className="hover:text-rudakiya-gold transition-colors">FAQs</Link>
            <Link href="/contact" className="hover:text-rudakiya-gold transition-colors">Contact Us</Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center lg:hidden">
            <button className="text-rudakiya-dark" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
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

          </nav>
        )}
      </header>
    </>
  );
}
