'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { Category } from '@/lib/types';
import Image from 'next/image';
import { UploadCloud, CheckCircle } from 'lucide-react';

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const snap = await getDocs(collection(db, 'categories'));
      const cats = snap.docs.map(d => ({ id: d.id, ...d.data() } as Category));
      // order by 'order'
      cats.sort((a, b) => a.order - b.order);
      setCategories(cats);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleImageUpload = (catId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingId(catId);
    
    const fileExt = file.name.split('.').pop() || 'webp';
    const storageRef = ref(storage, `categories/${catId}-cover-${Date.now()}.${fileExt}`);
    
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      null, 
      (error) => {
        console.error(error);
        alert("Upload failed.");
        setUploadingId(null);
      }, 
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        
        const docRef = doc(db, 'categories', catId);
        await setDoc(docRef, { coverImage: downloadURL }, { merge: true });
        
        setCategories(categories.map(c => c.id === catId ? { ...c, coverImage: downloadURL } : c));
        setUploadingId(null);
      }
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Manage Categories</h2>

      <div className="bg-blue-50 text-blue-800 text-sm p-4 rounded-lg border border-blue-100 mb-8">
        <p className="font-semibold mb-1">Image Guidelines:</p>
        <ul className="list-disc list-inside">
          <li>Category covers: max 600×600px, under 100KB</li>
          <li>Convert to WebP using squoosh.app before uploading</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          [...Array(4)].map((_, i) => (
             <div key={i} className="animate-pulse bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center">
               <div className="w-full aspect-square bg-gray-200 rounded-lg mb-4"></div>
               <div className="h-4 bg-gray-200 rounded w-1/2"></div>
             </div>
          ))
        ) : categories.map(cat => (
          <div key={cat.id} className="bg-white border text-center border-gray-200 rounded-xl overflow-hidden shadow-sm relative group">
            <div className="relative w-full aspect-square bg-gray-50 flex items-center justify-center">
               {cat.coverImage ? (
                  <Image src={cat.coverImage} alt={cat.name} fill unoptimized className="object-cover" />
               ) : (
                  <span className="text-gray-400 text-sm">No Image</span>
               )}
               
               {uploadingId === cat.id && (
                 <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                    <span className="text-sm font-medium animate-pulse">Uploading...</span>
                 </div>
               )}

               <div className={`absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 ${uploadingId === cat.id ? 'hidden' : ''}`}>
                 <label className="cursor-pointer bg-white text-black px-4 py-2 rounded-lg text-sm font-medium flex items-center hover:bg-gray-100">
                    <UploadCloud className="w-4 h-4 mr-2" /> Replace
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(cat.id, e)} />
                 </label>
               </div>
            </div>
            <div className="p-4 bg-white border-t border-gray-200 flex flex-col justify-center">
              <h3 className="font-bold text-gray-800">{cat.name}</h3>
              {cat.coverImage && <p className="text-xs text-green-600 flex items-center justify-center mt-1"><CheckCircle className="w-3 h-3 mr-1" /> Image Added</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
