'use client';

import { useState, useMemo } from 'react';
import { products } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryMap: { [key: string]: string } = {
    rings: '1',
    earrings: '2',
    pendants: '3',
    bracelets: '4',
  };

  const categoryId = categoryMap[params.slug];
  const categoryProducts = products.filter((p) => p.category_id === categoryId);

  const [selectedShape, setSelectedShape] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [selectedMetal, setSelectedMetal] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const shapes = useMemo(() => Array.from(new Set(categoryProducts.map((p) => p.diamond_shape).filter(Boolean))), [categoryProducts]);
  const metals = useMemo(() => Array.from(new Set(categoryProducts.flatMap((p) => p.metal_options))), [categoryProducts]);

  const filteredProducts = useMemo(() => {
    let filtered = categoryProducts;

    if (selectedShape) {
      filtered = filtered.filter((p) => p.diamond_shape === selectedShape);
    }

    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (selectedMetal) {
      filtered = filtered.filter((p) => p.metal_options.includes(selectedMetal));
    }

    return filtered;
  }, [categoryProducts, selectedShape, priceRange, selectedMetal]);

  return (
    <div className="bg-[#fafafa] min-h-screen pb-24">
      {/* Category Header */}
      <div className="bg-white border-b border-gray-100 py-16 md:py-20 text-center animate-fade-in-up">
        <div className="container mx-auto px-4">
          <h1 className="font-playfair text-5xl md:text-6xl text-rudakiya-dark mb-4 capitalize">
            {params.slug}
          </h1>
          <p className="font-inter text-gray-500 max-w-xl mx-auto tracking-wide">
            Explore our exquisite collection of lab-grown diamond {params.slug}, crafted to perfection.
          </p>
          <div className="w-16 h-[1px] bg-rudakiya-gold mx-auto mt-8"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-col gap-10">
          
          {/* Products Grid */}
          <div className="w-full">
            <div className="hidden lg:block font-inter text-gray-500 mb-6 text-sm text-center">
              Showing {filteredProducts.length} of {categoryProducts.length} {params.slug}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 mt-4">
                <p className="font-playfair text-2xl text-rudakiya-dark mb-3">No matches found</p>
                <p className="font-inter text-gray-500 mb-6">Sorry, we don't have any products available in this category right now.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
