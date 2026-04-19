"use client";

import React, { useState } from 'react';
import SectionEditButton from './SectionEditButton';
import ProductModal from './ProductModal';
import { Product } from '@/lib/types';

interface Props {
  categorySlug: string;
  isFirstProduct?: boolean;
}

export default function CategoryAdminOverlay({ categorySlug, isFirstProduct }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  // We can pass a partial product to prefill the category
  const initialProduct: Partial<Product> = {
    category: categorySlug
  };

  return (
    <>
      {isFirstProduct ? (
        <div className="flex justify-center mb-12">
          <SectionEditButton onAdd={() => setIsOpen(true)} addLabel="Add First Product" className="!relative !top-0 !right-0" />
        </div>
      ) : (
        <SectionEditButton onAdd={() => setIsOpen(true)} addLabel="Add Product" />
      )}

      <ProductModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        product={initialProduct as Product} 
      />
    </>
  );
}
