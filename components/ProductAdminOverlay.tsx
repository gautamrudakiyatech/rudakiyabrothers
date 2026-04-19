"use client";

import React, { useState } from 'react';
import SectionEditButton from './SectionEditButton';
import ProductModal from './ProductModal';
import { Product } from '@/lib/types';

export default function ProductAdminOverlay({ product }: { product: Product }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-20 right-4 z-50">
        <SectionEditButton onEdit={() => setIsOpen(true)} editLabel="Edit This Product" className="!relative !top-0 !right-0 shadow-xl" />
      </div>

      <ProductModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        product={product} 
      />
    </>
  );
}
