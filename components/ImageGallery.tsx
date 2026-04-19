'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Props {
  images: string[];
  productName: string;
}

export default function ImageGallery({ images, productName }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return <div className="aspect-[4/5] bg-gray-100 rounded-3xl w-full"></div>;
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden bg-[#fafafa] border border-gray-100">
        <Image 
           src={images[currentIndex]} 
           alt={`${productName} view ${currentIndex + 1}`} 
           fill 
           sizes="(max-width: 1024px) 100vw, 50vw"
           className="object-cover"
           priority
        />
      </div>

      {images.length > 1 && (
        <div className="flex overflow-x-auto gap-4 pb-2 hide-scrollbar">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative flex-shrink-0 w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden border-2 transition-all ${
                currentIndex === idx ? 'border-rudakiya-dark' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
               <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
