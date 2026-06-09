
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyC5R6RB72iC35LU-mc75apoxHOEJuEvvsQ",
  authDomain: "akarshaglass-37b7a.firebaseapp.com",
  projectId: "akarshaglass-37b7a",
  storageBucket: "akarshaglass-37b7a.firebasestorage.app",
  messagingSenderId: "905324494523",
  appId: "1:905324494523:web:49ad05e87bbb2707b9b39e",
  measurementId: "G-NJ6LM938C8"
};
let analytics = null;
if (typeof window !== 'undefined') {
  // Ab isSupported kaam karega kyunki humne ise import kar liya hai
  isSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(err => {
    console.error("Analytics initialization failed:", err);
  });
}
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
console.log("FIREBASE CONFIG CHECK:", firebaseConfig);
// Initialize services
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);