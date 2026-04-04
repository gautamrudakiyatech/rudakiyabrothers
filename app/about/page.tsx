import Image from 'next/image';
import Link from 'next/link';
import { Award, Gem, Users, Scale } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="bg-[#fafafa] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="https://images.pexels.com/photos/8371380/pexels-photo-8371380.jpeg?auto=compress&cs=tinysrgb&w=1600" 
            alt="Rudakiya Brothers Craftsmanship" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-playfair text-5xl md:text-7xl mb-6 tracking-wide drop-shadow-lg">Our Story</h1>
          <p className="font-inter text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide text-gray-100">
            A harmonious blend of luxury and science.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white -mt-20 relative z-20 rounded-t-3xl shadow-xl">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl text-rudakiya-dark mb-6 tracking-wide">The Legacy of<br/><span className="text-rudakiya-gold">Rudakiya Brothers</span></h2>
          <div className="w-20 h-[1px] bg-rudakiya-gold mx-auto"></div>
        </div>

        <div className="font-inter text-gray-600 leading-relaxed space-y-8 text-lg">
          <p>
            Rudakiya Brothers is where the pinnacle of modern science meets timeless elegance. Founded with a vision to revolutionize the diamond industry, we have spent over a decade perfecting the art of fine jewelry. We believe that true luxury shouldn't come at the cost of the earth.
          </p>
          <p>
            Our expertise lies in sourcing, cutting, and crafting the finest 100% Lab-Grown Diamonds. By bypassing traditional mining, we eliminate the immense environmental impact while achieving a remarkable level of purity, brilliance, and fire that matches—and often exceeds—mined diamonds.
          </p>
          <p>
            Every piece crafted by Rudakiya Brothers tells a unique tale of everlasting elegance. Whether you are looking for the perfect engagement ring or a bespoke piece of high jewelry, our master artisans work intimately with you to birth creations that resonate with your personal love language and lifestyle.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl text-rudakiya-dark mb-4 tracking-wide">Our Core Values</h2>
            <p className="font-inter text-gray-500">The pillars that define every Rudakiya Brothers creation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm text-center border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-rudakiya-goldLight rounded-full flex items-center justify-center mx-auto mb-6">
                <Gem className="w-8 h-8 text-rudakiya-gold" />
              </div>
              <h3 className="font-inter font-semibold text-rudakiya-dark mb-3 text-lg">Uncompromising Quality</h3>
              <p className="text-gray-600 text-sm leading-relaxed">We select only the top 1% of lab-grown diamonds, ensuring D-F color and VVS-VS clarity in every piece.</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm text-center border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-rudakiya-goldLight rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-rudakiya-gold" />
              </div>
              <h3 className="font-inter font-semibold text-rudakiya-dark mb-3 text-lg">Master Craftsmanship</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Our artisans possess decades of generational knowledge, handcrafting each setting with millimeter precision.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm text-center border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-rudakiya-goldLight rounded-full flex items-center justify-center mx-auto mb-6">
                <Scale className="w-8 h-8 text-rudakiya-gold" />
              </div>
              <h3 className="font-inter font-semibold text-rudakiya-dark mb-3 text-lg">Absolute Transparency</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Every diamond comes fully certified by reputed labs like IGI & SGL. No hidden markups, only pure value.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm text-center border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-rudakiya-goldLight rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-rudakiya-gold" />
              </div>
              <h3 className="font-inter font-semibold text-rudakiya-dark mb-3 text-lg">Customer Devotion</h3>
              <p className="text-gray-600 text-sm leading-relaxed">From the first consultation to lifetime maintenance, we ensure you feel valued at every step of your journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-rudakiya-dark py-20 text-center px-4">
        <h2 className="font-playfair text-3xl md:text-4xl text-white mb-6">Ready to create a masterpiece?</h2>
        <p className="font-inter text-gray-400 mb-8 max-w-xl mx-auto">Book a free consultation with our diamond experts and bring your dream jewelry to life.</p>
        <Link href="/contact" className="px-8 py-3 bg-white text-rudakiya-dark font-inter rounded-full hover:bg-rudakiya-gold hover:text-white transition-all duration-300 inline-block font-medium">
          Schedule Consultation
        </Link>
      </section>
    </main>
  );
}
