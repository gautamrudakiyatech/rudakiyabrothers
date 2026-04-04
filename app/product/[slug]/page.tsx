'use client';

import { useState } from 'react';
import Image from 'next/image';
import { products } from '@/lib/data';
import { Heart, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import Link from 'next/link';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.slug === params.slug);
  const [selectedMetal, setSelectedMetal] = useState(product?.metal_options[0] || '');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#fafafa]">
        <div className="text-center">
          <h1 className="font-playfair text-4xl text-rudakiya-dark mb-6">Product not found</h1>
          <Link href="/" className="px-8 py-3 bg-rudakiya-dark text-white font-inter rounded-full hover:bg-rudakiya-gold transition-colors inline-block">
            Back to Collection
          </Link>
        </div>
      </div>
    );
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (!isWishlisted) {
      wishlist.push(product.id);
    } else {
      const index = wishlist.indexOf(product.id);
      if (index > -1) wishlist.splice(index, 1);
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  };

  return (
    <div className="bg-[#fafafa] min-h-screen py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left Column: Image Gallery */}
          <div className="space-y-6">
            <div className="relative h-[400px] md:h-[600px] w-full rounded-3xl overflow-hidden shadow-[0_4px_30px_rgb(0,0,0,0.05)] bg-white border border-gray-100">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                priority
                className="object-cover transform transition-transform duration-700 hover:scale-105"
              />
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === index ? 'border-rudakiya-gold shadow-md scale-105' : 'border-transparent opacity-70 hover:opacity-100 bg-white'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="flex flex-col">
            <Link href="/category/rings" className="font-inter text-xs font-semibold tracking-widest text-rudakiya-gold uppercase mb-4 hover:text-rudakiya-gold transition-colors">
              Engagement Rings
            </Link>
            <h1 className="font-playfair text-4xl md:text-5xl text-rudakiya-dark mb-4">{product.name}</h1>
            <p className="font-inter text-gray-500 text-lg mb-8 leading-relaxed">{product.description}</p>

            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-inter text-3xl font-bold text-rudakiya-dark">₹{product.price.toLocaleString('en-IN')}</span>
              <span className="font-inter text-sm text-gray-400">inclusive of all taxes</span>
            </div>

            {/* Technical Specs */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mb-8">
              <h3 className="font-inter font-semibold text-rudakiya-dark mb-4 tracking-wide">Diamond Specifications</h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="font-inter text-sm text-gray-500">Shape</span>
                  <span className="font-inter text-sm font-medium text-rudakiya-dark">{product.diamond_shape}</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="font-inter text-sm text-gray-500">Carat Weight</span>
                  <span className="font-inter text-sm font-medium text-rudakiya-dark">{product.diamond_carat} ct</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="font-inter text-sm text-gray-500">Color</span>
                  <span className="font-inter text-sm font-medium text-rudakiya-dark">{product.diamond_color}</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="font-inter text-sm text-gray-500">Clarity</span>
                  <span className="font-inter text-sm font-medium text-rudakiya-dark">{product.diamond_clarity}</span>
                </div>
              </div>
            </div>

            {/* Customizations */}
            <div className="mb-8">
              <h3 className="font-inter font-semibold text-rudakiya-dark mb-4">Select Metal</h3>
              <div className="flex flex-wrap gap-3">
                {product.metal_options.map((metal) => (
                  <button
                    key={metal}
                    onClick={() => setSelectedMetal(metal)}
                    className={`px-6 py-3 rounded-full font-inter text-sm transition-all duration-300 border ${
                      selectedMetal === metal
                        ? 'border-rudakiya-gold bg-rudakiya-goldLight text-rudakiya-gold shadow-sm'
                        : 'border-gray-200 text-gray-600 hover:border-rudakiya-gold hover:text-rudakiya-gold bg-white'
                    }`}
                  >
                    {metal}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 mb-10">
              <Link
                href="/contact"
                className="flex-1 font-inter font-medium py-4 rounded-full flex items-center justify-center gap-2 transition-all duration-300 shadow-md bg-rudakiya-dark text-white hover:bg-rudakiya-gold hover:shadow-xl hover:-translate-y-1"
              >
                Inquire About This Piece
              </Link>

              <button
                onClick={toggleWishlist}
                className="p-4 bg-white border border-gray-200 rounded-full hover:border-red-500 hover:shadow-md transition-all duration-300 group"
              >
                <Heart className={`w-5 h-5 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover:text-red-500'}`} />
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="w-10 h-10 bg-rudakiya-goldLight rounded-full flex items-center justify-center mb-3">
                  <Truck className="w-5 h-5 text-rudakiya-gold" />
                </div>
                <h4 className="font-inter font-semibold text-rudakiya-dark text-sm mb-1">Free Insured Shipping</h4>
                <p className="font-inter text-xs text-gray-500">Secure Pan-India delivery</p>
              </div>
              
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="w-10 h-10 bg-rudakiya-goldLight rounded-full flex items-center justify-center mb-3">
                  <RotateCcw className="w-5 h-5 text-rudakiya-gold" />
                </div>
                <h4 className="font-inter font-semibold text-rudakiya-dark text-sm mb-1">7-Day Returns</h4>
                <p className="font-inter text-xs text-gray-500">100% money back guarantee</p>
              </div>
              
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="w-10 h-10 bg-rudakiya-goldLight rounded-full flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5 text-rudakiya-gold" />
                </div>
                <h4 className="font-inter font-semibold text-rudakiya-dark text-sm mb-1">Lifetime Warranty</h4>
                <p className="font-inter text-xs text-gray-500">100% exchange value</p>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
