"use client";

import React from 'react';

export default function ProductCardSkeleton() {
  return (
    <div className="bg-[#fafafa] rounded-3xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col h-full border border-gray-100 animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-[3/4] overflow-hidden w-full bg-gray-200">
        <div className="absolute top-4 right-4 p-2.5 bg-white/50 rounded-full w-10 h-10"></div>
      </div>

      {/* Content Skeleton */}
      <div className="p-6 flex flex-col flex-grow bg-white items-center text-center">
        {/* Title */}
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        
        {/* Subtitle */}
        <div className="h-4 bg-gray-100 rounded w-1/2 mb-6"></div>
        
        {/* Button */}
        <div className="mt-auto w-full py-2.5 h-10 border border-gray-200 rounded-full bg-gray-50"></div>
      </div>
    </div>
  );
}
