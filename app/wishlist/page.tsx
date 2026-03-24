'use client';

import { useEffect, useState } from 'react';
import { products } from '@/lib/data';
import { Product } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function WishlistPage() {
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchWishlistProducts = () => {
      const wishlistIds = JSON.parse(localStorage.getItem('wishlist') || '[]');
      if (wishlistIds.length === 0) return;

      const items = products.filter(p => wishlistIds.includes(p.id));
      setWishlistProducts(items);
    };

    fetchWishlistProducts();
  }, []);

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Wishlist</h1>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg mb-6">Your wishlist is empty</p>
            <Link href="/" className="luxury-button inline-flex items-center gap-2">
              Start Shopping
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div>
            <p className="text-gray-600 mb-8">
              You have {wishlistProducts.length} item{wishlistProducts.length !== 1 ? 's' : ''} in your wishlist
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
