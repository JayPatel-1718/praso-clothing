import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration (replace with your actual config from Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyC4bDv-5EdzaVbMWd0TVmHLI4y7KIdR-6Q",
    authDomain: "prasoclothing-ac3a3.firebaseapp.com",
    projectId: "prasoclothing-ac3a3",
    storageBucket: "prasoclothing-ac3a3.firebasestorage.app",
    messagingSenderId: "362254349990",
    appId: "1:362254349990:web:b3f89bd304f3468e92e667",
    measurementId: "G-ETY5MMFPPM"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Initialize Google provider
const googleProvider = new GoogleAuthProvider();

export { auth, db, storage, googleProvider, signInWithPopup };