"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface AdminContextType {
  isAdmin: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  isLoading: true,
  logout: async () => {},
});

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await fetch('/api/auth/verify');
        const data = await response.json();
        setIsAdmin(!!data.isAdmin);
      } catch (error) {
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, []);

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setIsAdmin(false);
      toast.success('Logged out successfully');
      router.push('/');
      router.refresh();
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  return (
    <AdminContext.Provider value={{ isAdmin, isLoading, logout }}>
      {children}
    </AdminContext.Provider>
  );
};
