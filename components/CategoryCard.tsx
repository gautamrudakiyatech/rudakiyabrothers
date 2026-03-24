import Image from 'next/image';
import Link from 'next/link';
import { Category } from '@/lib/data';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/category/${category.slug}`}>
      <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-2xl">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={category.image_url}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
            <p className="text-sm text-white/90">{category.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
