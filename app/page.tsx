import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Award, Truck, RotateCcw, PhoneCall, Diamond, Gem, ShieldCheck } from 'lucide-react';
import Preloader from '@/components/Preloader';
import { getProducts, getSiteSettings } from '@/lib/firestore';
import ProductCard from '@/components/ProductCard';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import ReviewsSection from '@/components/ReviewsSection';
import { HeroAdminOverlay, FeaturedAdminOverlay, BannerAdminOverlay, PromiseAdminOverlay } from '@/components/HomeAdminOverlays';

export const dynamic = 'force-dynamic';

// Original hardcoded category data (exactly as before admin panel migration)
const SHOP_CATEGORIES = [
  {
    name: 'RINGS',
    img: '/category-rings.png',
    href: '/category/rings',
  },
  {
    name: 'BRACELETS',
    img: '/category-bracelets.png',
    href: '/category/bracelets',
  },
  {
    name: 'PENDANTS',
    img: '/category-pendants.png',
    href: '/category/pendants',
  },
  {
    name: 'EARRINGS',
    img: '/category-earrings.png',
    href: '/category/earrings',
  },
];

const promises = [
  { icon: ShieldCheck, title: 'Certified Jewelry', desc: 'Get 100% authentication certificate' },
  { icon: Award, title: 'Hallmarked Gold', desc: 'Offering only the finest, certified hallmarked gold' },
  { icon: RotateCcw, title: 'Easy Exchange & Buyback', desc: 'Lifetime exchange & buyback available' },
  { icon: Truck, title: 'Easy Shipping & Insurance', desc: 'Fast, reliable shipping to your doorstep' },
  { icon: PhoneCall, title: 'Free Diamond Consultation', desc: 'Call us on +91 93248 83465' },
  { icon: Diamond, title: 'Bespoke Options Available', desc: 'Discover our bespoke jewelry options, crafted uniquely for you.' },
  { icon: RotateCcw, title: 'Easy Returns', desc: 'Avail easy return policy until 7 days' },
];

export default async function Home() {
  const [featuredProducts, siteSettings] = await Promise.all([
    getProducts({ isFeatured: true, limit: 8 }),
    getSiteSettings()
  ]);

  return (
    <Preloader>
      <main className="bg-white">

        {/* 1. HERO SECTION */}
        <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
          <HeroAdminOverlay />

          {siteSettings?.videoUrl ? (
            <div className="absolute inset-0">
              <video
                autoPlay loop muted playsInline preload="none"
                poster={siteSettings.posterUrl || undefined}
                className="object-cover w-full h-full transform-gpu"
              >
                <source src={siteSettings.videoUrl} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/40" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-rudakiya-dark to-black" />
          )}

          {/* Hero Text always visible */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
            <h1 className="font-playfair text-4xl sm:text-6xl lg:text-7xl text-white mb-6 drop-shadow-lg">
              {siteSettings?.headline || "Exquisite Lab-Grown Diamond Jewelry"}
            </h1>
            <p className="font-inter text-lg text-white/90 drop-shadow-md mb-12">
              {siteSettings?.subheadline || "Discover our collection of finely crafted pieces"}
            </p>
          </div>

          <div className="absolute inset-x-0 bottom-12 flex flex-col items-center justify-center z-10">
            <Link href="#categories" className="group flex flex-col items-center cursor-pointer">
              <div className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-inter text-xs font-medium tracking-[0.2em] uppercase hover:bg-white hover:text-rudakiya-dark hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-500 rounded-full mb-6 flex items-center shadow-lg">
                Explore Collection
              </div>
              <ChevronDown className="w-8 h-8 text-white animate-bounce" strokeWidth={1} />
            </Link>
          </div>
        </section>

        {/* 2. SHOP BY CATEGORY */}
        <section id="categories" className="relative py-32 w-full flex flex-col items-center justify-center overflow-hidden group">
          {/* Immersive Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/shop-category-bg.png"
              alt="Shop By Category Background"
              fill
              priority
              className="object-cover object-center transform transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Deep rich overlay for text readability */}
            <div className="absolute inset-0 bg-rudakiya-dark/70 z-10 backdrop-blur-[1px]"></div>
            {/* Subtle gold vignette glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 flex flex-col items-center w-full">
            <span className="font-inter font-bold tracking-[0.3em] text-rudakiya-gold text-xs uppercase mb-4 block animate-fade-in-up">
              Discover Our Creations
            </span>
            <h2 className="font-playfair text-4xl sm:text-5xl lg:text-7xl text-white mb-6 animate-fade-in-up drop-shadow-sm">
              Shop by Category
            </h2>
            <div className="w-16 h-[2px] bg-rudakiya-gold mx-auto mb-16 animate-fade-in-up"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
              {SHOP_CATEGORIES.map((cat, idx) => (
                <Link key={idx} href={cat.href} className="group relative flex flex-col justify-end p-6 md:p-8 h-[300px] md:h-[340px] rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.25)] hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                  {/* Full Background Image */}
                  <div className="absolute inset-0 z-0 bg-gray-900">
                    <Image
                      src={cat.img}
                      alt={cat.name}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-[1.05] transform-gpu opacity-90 group-hover:opacity-75"
                    />
                  </div>

                  {/* Strong dark gradient covering bottom 60% — ensures text always visible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/10 z-10"></div>

                  {/* Subtle ambient glow at bottom on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-rudakiya-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30 rounded-b-3xl"></div>

                  {/* Text Content */}
                  <div className="relative z-20 flex flex-col items-center mt-auto text-center">
                    <div className="h-[1px] w-6 bg-rudakiya-gold mb-4 opacity-60 group-hover:w-12 group-hover:opacity-100 transition-all duration-500"></div>
                    <h3 className="font-playfair tracking-[0.2em] text-white text-2xl lg:text-3xl uppercase font-bold group-hover:text-rudakiya-gold transition-colors duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                      {cat.name}
                    </h3>
                    <span className="font-inter text-[10px] tracking-[0.3em] text-white/70 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-500 uppercase">
                      Explore Collection →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 2.5. FEATURED PRODUCTS */}
        <section className="py-40 relative overflow-hidden bg-white">
          {/* High-End Studio Background Effect */}
          <div className="absolute inset-0 z-0">
            {/* Soft ambient lighting effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-full bg-[radial-gradient(50%_50%_at_50%_0%,rgba(212,175,55,0.03)_0%,rgba(255,255,255,0)_100%)]"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/fine-linen.png')] opacity-[0.03]"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <FeaturedAdminOverlay />

            <div className="text-center mb-24">
              <h2 className="font-playfair text-4xl sm:text-7xl text-rudakiya-dark mb-6 tracking-tight">
                Featured Pieces
              </h2>
              <div className="flex items-center justify-center gap-4">
                <div className="h-[0.5px] w-12 bg-rudakiya-gold/40"></div>
                <span className="font-inter font-bold tracking-[0.5em] text-rudakiya-gold text-[9px] uppercase">
                  Signature Collection
                </span>
                <div className="h-[0.5px] w-12 bg-rudakiya-gold/40"></div>
              </div>
            </div>

            {featuredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-3xl">
                <div className="text-5xl mb-4">💎</div>
                <h3 className="font-playfair text-2xl text-rudakiya-dark mb-2">Building Our Featured Collection</h3>
                <p className="font-inter text-gray-400 text-sm mb-6">Log in as admin and use the "Add Product" button above to add your first piece.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 opacity-30 pointer-events-none">
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 3. GIFTING COLLECTION BANNER */}
        <section className="relative h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden my-24">
          <BannerAdminOverlay label="Gifting Banner" />

          {/* Always shows beautiful gradient — no broken image */}
          <div className="absolute inset-0 bg-gradient-to-br from-rudakiya-dark via-gray-900 to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-rudakiya-gold/10 to-transparent" />

          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
            <span className="font-inter text-rudakiya-gold text-xs md:text-sm tracking-[0.3em] uppercase mb-4 block">
              Curated for Special Moments
            </span>
            <h2 className="font-playfair text-4xl md:text-6xl lg:text-7xl text-white mb-6">
              The Gifting Collection
            </h2>
            <div className="w-16 h-[1px] bg-rudakiya-gold mx-auto mb-8"></div>
            <p className="font-inter text-white/80 leading-relaxed mb-10 text-base md:text-lg max-w-2xl">
              Welcome to Jewels of Joy, where our jewelry turns every occasion into a celebration. Each piece is crafted to perfection.
            </p>
            <Link
              href="/category/earrings"
              className="px-10 py-4 bg-rudakiya-gold text-white font-inter text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-rudakiya-dark transition-all duration-500 rounded-full shadow-lg hover:shadow-2xl"
            >
              Discover Gifts
            </Link>
          </div>
        </section>

        {/* 4. CUSTOMER REVIEWS */}
        <ReviewsSection />

        {/* 5. BRAND QUOTE */}
        <section className="bg-white py-24 text-center px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-playfair italic text-3xl md:text-5xl text-gray-800 leading-snug">
              "Trust us to speak your love language while you create wonderful memories"
            </h2>
          </div>
        </section>

        {/* 6. THE RUDAKIYA PROMISE */}
        <section className="relative py-32 w-full border-t border-b border-rudakiya-gold/20 bg-gray-50">
          <PromiseAdminOverlay />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center w-full">
            <span className="font-inter font-bold tracking-[0.3em] text-rudakiya-gold text-xs uppercase mb-4 block">
              Our Guarantee
            </span>
            <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl text-rudakiya-dark mb-6">
              The Rudakiya Promise
            </h2>
            <div className="w-16 h-[2px] bg-rudakiya-dark/50 mx-auto mb-16"></div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6 w-full">
              {promises.map((promise, index) => {
                const Icon = promise.icon;
                return (
                  <div key={index} className="flex flex-col items-center p-6 bg-white rounded-3xl shadow-sm hover:-translate-y-2 transition-all duration-500 border border-gray-100">
                    <div className="w-14 h-14 mb-5 text-rudakiya-gold flex items-center justify-center bg-gray-50 rounded-full border border-gray-100">
                      <Icon strokeWidth={1.5} className="w-8 h-8" />
                    </div>
                    <h3 className="font-inter font-semibold text-rudakiya-dark text-sm mb-2 tracking-wide text-center">{promise.title}</h3>
                    <p className="font-inter text-gray-500 text-xs leading-relaxed text-center">{promise.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>
    </Preloader>
  );
}
