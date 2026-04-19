'use client';

import AdminProductForm from '@/components/AdminProductForm';

export default function NewProductPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Add New Product</h2>
      <AdminProductForm />
    </div>
  );
}
