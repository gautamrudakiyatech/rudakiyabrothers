import { db } from './firebase';
import { collection, doc, getDoc, getDocs, query, where, orderBy, limit, Timestamp } from 'firebase/firestore';
import { Product, Category, SiteSettings } from './types';

// Serialize any Firestore Timestamps inside an object to ISO strings
// so they can safely pass from Server Components to Client Components
function serializeDoc<T extends Record<string, any>>(data: T): T {
  const result: any = {};
  for (const [key, value] of Object.entries(data)) {
    if (value instanceof Timestamp) {
      result[key] = value.toDate().toISOString();
    } else if (Array.isArray(value)) {
      result[key] = value.map(item =>
        item instanceof Timestamp ? item.toDate().toISOString() : item
      );
    } else {
      result[key] = value;
    }
  }
  return result as T;
}

export async function getProducts(options?: { category?: string; isFeatured?: boolean; limit?: number }): Promise<Product[]> {
  try {
    // Use only a single where clause to avoid needing composite indexes
    // Then filter in-memory for other conditions
    let q;

    if (options?.category) {
      q = query(
        collection(db, 'products'),
        where('isActive', '==', true),
        where('category', '==', options.category)
      );
    } else if (options?.isFeatured) {
      // Query all active products and filter by badge in memory
      // to avoid needing a composite index on isActive + badge
      q = query(collection(db, 'products'), where('isActive', '==', true));
    } else {
      q = query(collection(db, 'products'), where('isActive', '==', true));
    }

    if (options?.limit && !options?.isFeatured) {
      q = query(q, limit(options.limit));
    }

    const snapshot = await getDocs(q);
    let products = snapshot.docs.map(d => serializeDoc({ id: d.id, ...d.data() } as Product));

    // Filter featured in-memory (no composite index required)
    if (options?.isFeatured) {
      products = products.filter(p => p.badge === 'Featured');
    }

    if (options?.limit) {
      products = products.slice(0, options.limit);
    }

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProduct(slug: string): Promise<Product | null> {
  try {
    const q = query(collection(db, 'products'), where('slug', '==', slug), limit(1));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    return serializeDoc({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Product);
  } catch (error) {
    console.error(`Error fetching product ${slug}:`, error);
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    // Fetch all categories without orderBy to avoid index requirement
    const snapshot = await getDocs(collection(db, 'categories'));
    return snapshot.docs
      .map(d => serializeDoc({ id: d.id, ...d.data() } as Category))
      .filter(cat => cat.isActive !== false)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const docRef = doc(db, 'siteSettings', 'hero');
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;
    return serializeDoc({ id: snapshot.id, ...snapshot.data() } as SiteSettings);
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return null;
  }
}
