'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Product } from '@/lib/data';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedMetal, setSelectedMetal] = useState(product.metal_options[0]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isPrimaryLoaded, setIsPrimaryLoaded] = useState(false);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
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
    <Link href={`/product/${product.slug}`}>
      <div className="group relative bg-[#fafafa] rounded-3xl overflow-hidden transition-all duration-500 shadow-sm hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 flex flex-col h-full border border-gray-100">
        
        {/* Image Container with CSS Hover Effect and Shimmer Pulse */}
        <div className={`relative aspect-[4/5] overflow-hidden w-full transition-colors duration-500 ${!isPrimaryLoaded ? 'bg-gray-200 animate-pulse' : 'bg-white'}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            onLoad={() => setIsPrimaryLoaded(true)}
            className={`object-cover transition-opacity duration-700 ${!isPrimaryLoaded ? 'opacity-0' : 'opacity-100'} ${product.images[1] ? 'group-hover:opacity-0' : ''}`}
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-cover transition-opacity duration-700 opacity-0 group-hover:opacity-100 absolute inset-0"
            />
          )}

          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className="absolute top-4 right-4 p-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-[0_4px_10px_rgb(0,0,0,0.1)] transition-all hover:scale-110 z-10 border border-white"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-500 hover:text-red-500'
              }`}
            />
          </button>
        </div>

        {/* Info Container */}
        <div className="p-6 flex flex-col flex-grow bg-white">
          <h3 className="font-inter text-base font-semibold text-rudakiya-dark mb-1 line-clamp-2 group-hover:text-rudakiya-gold transition-colors">
            {product.name}
          </h3>
          
          <p className="font-inter text-xs text-gray-500 mb-4 tracking-wide uppercase">
            {product.diamond_carat} ct {product.diamond_shape} | {product.diamond_color} {product.diamond_clarity}
          </p>
          
          <div className="flex items-center justify-between mb-4 mt-auto">
            <span className="font-inter text-xl font-bold text-rudakiya-dark">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Metal Selector */}
          <div className="flex gap-2">
            {product.metal_options.map((metal) => (
              <button
                key={metal}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedMetal(metal);
                }}
                className={`flex-1 py-2 px-3 text-[10px] sm:text-xs font-inter font-medium rounded-full border transition-all duration-300 ${
                  selectedMetal === metal
                    ? 'border-rudakiya-gold bg-rudakiya-goldLight text-rudakiya-gold shadow-sm'
                    : 'border-gray-100 text-gray-500 hover:border-rudakiya-gold hover:text-rudakiya-gold bg-[#fafafa]'
                }`}
              >
                {metal.replace(' Gold', '')}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
