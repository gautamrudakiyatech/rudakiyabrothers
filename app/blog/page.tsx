import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

const posts = [
  {
    id: 1,
    title: "The Ultimate Guide to Buying Lab-Grown Diamonds",
    excerpt: "Everything you need to know about the science, sustainability, and grading of lab-grown diamonds before making your lifetime investment.",
    image: "https://images.pexels.com/photos/1454175/pexels-photo-1454175.jpeg?auto=compress&cs=tinysrgb&w=800",
    date: "Oct 12, 2026",
    readTime: "5 min read",
    category: "Education"
  },
  {
    id: 2,
    title: "Trending Engagement Ring Styles for 2026",
    excerpt: "From hidden halos to vintage-inspired milgrain settings, discover the designs that are capturing hearts across the world this year.",
    image: "https://images.pexels.com/photos/1721943/pexels-photo-1721943.jpeg?auto=compress&cs=tinysrgb&w=800",
    date: "Sep 28, 2026",
    readTime: "4 min read",
    category: "Trends"
  },
  {
    id: 3,
    title: "How to Care for Your Fine Jewelry at Home",
    excerpt: "Expert tips directly from Rudakiya Brothers' master artisans on how to keep your gold and diamonds sparkling forever.",
    image: "https://images.pexels.com/photos/3635300/pexels-photo-3635300.jpeg?auto=compress&cs=tinysrgb&w=800",
    date: "Sep 15, 2026",
    readTime: "3 min read",
    category: "Maintenance"
  }
];

export default function BlogPage() {
  return (
    <main className="bg-[#fafafa] min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="font-playfair text-5xl text-rudakiya-dark mb-6">The Journal</h1>
          <p className="font-inter text-gray-500 max-w-2xl mx-auto text-lg">
            Insights on fine jewelry, diamond education, and everything in between from the experts at Rudakiya Brothers.
          </p>
          <div className="w-16 h-[1px] bg-rudakiya-gold mx-auto mt-8"></div>
        </div>

        {/* Featured Post (First one styled differently if needed, here we just use grid) */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-50 hover:shadow-xl transition-all duration-500 group flex flex-col">
              <Link href={`/blog/${post.id}`} className="block relative h-64 overflow-hidden">
                <Image 
                  src={post.image} 
                  alt={post.title}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-inter font-semibold tracking-wide text-gray-800 uppercase">
                  {post.category}
                </div>
              </Link>
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center text-xs text-gray-400 font-inter mb-4 space-x-4">
                  <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {post.date}</span>
                  <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {post.readTime}</span>
                </div>
                
                <h2 className="font-playfair text-2xl text-rudakiya-dark mb-3 group-hover:text-rudakiya-gold transition-colors line-clamp-2">
                  <Link href={`/blog/${post.id}`}>{post.title}</Link>
                </h2>
                
                <p className="font-inter text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <Link href={`/blog/${post.id}`} className="inline-flex items-center text-sm font-inter font-medium text-rudakiya-dark group-hover:text-rudakiya-gold transition-colors uppercase tracking-wider">
                    Read Article <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Newsletter */}
        <div className="mt-24 bg-rudakiya-dark rounded-3xl p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_0%,_transparent_100%)]"></div>
          <h3 className="font-playfair text-3xl text-white mb-4 relative z-10">Subscribe to The Journal</h3>
          <p className="font-inter text-gray-300 mb-8 max-w-md mx-auto relative z-10">Join our newsletter to receive the latest updates, exclusive collections, and expert diamond tips directly in your inbox.</p>
          <form className="max-w-md mx-auto flex gap-2 relative z-10">
            <input type="email" placeholder="Your email address" className="flex-1 px-6 py-3 rounded-full text-rudakiya-dark font-inter focus:outline-none focus:ring-2 focus:ring-rudakiya-goldHover" required />
            <button type="submit" className="bg-rudakiya-gold text-white px-8 py-3 rounded-full font-inter font-medium hover:bg-rudakiya-gold transition-colors">Subscribe</button>
          </form>
        </div>

      </div>
    </main>
  );
}
