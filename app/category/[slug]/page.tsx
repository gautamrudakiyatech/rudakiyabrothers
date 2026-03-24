'use client';

import { useState, useMemo } from 'react';
import { products, categories } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { ChevronDown } from 'lucide-react';

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
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedMetal, setSelectedMetal] = useState<string | null>(null);

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
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-2 capitalize">
          {params.slug}
        </h1>
        <p className="text-gray-600 mb-8">
          Explore our exquisite collection of {params.slug}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
              <h2 className="font-bold text-lg text-gray-900 mb-6">Filters</h2>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  Diamond Shape <ChevronDown className="w-4 h-4" />
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedShape(null)}
                    className={`w-full text-left px-3 py-2 rounded transition-colors ${
                      selectedShape === null ? 'bg-amber-100 text-amber-900' : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Shapes
                  </button>
                  {shapes.map((shape) => (
                    <button
                      key={shape}
                      onClick={() => setSelectedShape(shape)}
                      className={`w-full text-left px-3 py-2 rounded transition-colors ${
                        selectedShape === shape ? 'bg-amber-100 text-amber-900' : 'text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {shape}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  Metal Type <ChevronDown className="w-4 h-4" />
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedMetal(null)}
                    className={`w-full text-left px-3 py-2 rounded transition-colors ${
                      selectedMetal === null ? 'bg-amber-100 text-amber-900' : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Metals
                  </button>
                  {metals.map((metal) => (
                    <button
                      key={metal}
                      onClick={() => setSelectedMetal(metal)}
                      className={`w-full text-left px-3 py-2 rounded transition-colors ${
                        selectedMetal === metal ? 'bg-amber-100 text-amber-900' : 'text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {metal}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="text-gray-600 mb-6">
              Showing {filteredProducts.length} of {categoryProducts.length} products
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No products found matching your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
