"use client";

import React, { useState, useEffect } from 'react';
import { Review } from '@/lib/types';
import SectionEditButton from './SectionEditButton';
import { saveReview, deleteReview } from '@/lib/adminFirestore';
import ConfirmDialog from './ConfirmDialog';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from 'sonner';
import { X, Star } from 'lucide-react';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState<Partial<Review> | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    // Simple collection fetch — no orderBy/where combo to avoid Firestore composite index requirement
    const unsub = onSnapshot(query(collection(db, 'reviews')), (snap) => {
      const revs = snap.docs
        .map(d => ({ id: d.id, ...d.data() } as Review))
        .filter(r => r.isActive !== false)
        .sort((a, b) => (a.order || 0) - (b.order || 0)); // sort client-side
      setReviews(revs);
      setLoading(false);
    }, (error) => {
      console.error('Reviews listener error:', error);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteReview(deletingId);
      toast.success('Review deleted');
    } catch (e) {
      toast.error('Failed to delete review');
    } finally {
      setDeletingId(null);
    }
  };

  // Always render the section — never hide it

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative group bg-[#fafafa] rounded-3xl mb-24">
      <div className="absolute top-4 right-4">
        <SectionEditButton onAdd={() => setEditingReview({ isActive: true, order: reviews.length + 1 })} addLabel="Add Review" className="!relative !top-0 !right-0" />
      </div>

      <div className="text-center mb-16">
        <span className="font-inter font-bold tracking-[0.3em] text-rudakiya-gold text-xs uppercase mb-4 block">
          Client Diaries
        </span>
        <h2 className="font-playfair text-4xl sm:text-5xl text-rudakiya-dark mb-6">
          Customer Reviews
        </h2>
        <div className="w-16 h-[2px] bg-rudakiya-gold mx-auto"></div>
      </div>

      {loading ? (
        <div className="flex gap-6 overflow-hidden">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm min-w-[320px] h-48 border border-gray-100 animate-pulse flex-shrink-0">
              <div className="flex gap-1 mb-6"><div className="w-4 h-4 rounded bg-gray-200"/><div className="w-4 h-4 rounded bg-gray-200"/><div className="w-4 h-4 rounded bg-gray-200"/></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-3"/><div className="h-4 bg-gray-200 rounded w-2/3 mb-6"/>
              <div className="h-3 bg-gray-200 rounded w-1/3"/>
            </div>
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-3xl">
          <div className="flex justify-center gap-1 mb-4 text-rudakiya-gold/40">
            {[1,2,3,4,5].map(i => <Star key={i} size={24} fill="currentColor" />)}
          </div>
          <h3 className="font-playfair text-2xl text-rudakiya-dark mb-2">No Reviews Yet</h3>
          <p className="font-inter text-gray-400 text-sm">Use the "Add Review" button above to feature your first customer testimonial.</p>
        </div>
      ) : (
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar">
          {reviews.map(review => (
            <div key={review.id} className="min-w-[320px] max-w-sm bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex-shrink-0 snap-center relative hover:-translate-y-1 transition-transform">
              <SectionEditButton 
                onEdit={() => setEditingReview(review)} 
                onDelete={() => setDeletingId(review.id)} 
              />
              <div className="flex gap-1 mb-6 text-rudakiya-gold">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="font-playfair text-lg text-rudakiya-dark leading-relaxed mb-6">"{review.review}"</p>
              <p className="font-inter text-xs text-gray-500 uppercase tracking-widest">— {review.name}</p>
            </div>
          ))}
        </div>
      )}

      {editingReview && (
        <EditReviewModal review={editingReview} onClose={() => setEditingReview(null)} />
      )}

      <ConfirmDialog 
        isOpen={!!deletingId} 
        onClose={() => setDeletingId(null)} 
        onConfirm={handleDelete} 
        title="Delete Review?" 
        message="This review will be permanently removed." 
        confirmLabel="Delete"
      />
    </section>
  );
}

function EditReviewModal({ review, onClose }: { review: Partial<Review>, onClose: () => void }) {
  const [formData, setFormData] = useState<Partial<Review>>(review);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!formData.name || !formData.review) {
      toast.error('Name and review are required');
      return;
    }
    setIsSaving(true);
    try {
      await saveReview(formData);
      toast.success('Review saved');
      onClose();
    } catch (e) {
      toast.error('Failed to save review');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full">
          <X size={20} />
        </button>
        <h2 className="text-xl font-playfair font-bold mb-4">{review.id ? 'Edit Review' : 'Add Review'}</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Reviewer Name</label>
            <input required value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Review Text</label>
            <textarea rows={4} required value={formData.review || ''} onChange={e => setFormData({...formData, review: e.target.value})} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Order Index</label>
            <input type="number" value={formData.order || 0} onChange={e => setFormData({...formData, order: parseInt(e.target.value)})} className="w-full border rounded p-2" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="revActive" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="w-4 h-4" />
            <label htmlFor="revActive" className="text-sm">Is Active</label>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3 border-t pt-4">
          <button disabled={isSaving} onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
          <button disabled={isSaving} onClick={handleSave} className="px-4 py-2 bg-black text-white rounded">{isSaving ? "Saving..." : "Save Review"}</button>
        </div>
      </div>
    </div>
  );
}
