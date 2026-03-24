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
      <div className="group relative bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <button
            onClick={toggleWishlist}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md transition-all hover:scale-110 z-10"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'
              }`}
            />
          </button>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-700 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            {product.diamond_carat} ct {product.diamond_shape} | {product.diamond_color} {product.diamond_clarity}
          </p>
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-amber-700">
              ${product.price.toLocaleString()}
            </span>
          </div>
          <div className="flex gap-2">
            {product.metal_options.map((metal) => (
              <button
                key={metal}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedMetal(metal);
                }}
                className={`flex-1 py-2 px-3 text-xs rounded-md border transition-all ${
                  selectedMetal === metal
                    ? 'border-amber-600 bg-amber-50 text-amber-900'
                    : 'border-gray-200 text-gray-600 hover:border-amber-300'
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
