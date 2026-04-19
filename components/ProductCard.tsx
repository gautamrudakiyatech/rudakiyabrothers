'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { useState } from 'react';
import SectionEditButton from './SectionEditButton';
import ProductModal from './ProductModal';
import ConfirmDialog from './ConfirmDialog';
import { deleteProduct } from '@/lib/adminFirestore';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isPrimaryLoaded, setIsPrimaryLoaded] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteProduct(product);
      toast.success('Product deleted');
    } catch (e) {
      toast.error('Failed to delete product');
    }
  };

  return (
    <>
      <div className="group relative bg-[#fffcf9] rounded-[1.5rem] overflow-hidden transition-all duration-1000 hover:shadow-[0_45px_100px_rgba(0,0,0,0.12)] hover:-translate-y-4 flex flex-col h-full border border-rudakiya-gold/20 hover:border-rudakiya-gold/50">
        
        <SectionEditButton 
          onEdit={() => setIsEditOpen(true)} 
          onDelete={() => setIsDeleteOpen(true)} 
        />

        <Link href={`/product/${product.slug}`} className="flex-1 flex flex-col relative p-4">
          {/* Badge Style - "Registry Seal" style */}
          {product.badge && (
            <span className="absolute top-6 left-6 z-20 bg-rudakiya-dark text-white text-[7px] uppercase font-bold tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg border border-white/10 opacity-90">
              {product.badge}
            </span>
          )}

          <div className={`relative aspect-[1/1] overflow-hidden w-full transition-colors duration-1000 bg-white rounded-2xl shadow-inner`}>
            <Image
              src={product.coverImage || product.images?.[0] || 'https://images.pexels.com/photos/placeholder'}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
              onLoad={() => setIsPrimaryLoaded(true)}
              className={`object-contain p-6 transition-all duration-1000 ease-in-out ${!isPrimaryLoaded ? 'opacity-0 scale-105' : 'opacity-100 scale-100'} group-hover:scale-110`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/[0.04] to-transparent opacity-100"></div>
          </div>

          <div className="p-4 flex flex-col flex-grow items-center text-center">
            <h3 className="font-playfair text-xl sm:text-2xl text-rudakiya-dark mb-2 tracking-tight leading-tight group-hover:text-rudakiya-gold transition-colors duration-500 min-h-[3rem] flex items-center justify-center">
              {product.name}
            </h3>
            
            {product.price ? (
              <p className="text-rudakiya-gold font-playfair text-lg sm:text-xl font-bold mb-3">
                {product.currency === 'USD' ? '$' : '₹'}{product.price.toLocaleString('en-IN')}
              </p>
            ) : (
              <div className="h-6 mb-3"></div>
            )}

            <div className="w-10 h-[1px] bg-gradient-to-r from-transparent via-rudakiya-gold/40 to-transparent mb-4"></div>

            <div className="flex flex-col space-y-1.5 min-h-[2.5rem] justify-center">
              {product.productCode && (
                <p className="text-[10px] text-rudakiya-gold font-bold tracking-widest uppercase mb-1">
                  ID: {product.productCode}
                </p>
              )}
              <p className="font-inter text-[11px] text-rudakiya-dark font-bold tracking-[0.2em] uppercase">
                {product.diamondWeight && `${product.diamondWeight} `}{product.diamondShape}
              </p>
              <p className="font-inter text-[9px] text-gray-500 tracking-[0.15em] uppercase font-medium">
                {product.colour} {product.clarity} <span className="mx-1.5 opacity-40">•</span> {product.metalType}
              </p>
            </div>

            {/* View Details Hint - More professional fixed button appearance on hover */}
            <div className="mt-8 transition-all duration-500 opacity-0 group-hover:opacity-100">
               <span className="inline-block py-2 px-8 bg-rudakiya-dark text-white text-[9px] uppercase tracking-[0.3em] font-bold rounded-full transition-all duration-300 hover:bg-black hover:scale-105">
                 Discover More
               </span>
            </div>
          </div>
        </Link>
      </div>

      <ProductModal 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        product={product} 
      />

      <ConfirmDialog 
        isOpen={isDeleteOpen} 
        onClose={() => setIsDeleteOpen(false)} 
        onConfirm={handleDelete} 
        title={`Delete ${product.name}?`} 
        message="This action cannot be undone. It will permanently remove the product and its images." 
        confirmLabel="Delete"
      />
    </>
  );
}
