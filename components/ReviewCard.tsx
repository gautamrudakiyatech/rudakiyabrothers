import { Review } from '@/lib/data';
import { Star } from 'lucide-react';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < review.rating
                ? 'fill-amber-500 text-amber-500'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      <p className="text-gray-700 mb-4 italic leading-relaxed">
        &ldquo;{review.comment}&rdquo;
      </p>
      <p className="font-semibold text-gray-900">{review.customer_name}</p>
    </div>
  );
}
