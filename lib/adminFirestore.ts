import { db, storage } from '@/lib/firebase';
import { doc, setDoc, deleteDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ref, deleteObject, listAll } from 'firebase/storage';
import { Product, Category, SiteSettings, Review } from './types';

export async function saveProduct(product: Partial<Product> & { id?: string }) {
  const isNew = !product.id;
  const docRef = isNew 
    ? doc(db, 'products', product.slug || Date.now().toString()) 
    : doc(db, 'products', product.id!);

  const dataToSave = {
    ...product,
    updatedAt: serverTimestamp(),
    ...(isNew && { createdAt: serverTimestamp() })
  };

  await setDoc(docRef, dataToSave, { merge: true });
}

export async function deleteProductByDocId(id: string, images: string[] = []) {
  if (images && images.length > 0) {
    try {
      const deletePromises = images.map((img) => deleteObject(ref(storage, img)));
      await Promise.all(deletePromises);
    } catch (error) {
      console.error('Error deleting product images:', error);
    }
  }
  await deleteDoc(doc(db, 'products', id));
}

export async function deleteProduct(product: Product) {
  await deleteProductByDocId(product.id, product.images || []);
}

export async function toggleProductActive(id: string, isActive: boolean) {
  const docRef = doc(db, 'products', id);
  await updateDoc(docRef, { isActive, updatedAt: serverTimestamp() });
}

export async function saveCategory(category: Partial<Category>) {
  if (!category.id) throw new Error('Category ID required');
  const docRef = doc(db, 'categories', category.id);
  await setDoc(docRef, category, { merge: true });
}

export async function saveSiteSettings(settings: Partial<SiteSettings>) {
  const docRef = doc(db, 'siteSettings', 'hero');
  await setDoc(docRef, settings, { merge: true });
}

export async function saveReview(review: Partial<Review>) {
  const id = review.id || `rx_${Date.now()}`;
  const docRef = doc(db, 'reviews', id);
  await setDoc(docRef, { ...review, id }, { merge: true });
}

export async function deleteReview(id: string) {
  await deleteDoc(doc(db, 'reviews', id));
}
