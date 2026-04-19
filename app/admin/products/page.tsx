'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toggleProductActive, deleteProductByDocId } from '@/lib/adminFirestore';
import { Edit, Trash2, Plus, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { Product } from '@/lib/types';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCat, setFilterCat] = useState('All');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    try {
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() } as Product)));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string, images: string[]) => {
    if (!window.confirm("Are you sure you want to delete this product? All images will be deleted from Storage.")) return;
    
    setDeletingId(id);
    try {
      await deleteProductByDocId(id, images);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      alert("Failed to delete.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggle = async (id: string, currentStatus: boolean) => {
    try {
      await toggleProductActive(id, !currentStatus);
      setProducts(products.map(p => p.id === id ? { ...p, isActive: !currentStatus } : p));
    } catch (err) {
      alert("Failed to update status.");
    }
  };

  const filteredProducts = filterCat === 'All' ? products : products.filter(p => p.category === filterCat);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Products</h2>
        
        <div className="flex items-center gap-4">
          <select 
            value={filterCat} 
            onChange={e => setFilterCat(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
          >
            <option value="All">All Categories</option>
            <option value="rings">Rings</option>
            <option value="earrings">Earrings</option>
            <option value="pendants">Pendants</option>
            <option value="solitaire-pendants">Solitaire Pendants</option>
            <option value="bracelets">Bracelets</option>
          </select>
          <Link 
            href="/admin/products/new" 
            className="bg-black text-white px-4 py-2 rounded-lg flex items-center hover:bg-gray-800 transition"
          >
            <Plus className="w-4 h-4 mr-2" /> Add New Product
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-500 font-medium">
                <th className="p-4">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">Loading products...</td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">No products found.</td>
                </tr>
              ) : (
                filteredProducts.map(product => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      {product.coverImage ? (
                        <div className="relative w-12 h-12 rounded-md overflow-hidden bg-gray-100">
                           <Image src={product.coverImage} alt={product.name} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                          <ImageIcon className="w-5 h-5"/>
                        </div>
                      )}
                    </td>
                    <td className="p-4 font-medium text-gray-800">
                      {product.name}
                      {product.badge && <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">{product.badge}</span>}
                    </td>
                    <td className="p-4 text-gray-500 capitalize">{product.category.replace('-', ' ')}</td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => handleToggle(product.id, product.isActive)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          product.isActive ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {product.isActive ? 'Active' : 'Hidden'}
                      </button>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <Link href={`/admin/products/${product.id}/edit`} className="inline-flex items-center justify-center p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button 
                        disabled={deletingId === product.id}
                        onClick={() => handleDelete(product.id, product.images)}
                        className="inline-flex items-center justify-center p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
