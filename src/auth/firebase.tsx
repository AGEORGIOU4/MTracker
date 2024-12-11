import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mtracker-9b44e.firebaseapp.com",
  projectId: "mtracker-9b44e",
  storageBucket: "mtracker-9b44e.firebasestorage.app",
  messagingSenderId: "144453430896",
  appId: "1:144453430896:web:023a372932749104820eb5"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
