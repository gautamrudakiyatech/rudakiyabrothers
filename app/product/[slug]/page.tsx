'use client';

import { useState } from 'react';
import Image from 'next/image';
import { products } from '@/lib/data';
import { ShoppingCart, Heart, Check } from 'lucide-react';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.slug === params.slug);
  const [selectedMetal, setSelectedMetal] = useState(product?.metal_options[0] || '');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product not found</h1>
          <a href="/" className="luxury-button inline-block">
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      metal: selectedMetal,
      image: product.images[0],
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (!isWishlisted) {
      wishlist.push(product.id);
    } else {
      const index = wishlist.indexOf(product.id);
      if (index > -1) wishlist.splice(index, 1);
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="relative h-96 md:h-screen max-h-[600px] mb-4 overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex gap-3 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-amber-600' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-gray-600 text-lg mb-6">{product.description}</p>

            <div className="mb-8">
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold text-amber-700">${product.price.toLocaleString()}</span>
                <span className="text-gray-500 line-through">Certified Lab-Grown</span>
              </div>

              <div className="bg-amber-50 p-6 rounded-lg mb-6">
                <h3 className="font-bold text-gray-900 mb-4">Diamond Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Shape</p>
                    <p className="font-semibold text-gray-900">{product.diamond_shape}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Carat Weight</p>
                    <p className="font-semibold text-gray-900">{product.diamond_carat} ct</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Color</p>
                    <p className="font-semibold text-gray-900">{product.diamond_color}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Clarity</p>
                    <p className="font-semibold text-gray-900">{product.diamond_clarity}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-4">Metal Type</h3>
              <div className="flex gap-3">
                {product.metal_options.map((metal) => (
                  <button
                    key={metal}
                    onClick={() => setSelectedMetal(metal)}
                    className={`px-6 py-3 rounded-lg border-2 font-semibold transition-all ${
                      selectedMetal === metal
                        ? 'border-amber-600 bg-amber-50 text-amber-900'
                        : 'border-gray-200 text-gray-700 hover:border-amber-300'
                    }`}
                  >
                    {metal}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-4">Quantity</h3>
              <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  −
                </button>
                <span className="px-6 py-2 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <button
                onClick={addToCart}
                className="flex-1 luxury-button flex items-center justify-center gap-2"
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </button>
              <button
                onClick={toggleWishlist}
                className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:border-red-500 transition-colors"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
              </button>
            </div>

            <div className="border-t pt-6 space-y-4">
              <div className="flex items-start gap-4">
                <span className="text-2xl">✓</span>
                <div>
                  <p className="font-semibold text-gray-900">Free Shipping Worldwide</p>
                  <p className="text-sm text-gray-600">Complimentary delivery on all orders</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">✓</span>
                <div>
                  <p className="font-semibold text-gray-900">30-Day Returns</p>
                  <p className="text-sm text-gray-600">Hassle-free returns within 30 days</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">✓</span>
                <div>
                  <p className="font-semibold text-gray-900">Lifetime Warranty</p>
                  <p className="text-sm text-gray-600">Lifetime exchange and repair warranty</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
