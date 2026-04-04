'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    category: 'Product Knowledge',
    questions: [
      { q: "Are Lab-Grown Diamonds real diamonds?", a: "Yes, 100%. Lab-grown diamonds are chemically, physically, and optically identical to mined diamonds. The only difference is their origin. They even receive the same certifications (IGI, SGL) as natural diamonds." },
      { q: "Do Lab-Grown Diamonds test as real?", a: "Yes. Because they are pure carbon crystallized in the exact same isometric system, they will pass every standard diamond tester used by jewelers." },
      { q: "Will a Lab-Grown Diamond change color or lose brilliance over time?", a: "No. Just like natural diamonds, lab-grown diamonds are forever. They will not fade, cloud, or change color over time." },
      { q: "What kind of gold do you use?", a: "We strictly use 18kt and 14kt Hallmarked Solid Gold in yellow, rose, and white gold tones, ensuring maximum durability and luxury." },
      { q: "How do I determine my ring size?", a: "We provide a comprehensive digital ring sizing guide. If you are still unsure, you can drop us a message and we will assist you or send you a complimentary physical ring sizer." },
      { q: "Can I customize a piece of jewelry?", a: "Absolutely. Rudakiya Brothers specializes in bespoke creations. You can share your ideas or sketches with us, and our artisans will bring them to life." }
    ]
  },
  {
    category: 'Orders & Policies',
    questions: [
      { q: "Do you offer free shipping?", a: "Yes, we offer fully insured, free shipping pan-India." },
      { q: "How long will it take to receive my order?", a: "Since our pieces are crafted specifically for you, standard delivery takes up to 20 working days. Bespoke orders may take slightly longer, which will be communicated during consultation." },
      { q: "What is your return policy?", a: "We offer a 7-day easy return policy for all standard (non-bespoke) items. Items must be returned unworn and in their original packaging with all certificates." },
      { q: "Do you have a buyback or exchange policy?", a: "Yes! We offer a Lifetime Exchange at 100% of the current gold value and 100% of the diamond value, and a Lifetime Buyback at 90% of gold value and 70% of diamond value." },
      { q: "Is the jewelry insured during shipping?", a: "Yes, every package dispatched from Rudakiya Brothers is 100% insured until it is safely delivered and signed for by you." },
      { q: "How can I track my order?", a: "Once your order is shipped, you will receive a tracking link via email and SMS to monitor your package's secure journey." },
      { q: "What payment methods do you accept?", a: "We accept all major credit cards, debit cards, premium wallets, and secure bank transfers." }
    ]
  }
];

export default function FaqsPage() {
  const [openIndex, setOpenIndex] = useState<{catIndex: number, qIndex: number} | null>(null);

  const toggleFaq = (catIndex: number, qIndex: number) => {
    if (openIndex?.catIndex === catIndex && openIndex?.qIndex === qIndex) {
      setOpenIndex(null);
    } else {
      setOpenIndex({ catIndex, qIndex });
    }
  };

  return (
    <main className="bg-[#fafafa] min-h-screen py-24 animate-fade-in-up">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-playfair text-4xl md:text-5xl text-rudakiya-dark mb-8 text-center tracking-wide">
          Frequently Asked Questions
        </h1>
        <div className="w-16 h-[1px] bg-rudakiya-gold mx-auto mb-16"></div>

        {faqs.map((section, catIndex) => (
          <div key={catIndex} className="mb-16">
            <h2 className="font-playfair text-2xl md:text-3xl text-gray-800 mb-8 pb-4 border-b border-gray-200">
              {section.category}
            </h2>
            <div className="space-y-4">
              {section.questions.map((faq, qIndex) => {
                const isOpen = openIndex?.catIndex === catIndex && openIndex?.qIndex === qIndex;
                return (
                  <div 
                    key={qIndex} 
                    className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 border ${isOpen ? 'border-rudakiya-gold shadow-md' : 'border-gray-100 shadow-sm'}`}
                  >
                    <button 
                      onClick={() => toggleFaq(catIndex, qIndex)}
                      className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none"
                    >
                      <span className={`font-inter font-medium pr-8 transition-colors ${isOpen ? 'text-rudakiya-gold' : 'text-gray-800'}`}>
                        {faq.q}
                      </span>
                      <ChevronDown 
                        className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'transform rotate-180 text-rudakiya-gold' : 'text-gray-400'}`} 
                      />
                    </button>
                    <div 
                      className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}
                    >
                      <p className="font-inter text-gray-600 leading-relaxed text-sm">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="mt-16 bg-white p-8 rounded-3xl shadow-sm text-center border border-gray-100">
          <h3 className="font-playfair text-2xl text-rudakiya-dark mb-4">Still have questions?</h3>
          <p className="font-inter text-gray-600 mb-6">Our experts are available to clarify any doubts regarding our diamonds, policies, or bespoke services.</p>
          <a href="/contact" className="inline-block px-8 py-3 bg-rudakiya-dark text-white font-inter rounded-full hover:bg-rudakiya-gold hover:-translate-y-1 transition-all duration-300">
            Contact Support
          </a>
        </div>
      </div>
    </main>
  );
}
