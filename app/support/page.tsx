import Link from 'next/link';

export default function CustomerSupportPage() {
  return (
    <main className="bg-[#fafafa] min-h-[70vh] py-24 flex flex-col justify-center animate-fade-in-up">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h1 className="font-playfair text-4xl md:text-5xl text-rudakiya-dark mb-8 text-center tracking-wide">
          Customer Support
        </h1>
        <div className="w-16 h-[1px] bg-rudakiya-gold mx-auto mb-12"></div>
        
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-50 font-inter text-gray-600 leading-relaxed text-base md:text-lg">
          <p className="mb-6">
            Welcome to the <strong className="text-rudakiya-dark font-semibold">Customer Support</strong> page. This section is currently being updated to provide you with the most accurate and elegant experience.
          </p>
          <p className="mb-8">
            At Rudakiya Brothers, we strive to ensure that every aspect of your journey with us is as flawless as our diamonds. Please check back soon for the complete details.
          </p>
          
          {['contact', 'schedule', 'message', 'support'].includes('support') && (
             <div className="mt-8 mb-4 p-6 bg-[#fafafa] rounded-2xl border border-gray-100 text-center">
               <p className="text-gray-800 font-medium mb-2">Reach out to us directly:</p>
               <a href="tel:+919324883465" className="text-rudakiya-gold hover:text-rudakiya-gold font-semibold text-xl">+91 93248 83465</a>
               <p className="text-sm mt-2">Available Mon-Sat, 10 AM to 7 PM</p>
             </div>
          )}

          <div className="text-center mt-12">
            <Link href="/" className="px-8 py-3 bg-rudakiya-dark text-white font-inter rounded-full hover:bg-rudakiya-gold hover:-translate-y-1 hover:shadow-xl transition-all duration-300 tracking-wide inline-block">
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
