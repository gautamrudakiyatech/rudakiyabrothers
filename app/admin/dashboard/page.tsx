'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Package, Plus, CheckCircle, Image as ImageIcon } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, active: 0, categories: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const prodSnap = await getDocs(collection(db, 'products'));
        const catSnap = await getDocs(collection(db, 'categories'));
        
        let active = 0;
        prodSnap.forEach(d => {
          if (d.data().isActive) active++;
        });

        setStats({
          total: prodSnap.size,
          active,
          categories: catSnap.size
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <Link 
          href="/admin/products/new" 
          className="bg-black text-white px-4 py-2 rounded-lg flex items-center hover:bg-gray-800 transition"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </Link>
      </div>

      {loading ? (
        <div className="animate-pulse flex space-x-4">
          <div className="h-32 bg-gray-200 rounded-xl w-1/3"></div>
          <div className="h-32 bg-gray-200 rounded-xl w-1/3"></div>
          <div className="h-32 bg-gray-200 rounded-xl w-1/3"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-lg mr-4">
              <Package className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Products</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.total}</h3>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
            <div className="p-4 bg-green-50 text-green-600 rounded-lg mr-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Products</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.active}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
            <div className="p-4 bg-purple-50 text-purple-600 rounded-lg mr-4">
              <ImageIcon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Categories</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.categories}</h3>
            </div>
          </div>
        </div>
      )}

      <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Links</h3>
      <div className="flex gap-4">
        <Link href="/admin/hero" className="px-6 py-3 bg-white border border-gray-200 rounded-lg hover:border-gray-400 font-medium text-gray-700 shadow-sm">Update Hero Banner</Link>
        <Link href="/admin/categories" className="px-6 py-3 bg-white border border-gray-200 rounded-lg hover:border-gray-400 font-medium text-gray-700 shadow-sm">Manage Categories</Link>
      </div>

    </div>
  );
}
