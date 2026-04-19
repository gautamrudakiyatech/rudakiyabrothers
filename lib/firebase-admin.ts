import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY
    ? process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n')
    : undefined;

  if (projectId && clientEmail && privateKey) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });
    } catch (error) {
      console.error('Firebase Admin initialization error:', error);
    }
  } else {
    console.warn('Firebase Admin credentials missing. Skipping initialization during build.');
  }
}

const adminDb = admin.apps.length ? admin.firestore() : null as any;
const adminAuth = admin.apps.length ? admin.auth() : null as any;
const adminStorage = admin.apps.length ? admin.storage() : null as any;

export { adminDb, adminAuth, adminStorage };
