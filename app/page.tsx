'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { categories, products, reviews } from '@/lib/data';
import { ChevronRight, ChevronDown, Award, Truck, RotateCcw, Sparkles, PhoneCall, Diamond, Gem, ShieldCheck } from 'lucide-react';

const diamondShapes = ['Asscher', 'Cushion', 'Oval', 'Marquise', 'Round', 'Radiant', 'Heart', 'Emerald', 'Pear', 'Princess'];

const promises = [
  { icon: ShieldCheck, title: 'Certified Jewelry', desc: 'Get 100% authentication certificate' },
  { icon: Award, title: 'Hallmarked Gold', desc: 'Offering only the finest, certified hallmarked gold' },
  { icon: RotateCcw, title: 'Easy Exchange & Buyback', desc: 'Lifetime exchange & buyback available' },
  { icon: Truck, title: 'Easy Shipping & Insurance', desc: 'Fast, reliable shipping to your doorstep' },
  { icon: PhoneCall, title: 'Free Diamond Consultation', desc: 'Call us on +91 93248 83465' },
  { icon: Diamond, title: 'Bespoke Options Available', desc: 'Discover our bespoke jewelry options, crafted uniquely for you.' },
  { icon: RotateCcw, title: 'Easy Returns', desc: 'Avail easy return policy until 7 days' },
];

export default function Home() {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Wait for the full page to load before revealing content
    if (document.readyState === 'complete') {
      setTimeout(() => setIsLoaded(true), 400);
    } else {
      const handleLoad = () => setTimeout(() => setIsLoaded(true), 400);
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  // Engagement rings (assuming all mock products are engagement rings from category 1)
  const featuredProducts = products.filter(p => p.is_featured);

  return (
    <>
      {/* Global Preloader */}
      <div
        className={`fixed inset-0 z-[100] bg-[#fafafa] flex flex-col items-center justify-center transition-all duration-[1200ms] ease-in-out ${isLoaded ? 'opacity-0 pointer-events-none -translate-y-8' : 'opacity-100 translate-y-0'
          }`}
      >
        <div className="relative h-16 md:h-20 mb-8 animate-pulse">
          <img src="/logo.png" alt="Rudakiya Brothers" className="h-full w-auto object-contain invert transform scale-[1.3]" />
        </div>
        <div className="flex space-x-2">
          <div className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>

      <main className={`bg-white transition-opacity duration-1000 delay-500 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>

        {/* 1. HERO SECTION */}
        <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            {/*
            To use your own video:
            - Place your video (e.g., 'hero.mp4') inside the 'public' folder.
            - Update the src attribute under <source> below to '/hero.mp4'.
          */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="object-cover w-full h-full"
            >
              {/* Free gorgeous placeholder jewelry video for now */}
              <source src="my-hero-video.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="absolute inset-x-0 bottom-12 flex flex-col items-center justify-center z-10 animate-fade-in-up">
            <Link
              href="/category/rings"
              className="group flex flex-col items-center cursor-pointer"
            >
              <div className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-inter text-xs font-medium tracking-[0.2em] uppercase hover:bg-white hover:text-gray-900 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-500 rounded-full mb-6 flex items-center shadow-lg">
                Explore Collection
              </div>
              <ChevronDown
                className="w-8 h-8 text-white/70 group-hover:text-white transform group-hover:translate-y-2 transition-all duration-500"
                strokeWidth={1}
              />
            </Link>
          </div>
        </section>

        {/* 2. SHOP BY CATEGORY */}
        <section className="relative py-24 bg-[#FAFAFA] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
            <h2 className="font-inter font-semibold tracking-[0.2em] text-[#6c7f8c] text-sm uppercase mb-3">Shop by Category</h2>
            <div className="w-8 h-[1px] bg-gray-300 mb-16"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full mt-4">
              {[
                {
                  name: 'RINGS',
                  img: 'rings.jpg',
                  href: '/category/rings',
                },
                {
                  name: 'BRACELETS',
                  img: 'BRACELETS.jpg',
                  href: '/category/bracelets',
                },
                {
                  name: 'PENDANTS',
                  img: 'PENDANTS.jpg',
                  href: '/category/pendants',
                },
                {
                  name: 'EARRINGS',
                  img: 'EARRINGS.jpg',
                  href: '/category/earrings',
                },
              ].map((cat, idx) => (
                <Link key={idx} href={cat.href} className="group relative flex flex-col justify-end p-6 md:p-8 h-[240px] md:h-[280px] rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                  {/* Full Background Image */}
                  <div className="absolute inset-0 z-0 bg-white">
                    <img
                      src={cat.img}
                      alt={cat.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Light shade gradient at the bottom for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 to-transparent opacity-90 z-10 transition-opacity duration-500 group-hover:opacity-100"></div>

                  {/* Text Content */}
                  <div className="relative z-20 flex flex-col items-center mt-auto">
                    <h3 className="font-playfair font-bold tracking-widest text-gray-900 text-xl uppercase group-hover:text-amber-600 transition-colors duration-300">
                      {cat.name}
                    </h3>
                    <span className="font-inter text-xs tracking-[0.2em] text-gray-500 mt-2 opacity-0 group-hover:opacity-100 hover:text-amber-600 transition-all duration-500 uppercase">
                      Explore &gt;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 3. GIFTING COLLECTION BANNER */}
        <section className="bg-[#fafafa] py-16 md:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] transition-shadow duration-500 overflow-hidden rounded-3xl group">
              <div className="bg-white p-8 md:p-12 lg:p-20 flex flex-col justify-center">
                <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-6">Gifting Collection</h2>
                <p className="font-inter text-gray-600 leading-relaxed mb-8 text-base md:text-lg">
                  Welcome to Jewels of Joy, where our jewelry turns every occasion into a celebration. Each piece is crafted to perfection, offering unmatched beauty and timeless brilliance. Gift pure joy with diamonds that shine forever.
                </p>
                <div>
                  <Link href="/gifting" className="px-8 py-3 bg-gray-900 text-white font-inter rounded-full hover:bg-amber-600 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 tracking-wide inline-block">
                    Shop Now
                  </Link>
                </div>
              </div>
              <div className="relative min-h-[350px] md:min-h-[450px]">
                <Image
                  src="Gifting.jpg"
                  alt="Gifting Jewelry"
                  fill
                  className="object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 4. FEATURED PRODUCTS — "Engagement Rings" */}
        <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="flex justify-between items-end mb-8 md:mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl text-gray-900">Engagement Rings</h2>
            <Link href="/category/rings" className="font-inter text-amber-600 hover:text-amber-800 font-medium uppercase text-sm tracking-widest hidden sm:block">
              See all
            </Link>
          </div>

          <div className="flex overflow-x-auto space-x-6 pb-8 hide-scrollbar snap-x">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="min-w-[280px] md:min-w-[320px] flex-shrink-0 snap-start group relative cursor-pointer"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative h-[380px] bg-[#fafafa] rounded-2xl mb-4 overflow-hidden shadow-sm group-hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] group-hover:-translate-y-3 transition-all duration-500">
                  <Image
                    src={hoveredProduct === product.id && product.images[1] ? product.images[1] : product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-opacity duration-500"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-inter text-gray-900 font-medium mb-1 truncate">{product.name}</h3>
                  <p className="font-inter text-gray-500 text-sm mb-3">From Rs. {product.price.toLocaleString('en-IN')}</p>
                  <div className="flex space-x-2">
                    <span className="w-4 h-4 rounded-full bg-[#E5D7B7] border border-gray-300" title="Yellow Gold"></span>
                    <span className="w-4 h-4 rounded-full bg-[#E8E8E8] border border-gray-300" title="White Gold"></span>
                    <span className="w-4 h-4 rounded-full bg-[#E0BFB8] border border-gray-300" title="Rose Gold"></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. BRAND QUOTE */}
        <section className="bg-white py-24 text-center px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-playfair italic text-3xl md:text-5xl text-gray-800 leading-snug">
              "Trust us to speak your love language while you create wonderful memories"
            </h2>
          </div>
        </section>

        {/* 6. WHY CHOOSE US SECTION */}
        <section className="bg-[#fafafa] py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="font-playfair text-3xl md:text-4xl text-gray-900 mb-6 md:mb-8">Why choose Rudakiya Brothers?</h2>
                <p className="font-inter text-gray-600 leading-relaxed max-w-lg mb-8 text-base md:text-lg">
                  Rudakiya Brothers is a harmonious blend of luxury and science, where every piece of jewelry tells a tale of everlasting elegance. With over a decade in the diamond industry, we are leveraging cutting-edge technology to innovate and craft perfect designs that resonate with customers like you.
                </p>
                <Link href="/about" className="px-8 py-3 bg-gray-900 text-white font-inter rounded-full hover:bg-amber-600 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 tracking-wide inline-block">
                  Know More
                </Link>
              </div>
              <div className="order-1 lg:order-2 relative h-[300px] sm:h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.15)] transition-all duration-500 group">
                <Image
                  src="https://images.pexels.com/photos/1454175/pexels-photo-1454175.jpeg?auto=compress&cs=tinysrgb&w=1000"
                  alt="Woman wearing jewelry"
                  fill
                  className="object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 7. SHOP BY SHAPE */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl text-gray-900 mb-12">Shop By Shape</h2>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-10">
            {diamondShapes.map((shape) => (
              <Link key={shape} href={`/search?shape=${shape.toLowerCase()}`} className="flex flex-col items-center group">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-gray-200 bg-[#fafafa] flex items-center justify-center mb-3 group-hover:border-amber-500 group-hover:shadow-md transition-all">
                  <Gem className="w-6 h-6 md:w-8 md:h-8 text-gray-400 group-hover:text-amber-500 transition-colors" />
                </div>
                <span className="font-inter text-sm text-gray-700 group-hover:text-amber-600">{shape}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* 8. OUR 2 C'S — CONSULTATIONS & CUSTOMIZATIONS */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Consultations */}
            <div className="bg-[#fafafa] p-8 md:p-12 text-center rounded-3xl group overflow-hidden relative shadow-sm hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500">
              <div className="relative h-48 md:h-64 mb-8 w-full rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src="https://images.pexels.com/photos/3635300/pexels-photo-3635300.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Consultations"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <h3 className="font-playfair text-3xl text-gray-900 mb-4 opacity-100 group-hover:opacity-90 transition-opacity">Consultations</h3>
              <p className="font-inter text-gray-600 mb-8 max-w-md mx-auto group-hover:text-gray-800 transition-colors">
                Having trouble deciding on the perfect cut? Worry not! Our team of jewelry experts is ready to assist you. Schedule a virtual consultation for personalized guidance.
              </p>
              <Link href="/consultation" className="px-6 py-3 border border-gray-900 text-gray-900 font-inter rounded-full hover:bg-gray-900 hover:text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300 inline-block mt-2">
                Book An Appointment
              </Link>
            </div>

            {/* Customizations */}
            <div className="bg-[#fafafa] p-8 md:p-12 text-center rounded-3xl group overflow-hidden relative shadow-sm hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500">
              <div className="relative h-48 md:h-64 mb-8 w-full rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src="https://images.pexels.com/photos/1721943/pexels-photo-1721943.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Customizations"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <h3 className="font-playfair text-3xl text-gray-900 mb-4 opacity-100 group-hover:opacity-90 transition-opacity">Customizations</h3>
              <p className="font-inter text-gray-600 mb-8 max-w-md mx-auto group-hover:text-gray-800 transition-colors">
                Align your desires with the finesse of our talented artisans, and let us craft that perfect piece of jewelry tailored just for you.
              </p>
              <Link href="/customize" className="px-6 py-3 border border-gray-900 text-gray-900 font-inter rounded-full hover:bg-gray-900 hover:text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300 inline-block mt-2">
                Customize Now
              </Link>
            </div>
          </div>
        </section>

        {/* 9. ASSOCIATED WITH */}
        <section className="border-t border-b border-gray-100 py-12 md:py-16 text-center bg-white">
          <h2 className="font-playfair text-xl md:text-2xl text-gray-500 mb-6 md:mb-8 uppercase tracking-widest">Associated With</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-24 opacity-70 grayscale px-4">
            {/* Mock Logos */}
            <div className="font-playfair font-bold text-2xl md:text-3xl text-gray-800">IGI</div>
            <div className="font-playfair font-bold text-2xl md:text-3xl text-gray-800">SGL</div>
            <div className="font-playfair font-bold text-2xl md:text-3xl text-gray-800">GJEPC</div>
          </div>
        </section>

        {/* 10. OUR PROMISE */}
        <section className="bg-[#fafafa] py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-playfair text-4xl text-gray-900 mb-16">Our Promise</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6">
              {promises.map((promise, index) => {
                const Icon = promise.icon;
                return (
                  <div key={index} className="flex flex-col items-center p-4">
                    <div className="w-12 h-12 mb-4 text-amber-600 flex items-center justify-center">
                      <Icon strokeWidth={1.5} className="w-10 h-10" />
                    </div>
                    <h3 className="font-inter font-semibold text-gray-900 text-sm mb-2">{promise.title}</h3>
                    <p className="font-inter text-gray-500 text-xs leading-relaxed">{promise.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 11. CUSTOMER REVIEWS */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
          <h2 className="font-playfair text-4xl text-center text-gray-900 mb-16">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-8 border border-gray-100 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 hover:bg-[#fafafa] transition-all duration-500 flex flex-col group relative overflow-hidden">
                <div className="flex text-amber-500 mb-6 transition-transform duration-300 group-hover:scale-105 origin-left">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="font-playfair italic text-gray-700 text-lg mb-6 flex-grow leading-relaxed">"{review.comment}"</p>
                <h4 className="font-inter font-semibold text-gray-900 text-sm uppercase tracking-wider">— {review.customer_name}</h4>
              </div>
            ))}
          </div>
        </section>

        <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      </main>
    </>
  );
}
