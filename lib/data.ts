export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
}

export interface Product {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  metal_options: string[];
  diamond_shape: string;
  diamond_carat: number;
  diamond_color: string;
  diamond_clarity: string;
  is_featured: boolean;
  stock_quantity: number;
}

export interface Review {
  id: string;
  customer_name: string;
  rating: number;
  comment: string;
  is_featured: boolean;
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Rings',
    slug: 'rings',
    description: 'Exquisite engagement and wedding rings',
    image_url: 'https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '2',
    name: 'Bracelets',
    slug: 'bracelets',
    description: 'Luxurious diamond bracelets',
    image_url: 'https://images.pexels.com/photos/1721943/pexels-photo-1721943.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '3',
    name: 'Pendants',
    slug: 'pendants',
    description: 'Stunning pendant necklaces',
    image_url: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '4',
    name: 'Earrings',
    slug: 'earrings',
    description: 'Elegant diamond earrings',
    image_url: 'https://images.pexels.com/photos/1454177/pexels-photo-1454177.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export const products: Product[] = [
  {
    id: '1',
    category_id: '1',
    name: 'Love for You Diamond Ring',
    slug: 'love-for-you-diamond-ring',
    description: 'A timeless solitaire ring featuring a brilliant diamond set in 18K gold',
    price: 38056,
    images: [
      'https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1454175/pexels-photo-1454175.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    metal_options: ['Yellow Gold', 'White Gold', 'Rose Gold'],
    diamond_shape: 'Round',
    diamond_carat: 1.5,
    diamond_color: 'D',
    diamond_clarity: 'VVS1',
    is_featured: true,
    stock_quantity: 10,
  },
  {
    id: '2',
    category_id: '1',
    name: 'Regal Crown Engagement Ring',
    slug: 'regal-crown-engagement-ring',
    description: 'Stunning diamond surrounded by a sparkling halo in premium gold',
    price: 45200,
    images: [
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3635300/pexels-photo-3635300.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    metal_options: ['Yellow Gold', 'White Gold', 'Rose Gold'],
    diamond_shape: 'Oval',
    diamond_carat: 2.0,
    diamond_color: 'E',
    diamond_clarity: 'VS1',
    is_featured: true,
    stock_quantity: 8,
  },
  {
    id: '3',
    category_id: '1',
    name: 'Majestic Triad Diamond Ring',
    slug: 'majestic-triad-diamond-ring',
    description: 'Elegant three-stone ring symbolizing past, present, and future',
    price: 52000,
    images: [
      'https://images.pexels.com/photos/1232931/pexels-photo-1232931.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    metal_options: ['Yellow Gold', 'White Gold', 'Rose Gold'],
    diamond_shape: 'Princess',
    diamond_carat: 1.8,
    diamond_color: 'F',
    diamond_clarity: 'VS2',
    is_featured: true,
    stock_quantity: 12,
  },
  {
    id: '4',
    category_id: '1',
    name: 'Warm Hug Pear Diamond Ring',
    slug: 'warm-hug-pear-diamond-ring',
    description: 'Vintage-inspired ring with intricate detailing and pear diamond',
    price: 49500,
    images: [
      'https://images.pexels.com/photos/1642228/pexels-photo-1642228.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    metal_options: ['Yellow Gold', 'White Gold', 'Rose Gold'],
    diamond_shape: 'Pear',
    diamond_carat: 1.7,
    diamond_color: 'E',
    diamond_clarity: 'VVS2',
    is_featured: true,
    stock_quantity: 6,
  },
  {
    id: '5',
    category_id: '1',
    name: 'Conjoined Harmony Diamond Ring',
    slug: 'conjoined-harmony-diamond-ring',
    description: 'A harmonious blend of multiple diamonds in a stunning setting',
    price: 61000,
    images: [
      'https://images.pexels.com/photos/3635300/pexels-photo-3635300.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1232931/pexels-photo-1232931.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    metal_options: ['Yellow Gold', 'White Gold', 'Rose Gold'],
    diamond_shape: 'Cushion',
    diamond_carat: 2.5,
    diamond_color: 'D',
    diamond_clarity: 'VVS1',
    is_featured: true,
    stock_quantity: 5,
  },
  {
    id: '6',
    category_id: '1',
    name: 'Royal Heirloom Diamond Ring',
    slug: 'royal-heirloom-diamond-ring',
    description: 'An elegant piece passed down to become your forever heirloom',
    price: 74000,
    images: [
      'https://images.pexels.com/photos/1454175/pexels-photo-1454175.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1642228/pexels-photo-1642228.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    metal_options: ['Yellow Gold', 'White Gold', 'Rose Gold'],
    diamond_shape: 'Emerald',
    diamond_carat: 3.0,
    diamond_color: 'E',
    diamond_clarity: 'VS1',
    is_featured: true,
    stock_quantity: 3,
  }
];

export const reviews: Review[] = [
  {
    id: '1',
    customer_name: 'Riya Shah',
    rating: 5,
    comment: 'Absolutely stunning ring! The quality is exceptional and the diamond sparkles beautifully. Best purchase I have ever made.',
    is_featured: true,
  },
  {
    id: '2',
    customer_name: 'Aakash Mehta',
    rating: 5,
    comment: 'Perfect engagement ring. My fiancée was blown away by the quality and brilliance. Highly recommend!',
    is_featured: true,
  },
  {
    id: '3',
    customer_name: 'Sejal Madhani',
    rating: 5,
    comment: 'The craftsmanship is impeccable. I love my new jewelry and get compliments everywhere I go.',
    is_featured: true,
  },
  {
    id: '4',
    customer_name: 'Lavanya S.',
    rating: 5,
    comment: 'Outstanding service and beautiful jewelry. The lab-grown diamonds are indistinguishable from mined ones.',
    is_featured: true,
  },
  {
    id: '5',
    customer_name: 'Nitin J.',
    rating: 5,
    comment: 'My bracelet is gorgeous! The diamonds are brilliant and the setting is secure. Worth every penny.',
    is_featured: true,
  },
  {
    id: '6',
    customer_name: 'Dhvani Shah',
    rating: 5,
    comment: 'Bought a pendant and absolutely love it. Will definitely shop here again!',
    is_featured: true,
  },
];
