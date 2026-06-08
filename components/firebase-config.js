
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5R6RB72iC35LU-mc75apoxHOEJuEvvsQ",
  authDomain: "akarshaglass-37b7a.firebaseapp.com",
  projectId: "akarshaglass-37b7a",
  storageBucket: "akarshaglass-37b7a.firebasestorage.app",
  messagingSenderId: "905324494523",
  appId: "1:905324494523:web:49ad05e87bbb2707b9b39e",
  measurementId: "G-NJ6LM938C8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);