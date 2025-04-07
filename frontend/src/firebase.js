import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC4bDv-5EdzaVbMWd0TVmHLI4y7KIdR-6Q",
  authDomain: "prasoclothing-ac3a3.firebaseapp.com",
  projectId: "prasoclothing-ac3a3",
  storageBucket: "prasoclothing-ac3a3.appspot.com",
  messagingSenderId: "362254349990",
  appId: "1:362254349990:web:b3f89bd304f3468e92e667",
  measurementId: "G-ETY5MMFPPM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export { auth, storage, googleProvider, signInWithPopup };
