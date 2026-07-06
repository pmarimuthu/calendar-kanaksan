import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// pulse-kanaksan shared analytics Firebase project (see pulse-kanaksan
// integration guide). The API key is safe in frontend bundles — Firestore
// security rules are the enforcement layer.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Named app so it never collides with any other Firebase app in the page.
const app = initializeApp(firebaseConfig, 'pulse');
export const db = getFirestore(app);
