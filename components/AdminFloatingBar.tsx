"use client";

import React from 'react';
import { useAdmin } from '@/context/AdminContext';

export default function AdminFloatingBar() {
  const { isAdmin, logout } = useAdmin();

  if (!isAdmin) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999] bg-black text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-3 text-sm">
      <span className="flex items-center">
        <span className="mr-2">✏️</span> Admin Mode
      </span>
      <div className="w-[1px] h-4 bg-gray-500"></div>
      <button 
        onClick={logout}
        className="hover:text-gray-300 transition-colors bg-transparent border-none p-0"
      >
        Logout
      </button>
    </div>
  );
}
