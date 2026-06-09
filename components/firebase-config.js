
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "process.env.AIzaSyC5R6RB72iC35LU-mc75apoxHOEJuEvvsQ",
  authDomain: "process.env.akarshaglass-37b7a.firebaseapp.com",
  projectId: "process.env.akarshaglass-37b7a",
  storageBucket: "process.env.akarshaglass-37b7a.firebasestorage.app",
  messagingSenderId: "process.env.process.env.905324494523",
  appId: "process.env.1:905324494523:web:49ad05e87bbb2707b9b39e",
  measurementId: "process.env.G-NJ6LM938C8"
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
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);