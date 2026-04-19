'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Preloader({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const hideLoader = () => setIsLoaded(true);

    if (document.readyState === 'complete') {
      setTimeout(hideLoader, 400);
    } else {
      const fallbackTimer = setTimeout(hideLoader, 1500);

      const handleLoad = () => {
        clearTimeout(fallbackTimer);
        setTimeout(hideLoader, 400);
      };

      window.addEventListener('load', handleLoad);
      return () => {
        clearTimeout(fallbackTimer);
        window.removeEventListener('load', handleLoad);
      };
    }
  }, []);

  return (
    <>
      <div
        className={`fixed inset-0 z-[100] bg-[#fafafa] flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${isLoaded ? 'opacity-0 pointer-events-none -translate-y-8' : 'opacity-100 translate-y-0'
          }`}
      >
        <div className="relative h-16 md:h-20 mb-8 animate-pulse text-center flex justify-center w-full">
          <Image src="/logo.png" alt="Rudakiya Brothers" width={250} height={80} className="h-full w-auto object-contain transform scale-[1.3]" priority />
        </div>
        <div className="flex space-x-2">
          <div className="w-1.5 h-1.5 bg-rudakiya-gold rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-1.5 h-1.5 bg-rudakiya-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-1.5 h-1.5 bg-rudakiya-gold rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
      
      <div className={`transition-opacity duration-1000 delay-500 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {children}
      </div>
    </>
  );
}
