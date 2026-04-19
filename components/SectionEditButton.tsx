"use client";

import React from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Pencil, Trash2, Plus } from 'lucide-react';

interface Props {
  onEdit?: () => void;
  onDelete?: () => void;
  onAdd?: () => void;
  editLabel?: string;
  addLabel?: string;
  className?: string;
}

export default function SectionEditButton({ onEdit, onDelete, onAdd, editLabel, addLabel, className = '' }: Props) {
  const { isAdmin } = useAdmin();

  if (!isAdmin) return null;

  return (
    <div className={`absolute top-2 right-2 z-50 flex gap-2 ${className}`}>
      {onAdd && (
        <button 
          onClick={(e) => { e.preventDefault(); onAdd(); }}
          className="flex items-center gap-1 bg-black text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-md hover:bg-gray-800 transition-colors pointer-events-auto"
        >
          <Plus size={14} /> {addLabel || "Add"}
        </button>
      )}
      {onEdit && (
        <button 
          onClick={(e) => { e.preventDefault(); onEdit(); }}
          className="flex items-center gap-1 bg-white text-black border border-gray-200 px-3 py-1.5 rounded-full text-xs font-medium shadow-md hover:shadow-lg transition-all pointer-events-auto"
        >
          <Pencil size={14} /> {editLabel || "Edit"}
        </button>
      )}
      {onDelete && (
        <button 
          onClick={(e) => { e.preventDefault(); onDelete(); }}
          className="flex items-center gap-1 bg-red-600 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-md hover:bg-red-700 transition-all pointer-events-auto"
        >
          <Trash2 size={14} />
        </button>
      )}
    </div>
  );
}
