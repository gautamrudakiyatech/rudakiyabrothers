'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface AsyncImageProps extends ImageProps {
  containerClassName?: string;
}

export default function AsyncImage({ containerClassName = '', className = '', ...props }: AsyncImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${!isLoaded ? 'bg-gray-200 animate-pulse' : ''} ${containerClassName}`}>
      <Image
        {...props}
        className={`${className} transition-opacity duration-700 ${!isLoaded ? 'opacity-0' : 'opacity-100'}`}
        onLoad={(e) => {
          setIsLoaded(true);
          if (props.onLoad) props.onLoad(e);
        }}
      />
    </div>
  );
}
