import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Replace this with your copied firebaseConfig from Step 2
const firebaseConfig = {
  apiKey: "AIzaSyC5R6RB72iC35LU-mc75apoxHOEJuEvvsQ",
  authDomain: "akarshaglass-37b7a.firebaseapp.com",
  projectId: "akarshaglass-37b7a",
  storageBucket: "akarshaglass-37b7a.firebasestorage.app",
  messagingSenderId: "905324494523",
  appId: "1:905324494523:web:49ad05e87bbb2707b9b39e",
  measurementId: "G-NJ6LM938C8"
};
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// 2. Services Initialize
const db = getFirestore(app);
const auth = getAuth(app);

// 3. Analytics (Browser safe)
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then(supported => {
    if (supported) analytics = getAnalytics(app);
  });
}

// 4. SIRF EK BAAR EXPORT
export { db, auth, app, analytics };


