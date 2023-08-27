import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBf3QrrfborN6TLxTSM6Y8p9EMdkSztgEw",
  authDomain: "question101.firebaseapp.com",
  projectId: "question101",
  storageBucket: "question101.appspot.com",
  messagingSenderId: "140279306236",
  appId: "1:140279306236:web:2a13f4678600d21ea60479",
  measurementId: "G-FSR6S7NZ8L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("profile");
googleProvider.addScope("email");
googleProvider.setCustomParameters({
  prompt: "select_account",
});

const db = getFirestore(app);

export { auth, googleProvider, db };
