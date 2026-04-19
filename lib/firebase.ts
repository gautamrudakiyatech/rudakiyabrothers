import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

const isConfigValid = !!firebaseConfig.apiKey;

let app;
let auth: any;
let db: any;
let storage: any;

if (isConfigValid) {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
} else {
  const missingKeysError = "CRITICAL: Firebase Configuration is missing! Please make sure you have set NEXT_PUBLIC_FIREBASE_API_KEY in your .env.local file.";
  console.error(missingKeysError);
  
  // Provide dummy functions to prevent immediate crash, 
  // but they will show the helpful error if called.
  const proxyHandler = {
    get: (target: any, prop: string) => {
      throw new Error(missingKeysError);
    }
  };
  
  auth = new Proxy({}, proxyHandler);
  db = new Proxy({}, proxyHandler);
  storage = new Proxy({}, proxyHandler);
}

export { app, auth, db, storage };
