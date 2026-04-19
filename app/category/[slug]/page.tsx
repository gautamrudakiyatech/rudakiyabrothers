import Image from 'next/image';
import Link from 'next/link';
import { getProducts, getCategories } from '@/lib/firestore';
import ProductCard from '@/components/ProductCard';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import CategoryAdminOverlay from '@/components/CategoryAdminOverlay';

export const dynamic = 'force-dynamic';

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const products = await getProducts({ category: params.slug });
  const categories = await getCategories();
  const currentCategory = categories.find(c => c.slug === params.slug);

  const title = currentCategory ? currentCategory.name : params.slug.replace('-', ' ').toUpperCase();

  return (
    <main className="bg-white min-h-screen pt-32 pb-24 relative">
      <CategoryAdminOverlay categorySlug={params.slug} />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <span className="font-inter font-bold tracking-[0.3em] text-rudakiya-gold text-xs uppercase mb-4 block">
          The Collection
        </span>
        <h1 className="font-playfair text-4xl sm:text-6xl text-rudakiya-dark mb-6 capitalize">
          {title}
        </h1>
        <div className="w-16 h-[2px] bg-rudakiya-gold mx-auto mb-8"></div>
        <p className="font-inter text-gray-500 max-w-2xl mx-auto">
          {currentCategory?.description || `Explore our stunning collection of ${title.toLowerCase()}, crafted with precision and passion.`}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8 border-b border-gray-100 pl-2 pb-4">
          <span className="text-sm text-gray-500 font-inter uppercase tracking-widest">
             Showing {products.length} {products.length === 1 ? 'Product' : 'Products'}
          </span>
        </div>

        {products.length === 0 ? (
          <div className="py-24 text-center">
            <h3 className="font-playfair text-2xl text-gray-400 mb-8">Our {title} collection is being curated. Check back soon.</h3>
            
            <CategoryAdminOverlay categorySlug={params.slug} isFirstProduct={true} />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 opacity-50 pointer-events-none">
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
