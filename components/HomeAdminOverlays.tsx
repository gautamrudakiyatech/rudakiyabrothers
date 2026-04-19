"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SectionEditButton from './SectionEditButton';
import ProductModal from './ProductModal';
import AdminImageUploader from './AdminImageUploader';
import { saveSiteSettings } from '@/lib/adminFirestore';
import { toast } from 'sonner';
import { X } from 'lucide-react';

// Hero Section Edit Overlay
export function HeroAdminOverlay() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [headline, setHeadline] = useState('');
  const [subheadline, setSubheadline] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveSiteSettings({ videoUrl, posterUrl, headline, subheadline });
      toast.success('Hero section updated!');
      setIsOpen(false);
      router.refresh(); // Re-fetch server component data immediately
    } catch (e) {
      toast.error('Failed to save hero settings');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <SectionEditButton
        onEdit={() => setIsOpen(true)}
        editLabel="Edit Hero"
        className="!top-16 !right-4"
      />

      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full">
              <X size={20} />
            </button>
            <h2 className="text-xl font-playfair font-bold mb-6">Edit Hero Section</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1">Headline</label>
                <input value={headline} onChange={e => setHeadline(e.target.value)} className="w-full border rounded p-2" placeholder="Exquisite Lab-Grown Diamond Jewelry" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subheadline</label>
                <input value={subheadline} onChange={e => setSubheadline(e.target.value)} className="w-full border rounded p-2" placeholder="Explore our collection" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Hero Video (MP4)</label>
                <AdminImageUploader pathTemplate="hero/hero-video" accept="video/*" onUploadSuccess={(url) => setVideoUrl(url)} />
                {videoUrl && <p className="text-xs text-green-600 mt-2">✓ Video uploaded</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Poster Image (WebP)</label>
                <AdminImageUploader pathTemplate="hero/hero-poster" accept="image/*" onUploadSuccess={(url) => setPosterUrl(url)} />
                {posterUrl && <p className="text-xs text-green-600 mt-2">✓ Poster uploaded</p>}
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3 border-t pt-4">
              <button disabled={isSaving} onClick={() => setIsOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button disabled={isSaving} onClick={handleSave} className="px-4 py-2 bg-black text-white rounded">
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Featured Products "Add" Overlay
export function FeaturedAdminOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <SectionEditButton onAdd={() => setIsOpen(true)} addLabel="Add Product" />
      {/* defaultBadge="Featured" ensures every product added here shows in Featured Pieces */}
      <ProductModal isOpen={isOpen} onClose={() => setIsOpen(false)} defaultBadge="Featured" />
    </>
  );
}

// Shop by Category "Add Product" Overlay
export function ShopByCategoryAdminOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <SectionEditButton onAdd={() => setIsOpen(true)} addLabel="Add Product" className="!top-4 !right-4" />
      <ProductModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

// Generic Banner Edit Overlay
export function BannerAdminOverlay({ label }: { label: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <SectionEditButton onEdit={() => setIsOpen(true)} editLabel={`Edit ${label}`} />
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full">
              <X size={20} />
            </button>
            <h2 className="text-xl font-playfair font-bold mb-4">Edit {label}</h2>
            <p className="text-sm text-gray-500 mb-4">Banner image management coming soon. Upload your image to Firebase Storage manually for now.</p>
            <div className="flex justify-end">
              <button onClick={() => setIsOpen(false)} className="px-4 py-2 border rounded">Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Promise section background edit overlay
export function PromiseAdminOverlay() {
  return <SectionEditButton onEdit={() => toast.info('Promise background edit coming soon')} editLabel="Edit Background" />;
}
