"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Category } from '@/lib/types';
import SectionEditButton from './SectionEditButton';
import { saveCategory } from '@/lib/adminFirestore';
import AdminImageUploader from './AdminImageUploader';
import { toast } from 'sonner';
import { X } from 'lucide-react';

interface Props {
  categories: Category[];
}

export default function CategoryGrid({ categories }: Props) {
  // Keep a local copy so we can optimistically update images without waiting for server refresh
  const [localCategories, setLocalCategories] = useState<Category[]>(categories);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const displayCategories = [...localCategories].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const handleSaved = (updatedCategory: Category) => {
    // Optimistically update local state so image shows immediately
    setLocalCategories(prev =>
      prev.map(c => c.id === updatedCategory.id ? updatedCategory : c)
    );
    setEditingCategory(null);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {displayCategories.map((category) => (
          <div key={category.id} className="relative group aspect-square rounded-2xl overflow-hidden shadow-md border border-gray-100 block">
            <SectionEditButton onEdit={() => setEditingCategory(category)} />
            
            <Link href={`/category/${category.slug}`} className="absolute inset-0 block">
              {category.coverImage ? (
                <Image
                  src={category.coverImage}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 20vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  unoptimized={category.coverImage.startsWith('https://firebasestorage')}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <h3 className="font-playfair text-xl md:text-2xl text-white mb-1 group-hover:text-rudakiya-gold transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-white/80 font-inter text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    Explore
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {editingCategory && (
        <EditCategoryModal
          category={editingCategory}
          onClose={() => setEditingCategory(null)}
          onSaved={handleSaved}
        />
      )}
    </>
  );
}

function EditCategoryModal({
  category,
  onClose,
  onSaved,
}: {
  category: Category;
  onClose: () => void;
  onSaved: (updated: Category) => void;
}) {
  const [formData, setFormData] = useState<Category>({ ...category });
  const [isSaving, setIsSaving] = useState(false);

  const handleUpload = (url: string) => {
    setFormData(prev => ({ ...prev, coverImage: url }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveCategory(formData);
      toast.success('Category updated! Refreshing...');
      // Optimistically update the UI immediately
      onSaved(formData);
      // Then reload to sync server data
      setTimeout(() => {
        window.location.reload();
      }, 900);
    } catch (e) {
      console.error(e);
      toast.error('Failed to update category');
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition">
          <X size={20} />
        </button>
        <h2 className="text-xl font-playfair font-bold mb-6">Edit — {category.name}</h2>

        <div className="space-y-5">
          {/* Image preview */}
          {formData.coverImage && (
            <div className="relative w-full h-48 rounded-xl overflow-hidden border border-gray-200">
              <Image
                src={formData.coverImage}
                alt="Cover preview"
                fill
                className="object-cover"
                unoptimized={formData.coverImage.startsWith('https://firebasestorage')}
              />
              <button
                onClick={() => setFormData(prev => ({ ...prev, coverImage: '' }))}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-50"
              >
                <X size={14} className="text-red-500" />
              </button>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold mb-2">
              {formData.coverImage ? 'Replace Cover Image' : 'Upload Cover Image'}
            </label>
            <AdminImageUploader
              pathTemplate={`categories/${category.slug}-cover`}
              onUploadSuccess={handleUpload}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Description</label>
            <textarea
              rows={3}
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border rounded-lg p-2 text-sm focus:ring-1 focus:ring-black outline-none"
              placeholder="Short description for this category..."
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="catActive"
              checked={formData.isActive !== false}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4 accent-black"
            />
            <label htmlFor="catActive" className="text-sm cursor-pointer">
              Visible on website
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3 border-t pt-4">
          <button
            disabled={isSaving}
            onClick={onClose}
            className="px-5 py-2 border rounded-lg text-sm hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            disabled={isSaving}
            onClick={handleSave}
            className="px-5 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : 'Save Category'}
          </button>
        </div>
      </div>
    </div>
  );
}
