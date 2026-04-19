'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import AdminProductForm from '@/components/AdminProductForm';
import { Product } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function EditProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        const docRef = doc(db, 'products', params.id);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          setProduct({ id: snapshot.id, ...snapshot.data() } as Product);
        }
      } catch (err) {
        console.error("Error loading product", err);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [params.id]);

  if (loading) return <div className="flex items-center space-x-2 text-gray-500"><Loader2 className="w-5 h-5 animate-spin" /> <span>Loading product...</span></div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Edit Product</h2>
      <AdminProductForm initialData={product} />
    </div>
  );
}
