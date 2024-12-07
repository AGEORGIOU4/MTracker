import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAYJeG2MG5zSITflLCmP90Xna4MO5Ojo4U",
  authDomain: "mtracker-9b44e.firebaseapp.com",
  projectId: "mtracker-9b44e",
  storageBucket: "mtracker-9b44e.firebasestorage.app",
  messagingSenderId: "144453430896",
  appId: "1:144453430896:web:023a372932749104820eb5"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
