import { getProduct } from '@/lib/firestore';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ImageGallery from '@/components/ImageGallery';
import { ShieldCheck } from 'lucide-react';
import ProductAdminOverlay from '@/components/ProductAdminOverlay';

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="bg-white min-h-screen pt-32 pb-24 relative">
      <ProductAdminOverlay product={product} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href={`/category/${product.category}`} className="text-sm text-gray-400 hover:text-rudakiya-dark uppercase tracking-widest font-inter">
            &larr; Back to {product.category.replace('-', ' ')}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Gallery */}
          <div className="w-full">
            <ImageGallery images={product.images.length > 0 ? product.images : (product.coverImage ? [product.coverImage] : [])} productName={product.name} />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            {product.badge && (
              <span className="inline-block bg-blue-50 text-blue-800 text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full w-max mb-4">
                {product.badge}
              </span>
            )}

            <h1 className="font-playfair text-3xl sm:text-5xl text-rudakiya-dark mb-4 leading-tight">
              {product.name}
            </h1>

            {product.price && (
              <div className="mb-8 flex items-baseline gap-2">
                <span className="text-rudakiya-gold font-playfair text-3xl sm:text-4xl font-bold">
                  {product.currency === 'USD' ? '$' : '₹'}{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-gray-400 text-xs uppercase tracking-widest font-inter">
                  Estimated Price
                </span>
              </div>
            )}

            <p className="font-inter text-gray-500 leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="w-16 h-[1px] bg-gray-200 mb-8"></div>

            {/* Diamond Details Grid */}
            <h3 className="font-inter text-xs font-bold uppercase tracking-widest text-rudakiya-dark mb-4">Diamond & Metal Specifications</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {product.productCode && (
                <div className="border border-rudakiya-gold/20 rounded-xl p-4 bg-[#fffcf9]">
                  <span className="block text-[10px] text-rudakiya-gold uppercase tracking-widest mb-1 font-bold">Product Code</span>
                  <span className="font-inter text-sm text-rudakiya-dark font-bold">{product.productCode}</span>
                </div>
              )}
              {product.systemId && (
                <div className="border border-gray-100 rounded-xl p-4 bg-[#f8f8f8]">
                  <span className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1 font-bold">System ID</span>
                  <span className="font-inter text-sm text-rudakiya-dark font-bold">{product.systemId}</span>
                </div>
              )}
              {product.diamondWeight && (
                <div className="border border-gray-100 rounded-xl p-4 bg-[#fafafa]">
                  <span className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1">Weight</span>
                  <span className="font-inter text-sm text-rudakiya-dark font-medium">{product.diamondWeight}</span>
                </div>
              )}
              {product.diamondShape && (
                <div className="border border-gray-100 rounded-xl p-4 bg-[#fafafa]">
                  <span className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1">Shape</span>
                  <span className="font-inter text-sm text-rudakiya-dark font-medium">{product.diamondShape}</span>
                </div>
              )}
              {product.colour && (
                <div className="border border-gray-100 rounded-xl p-4 bg-[#fafafa]">
                  <span className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1">Colour</span>
                  <span className="font-inter text-sm text-rudakiya-dark font-medium">{product.colour}</span>
                </div>
              )}
              {product.clarity && (
                <div className="border border-gray-100 rounded-xl p-4 bg-[#fafafa]">
                  <span className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1">Clarity</span>
                  <span className="font-inter text-sm text-rudakiya-dark font-medium">{product.clarity}</span>
                </div>
              )}
              {product.metalType && (
                <div className="border border-gray-100 rounded-xl p-4 bg-[#fafafa]">
                  <span className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1">Metal Type</span>
                  <span className="font-inter text-sm text-rudakiya-dark font-medium">{product.metalType}</span>
                </div>
              )}
            </div>

            {product.certification && (
              <div className="flex items-center space-x-3 text-sm text-gray-600 font-inter mb-10 bg-gray-50 px-4 py-3 rounded-lg border border-gray-100 w-max">
                <ShieldCheck className="w-5 h-5 text-rudakiya-gold" />
                <span>Certified by <strong className="text-rudakiya-dark">{product.certification}</strong></span>
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col space-y-4 mt-auto">
              {(() => {
                const whatsappNumber = "919016611111";
                const message = `Hello Rudakiya Brothers, I am interested in:

*Product:* ${product.name}
*Manual Code:* ${product.productCode || 'N/A'}
*System ID:* ${product.systemId || 'N/A'}
*Price:* ${product.price ? (product.currency === 'USD' ? '$' : '₹') + product.price.toLocaleString('en-IN') : 'Contact for Price'}
*Weight:* ${product.diamondWeight || 'N/A'}
*Shape:* ${product.diamondShape || 'N/A'}
*Color:* ${product.colour || 'N/A'}
*Clarity:* ${product.clarity || 'N/A'}
*Metal:* ${product.metalType || 'N/A'}

I'd like to know more about this piece.`;
                const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

                return (
                  <a 
                    href={whatsappUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full text-center py-5 bg-rudakiya-dark border border-rudakiya-dark text-white font-inter text-xs uppercase tracking-[0.25em] font-bold hover:bg-white hover:text-rudakiya-dark transition-all duration-500 rounded-full shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:-translate-y-1"
                  >
                    Enquire About This Piece
                  </a>
                );
              })()}
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
