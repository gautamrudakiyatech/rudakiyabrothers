"use client";

import React, { useState, useEffect } from 'react';
import { Product } from '@/lib/types';
import AdminImageUploader from './AdminImageUploader';
import { saveProduct } from '@/lib/adminFirestore';
import { toast } from 'sonner';
import { X, GripVertical, Info } from 'lucide-react';
import Image from 'next/image';
import { storage } from '@/lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
  defaultBadge?: string;
}

// Helper to track images that are either already URLs or local Files
interface ImageItem {
  id: string;
  url: string;
  file?: File;
}

export default function ProductModal({ isOpen, onClose, product, defaultBadge = '' }: Props) {
  const isEditing = !!product;
  
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    category: 'rings',
    description: '',
    diamondWeight: '',
    diamondShape: 'Round',
    colour: '',
    clarity: '',
    metalType: '',
    certification: 'None',
    badge: defaultBadge,
    productCode: '',
    systemId: '',
    price: 0,
    currency: 'INR',
    isActive: true,
    images: [],
    coverImage: '',
    ...product,
  });

  const [imageItems, setImageItems] = useState<ImageItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // Sync state if product prop changes
  useEffect(() => {
    if (product) {
      setFormData(product);
      setImageItems((product.images || []).map(url => ({ 
        id: Math.random().toString(36).substr(2, 9), 
        url 
      })));
    } else {
      const resetData = {
        name: '', category: 'rings', description: '', diamondWeight: '',
        diamondShape: 'Round', colour: '', clarity: '', metalType: '',
        certification: 'None', badge: defaultBadge, productCode: '', systemId: `RB-${Math.random().toString(36).substring(2, 8).toUpperCase()}`, price: 0, currency: 'INR' as "INR" | "USD",
        isActive: true, images: [], coverImage: ''
      };
      setFormData(resetData);
      setImageItems([]);
    }
  }, [product, isOpen, defaultBadge]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'price') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

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

  const moveImageUp = (index: number) => {
    if (index === 0) return;
    setImageItems(prev => {
      const newItems = [...prev];
      [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
      return newItems;
    });
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const uploadImages = async (slugBase: string): Promise<string[]> => {
    const uploadPromises = imageItems.map(async (item) => {
      if (!item.file) return item.url; // Already an uploaded URL

      const fileExtension = item.file.name.split('.').pop();
      const uploadId = Math.random().toString(36).substring(7);
      const finalPath = `products/${slugBase}/image-${uploadId}.${fileExtension}`;
      const storageRef = ref(storage, finalPath);
      
      const uploadTask = await uploadBytesResumable(storageRef, item.file);
      return await getDownloadURL(uploadTask.ref);
    });

    return Promise.all(uploadPromises);
  };

  const handleSave = async () => {
    if (!formData.name) {
      toast.error('Product name is required');
      return;
    }
    
    setIsSaving(true);
    try {
      const slug = formData.slug || generateSlug(formData.name);
      const systemId = formData.systemId || `RB-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      
      // 1. Upload new images first
      const finalImageUrls = await uploadImages(slug);
      
      // 2. Prepare final data
      const finalData = { 
        ...formData, 
        slug, 
        systemId,
        images: finalImageUrls,
        coverImage: finalImageUrls[0] || ''
      };

      await saveProduct(finalData);
      
      toast.success(isEditing ? 'Product updated! Refreshing...' : 'Product created! Refreshing...');
      setTimeout(() => {
        window.location.reload();
      }, 900);
    } catch (error) {
      console.error(error);
      toast.error('Failed to save product');
      setIsSaving(false);
    }
  };

  const slugBase = formData.slug || (formData.name ? generateSlug(formData.name) : 'new-product');

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto pt-10 pb-10">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl flex flex-col relative">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-2xl font-playfair font-bold text-gray-900">
            {isEditing ? `Edit Product: ${product?.name}` : 'Add New Product'}
          </h2>
          {!isSaving && (
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition relative top-0 right-0">
              <X size={20} />
            </button>
          )}
        </div>

        <div className="flex flex-col md:flex-row overflow-y-auto min-h-[50vh] max-h-[70vh]">
          {/* Left Panel - Image Management */}
          <div className="w-full md:w-1/3 p-6 border-r border-gray-100 bg-gray-50 flex flex-col gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Images</h3>
              <AdminImageUploader 
                pathTemplate={`products/${slugBase}/image`} 
                onFilesSelected={handleFilesSelected}
                multiple={true}
              />
            </div>
            
            <div className="space-y-3 flex-1 overflow-y-auto pr-2">
              {imageItems.map((item, idx) => (
                <div key={item.id} className="flex items-center gap-3 bg-white p-2 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex flex-col cursor-pointer hover:bg-gray-100 p-1 rounded" onClick={() => moveImageUp(idx)}>
                     <GripVertical size={16} className="text-gray-400" />
                  </div>
                  <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-gray-100">
                    <Image src={item.url} alt={`Preview ${idx}`} fill className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    {idx === 0 && <span className="text-xs bg-black text-white px-2 py-0.5 rounded w-max mb-1">Cover</span>}
                    <span className="text-xs text-gray-500 truncate max-w-[100px]">
                      {item.file ? item.file.name : `image-${idx + 1}`}
                    </span>
                    {item.file && <span className="text-[10px] text-amber-600 font-medium">Pending upload</span>}
                  </div>
                  <button onClick={() => removeImage(item.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded">
                    <X size={16} />
                  </button>
                </div>
              ))}
              {imageItems.length === 0 && (
                <p className="text-sm text-gray-500 text-center italic mt-4">No images selected yet.</p>
              )}
            </div>
          </div>

          {/* Right Panel - Form fields */}
          <div className="w-full md:w-2/3 p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input name="name" placeholder="e.g. Eternity Diamond Ring" value={formData.name || ''} onChange={handleChange} className="w-full p-2 border rounded focus:ring-1 focus:ring-black" />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Code</label>
                  <input name="productCode" placeholder="e.g. SKU-101" value={formData.productCode || ''} onChange={handleChange} className="w-full p-2 border rounded focus:ring-1 focus:ring-black" />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-500 mb-1">System ID</label>
                  <input disabled name="systemId" value={formData.systemId || '(Auto)'} className="w-full p-2 border rounded bg-gray-50 text-gray-400 cursor-not-allowed text-xs" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded focus:ring-1 focus:ring-black">
                  <option value="rings">Rings</option>
                  <option value="earrings">Earrings</option>
                  <option value="pendants">Pendants</option>
                  <option value="solitaire-pendants">Solitaire Pendants</option>
                  <option value="bracelets">Bracelets</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
                <select name="badge" value={formData.badge || ''} onChange={handleChange} className="w-full p-2 border rounded focus:ring-1 focus:ring-black">
                  <option value="">None</option>
                  <option value="New">New</option>
                  <option value="Bestseller">Bestseller</option>
                  <option value="Featured">Featured</option>
                </select>
                {(formData.badge === '' || !formData.badge) && (
                  <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                    <Info size={11} /> Set badge to <strong>Featured</strong> to show on homepage
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <div className="flex gap-2">
                  <input 
                    type="number" 
                    name="price" 
                    placeholder="250000" 
                    value={formData.price} 
                    onChange={handleChange} 
                    className="w-full p-2 border rounded focus:ring-1 focus:ring-black" 
                  />
                  <select 
                    name="currency" 
                    value={formData.currency} 
                    onChange={handleChange} 
                    className="w-24 p-2 border rounded focus:ring-1 focus:ring-black"
                  >
                    <option value="INR">₹ (INR)</option>
                    <option value="USD">$ (USD)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Diamond Weight</label>
                <input name="diamondWeight" placeholder="e.g. 1.5 ct" value={formData.diamondWeight || ''} onChange={handleChange} className="w-full p-2 border rounded focus:ring-1 focus:ring-black" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Diamond Shape</label>
                <select name="diamondShape" value={formData.diamondShape || 'Round'} onChange={handleChange} className="w-full p-2 border rounded focus:ring-1 focus:ring-black">
                  {['Round', 'Oval', 'Pear', 'Cushion', 'Princess', 'Emerald', 'Marquise', 'Radiant', 'Heart', 'Asscher'].map(shape => (
                    <option key={shape} value={shape}>{shape}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Colour</label>
                <input name="colour" placeholder="e.g. D" value={formData.colour || ''} onChange={handleChange} className="w-full p-2 border rounded focus:ring-1 focus:ring-black" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Clarity</label>
                <input name="clarity" placeholder="e.g. VVS1" value={formData.clarity || ''} onChange={handleChange} className="w-full p-2 border rounded focus:ring-1 focus:ring-black" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Metal Type</label>
                <input name="metalType" placeholder="e.g. 18K Yellow Gold" value={formData.metalType || ''} onChange={handleChange} className="w-full p-2 border rounded focus:ring-1 focus:ring-black" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Certification</label>
                <select name="certification" value={formData.certification || 'None'} onChange={handleChange} className="w-full p-2 border rounded focus:ring-1 focus:ring-black">
                  <option value="None">None</option>
                  <option value="IGI">IGI</option>
                  <option value="GIA">GIA</option>
                  <option value="IGI + GIA">IGI + GIA</option>
                  <option value="SGL">SGL</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows={3} name="description" value={formData.description || ''} onChange={handleChange} className="w-full p-2 border rounded focus:ring-1 focus:ring-black"></textarea>
              </div>

              <div className="md:col-span-2 flex items-center gap-2">
                <input type="checkbox" id="isActive" name="isActive" checked={formData.isActive} onChange={handleChange} className="w-4 h-4 text-black focus:ring-black border-gray-300 rounded" />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700 cursor-pointer">Product is visible on website</label>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-white rounded-b-lg">
          <button disabled={isSaving} onClick={onClose} className="px-6 py-2 border rounded font-medium hover:bg-gray-50 transition">
            Cancel
          </button>
          <button disabled={isSaving} onClick={handleSave} className="px-6 py-2 bg-black text-white rounded font-medium hover:bg-gray-800 transition flex items-center gap-2">
            {isSaving ? (
              <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Saving...</>
            ) : "Save Product"}
          </button>
        </div>
      </div>
    </div>
  );
}
