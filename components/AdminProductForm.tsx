'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/lib/types';
import AdminImageUploader from './AdminImageUploader';
import { Loader2 } from 'lucide-react';

import { storage } from '@/lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

interface Props {
  initialData?: Product;
}

// Helper for images
interface ImageItem {
  id: string;
  url: string;
  file?: File;
}

export default function AdminProductForm({ initialData }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'rings',
    description: '',
    diamondWeight: '',
    diamondShape: 'Round',
    colour: '',
    clarity: '',
    metalType: '',
    certification: 'None',
    badge: 'None',
    productCode: '',
    systemId: '',
    price: 0,
    currency: 'INR' as 'INR' | 'USD',
    isActive: true,
  });
  
  const [imageItems, setImageItems] = useState<ImageItem[]>([]);
  
  const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        category: initialData.category || 'rings',
        description: initialData.description || '',
        diamondWeight: initialData.diamondWeight || '',
        diamondShape: initialData.diamondShape || 'Round',
        colour: initialData.colour || '',
        clarity: initialData.clarity || '',
        metalType: initialData.metalType || '',
        certification: initialData.certification || 'None',
        badge: initialData.badge || 'None',
        productCode: initialData.productCode || '',
        systemId: initialData.systemId || '',
        price: initialData.price || 0,
        currency: initialData.currency || 'INR',
        isActive: initialData.isActive !== false,
      });
      setImageItems((initialData.images || []).map(url => ({ 
        id: Math.random().toString(36).substr(2, 9), 
        url 
      })));
    }
  }, [initialData]);

  const handleFilesSelected = (files: File[]) => {
    const newItems: ImageItem[] = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file), // Local preview URL
      file
    }));
    setImageItems(prev => [...prev, ...newItems]);
  };

  const removeImage = (idToRemove: string) => {
    setImageItems(prev => {
      const filtered = prev.filter(item => item.id !== idToRemove);
      const removedItem = prev.find(item => item.id === idToRemove);
      if (removedItem?.file && removedItem.url.startsWith('blob:')) {
        URL.revokeObjectURL(removedItem.url);
      }
      return filtered;
    });
  };

  const uploadImages = async (slugBase: string): Promise<string[]> => {
    const uploadPromises = imageItems.map(async (item) => {
      if (!item.file) return item.url;

      const fileExtension = item.file.name.split('.').pop();
      const uploadId = Math.random().toString(36).substring(7);
      const finalPath = `products/${slugBase}/image-${uploadId}.${fileExtension}`;
      const storageRef = ref(storage, finalPath);
      
      const uploadTask = await uploadBytesResumable(storageRef, item.file);
      return await getDownloadURL(uploadTask.ref);
    });

    return Promise.all(uploadPromises);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slug) {
      alert("Please enter a valid product name to generate a slug.");
      return;
    }

    setSaving(true);
    try {
      // 1. Upload images
      const finalImageUrls = await uploadImages(slug);

      const productDoc: any = {
        name: formData.name,
        slug: slug,
        category: formData.category,
        description: formData.description,
        diamondWeight: formData.diamondWeight,
        diamondShape: formData.diamondShape,
        colour: formData.colour,
        clarity: formData.clarity,
        metalType: formData.metalType,
        certification: formData.certification !== 'None' ? formData.certification : '',
        badge: formData.badge !== 'None' ? formData.badge : '',
        productCode: formData.productCode,
        systemId: formData.systemId || `RB-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        price: formData.price,
        currency: formData.currency,
        images: finalImageUrls,
        coverImage: finalImageUrls.length > 0 ? finalImageUrls[0] : '',
        isActive: formData.isActive,
        updatedAt: serverTimestamp(),
      };

      if (!initialData) {
        productDoc.createdAt = serverTimestamp();
      }

      const docId = initialData?.id || slug;
      const docRef = doc(db, 'products', docId);
      
      await setDoc(docRef, productDoc, { merge: true });
      
      router.push('/admin/products');
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to save product.");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-full md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
            <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none" />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Code</label>
            <input type="text" placeholder="e.g. SKU-101" value={formData.productCode} onChange={e => setFormData({...formData, productCode: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none" />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-400 mb-1">System ID (Auto)</label>
            <input disabled type="text" value={formData.systemId || '(Auto-generated)'} className="w-full px-4 py-2 border border-gray-200 bg-gray-50 rounded-lg text-gray-400 cursor-not-allowed outline-none text-xs" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none">
              <option value="rings">Rings</option>
              <option value="earrings">Earrings</option>
              <option value="pendants">Pendants</option>
              <option value="solitaire-pendants">Solitaire Pendants</option>
              <option value="bracelets">Bracelets</option>
            </select>
          </div>
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea required rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <div className="flex gap-2">
              <input type="number" placeholder="250000" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value) || 0})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none" />
              <select value={formData.currency} onChange={e => setFormData({...formData, currency: e.target.value as 'INR' | 'USD'})} className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none">
                <option value="INR">₹ (INR)</option>
                <option value="USD">$ (USD)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
         <h3 className="text-lg font-bold text-gray-800 mb-6">Diamond & Metal Details</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Diamond Weight</label>
             <input type="text" placeholder="e.g. 1.5 ct" value={formData.diamondWeight} onChange={e => setFormData({...formData, diamondWeight: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none" />
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Diamond Shape</label>
             <select value={formData.diamondShape} onChange={e => setFormData({...formData, diamondShape: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none">
                <option value="Round">Round</option>
                <option value="Oval">Oval</option>
                <option value="Pear">Pear</option>
                <option value="Cushion">Cushion</option>
                <option value="Princess">Princess</option>
                <option value="Emerald">Emerald</option>
                <option value="Marquise">Marquise</option>
                <option value="Radiant">Radiant</option>
                <option value="Heart">Heart</option>
                <option value="Asscher">Asscher</option>
             </select>
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Colour</label>
             <input type="text" placeholder="e.g. D, E, F" value={formData.colour} onChange={e => setFormData({...formData, colour: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none" />
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Clarity</label>
             <input type="text" placeholder="e.g. VVS1, VS1" value={formData.clarity} onChange={e => setFormData({...formData, clarity: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none" />
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Metal Type</label>
             <input type="text" placeholder="e.g. 18K Yellow Gold" value={formData.metalType} onChange={e => setFormData({...formData, metalType: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none" />
           </div>
         </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
         <h3 className="text-lg font-bold text-gray-800 mb-6">Badges & Visibility</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Certification</label>
             <select value={formData.certification} onChange={e => setFormData({...formData, certification: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none">
                <option value="None">None</option>
                <option value="IGI">IGI</option>
                <option value="GIA">GIA</option>
                <option value="IGI + GIA">IGI + GIA</option>
                <option value="SGL">SGL</option>
             </select>
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Product Badge</label>
             <select value={formData.badge} onChange={e => setFormData({...formData, badge: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none">
                <option value="None">None</option>
                <option value="New">New</option>
                <option value="Bestseller">Bestseller</option>
                <option value="Featured">Featured</option>
             </select>
           </div>
           <div className="col-span-full pt-4">
             <label className="flex items-center space-x-3 cursor-pointer">
               <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black" />
               <span className="text-gray-800 font-medium">Product is Active (visible on website)</span>
             </label>
           </div>
         </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Product Images</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <AdminImageUploader 
              pathTemplate={`products/${slug}/image`} 
              onFilesSelected={handleFilesSelected}
              multiple={true}
            />
            <p className="text-xs text-gray-500 mt-2 italic">Images will be uploaded only when you click "Save Product".</p>
          </div>
          <div className="space-y-3">
            {imageItems.map((item, idx) => (
              <div key={item.id} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200 group">
                <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0 bg-white">
                  <Image src={item.url} alt={`Preview ${idx}`} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700 truncate">
                      {item.file ? item.file.name : `Existing Image ${idx + 1}`}
                    </span>
                    {idx === 0 && <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded uppercase font-bold">Cover</span>}
                  </div>
                  {item.file && <span className="text-[10px] text-amber-600 font-medium uppercase tracking-tighter">Pending Upload</span>}
                </div>
                <button type="button" onClick={() => removeImage(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                  <X size={18} />
                </button>
              </div>
            ))}
            {imageItems.length === 0 && (
              <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-8">
                <p className="text-sm text-gray-400 italic text-center">No images selected.<br/>Drag images from left panel or click to select.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pb-12">
        <button type="button" onClick={() => router.back()} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
          Cancel
        </button>
        <button type="submit" disabled={saving} className="px-8 py-2 bg-black text-white rounded-lg hover:bg-gray-800 font-medium disabled:opacity-50 flex items-center">
          {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {saving ? 'Saving...' : 'Save Product'}
        </button>
      </div>
    </form>
  );
}
