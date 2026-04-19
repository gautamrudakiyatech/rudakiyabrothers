const admin = require('firebase-admin');
const dotenv = require('dotenv');
const path = require('path');

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

async function seed() {
  console.log('Seeding Firestore...');

  // 1. Categories
  const categories = [
    { id: 'rings', name: 'Rings', slug: 'rings', description: '', coverImage: '', isActive: true, order: 1 },
    { id: 'earrings', name: 'Earrings', slug: 'earrings', description: '', coverImage: '', isActive: true, order: 2 },
    { id: 'pendants', name: 'Pendants', slug: 'pendants', description: '', coverImage: '', isActive: true, order: 3 },
    { id: 'solitaire-pendants', name: 'Solitaire Pendants', slug: 'solitaire-pendants', description: '', coverImage: '', isActive: true, order: 4 },
    { id: 'bracelets', name: 'Bracelets', slug: 'bracelets', description: '', coverImage: '', isActive: true, order: 5 },
  ];

  for (const cat of categories) {
    await db.collection('categories').doc(cat.id).set(cat, { merge: true });
    console.log(`Seeded category: ${cat.id}`);
  }

  // 2. Site Settings
  await db.collection('siteSettings').doc('hero').set({
    videoUrl: '',
    posterUrl: '',
    headline: 'Exquisite Lab-Grown Diamond Jewelry',
    subheadline: 'Explore our collection of finely crafted pieces.',
  }, { merge: true });
  console.log('Seeded siteSettings/hero');

  // 3. Reviews (placeholder examples)
  const reviews = [
    { id: 'rev_1', name: 'Aisha K.', review: 'Beautiful craftsmanship and stunning diamonds. Highly recommend!', isActive: true, order: 1 },
    { id: 'rev_2', name: 'Rahul S.', review: 'The quality of these lab-grown diamonds is indistinguishable from natural ones. My wife loved her anniversary gift.', isActive: true, order: 2 },
    { id: 'rev_3', name: 'Priya M.', review: 'Exceptional service and exactly the design I wanted. A beautiful Solitaire pendant.', isActive: true, order: 3 },
  ];

  for (const rev of reviews) {
    await db.collection('reviews').doc(rev.id).set(rev, { merge: true });
    console.log(`Seeded review: ${rev.id}`);
  }

  console.log('Seeding Complete.');
}

seed().catch(console.error).finally(() => process.exit(0));
