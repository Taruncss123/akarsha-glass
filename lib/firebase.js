// // Import the functions you need from the SDKs you need
// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// // TODO: Replace this with your copied firebaseConfig from Step 2
// const firebaseConfig = {
//   apiKey: "AIzaSyC5R6RB72iC35LU-mc75apoxHOEJuEvvsQ",
//   authDomain: "akarshaglass-37b7a.firebaseapp.com",
//   projectId: "akarshaglass-37b7a",
//   storageBucket: "akarshaglass-37b7a.firebasestorage.app",
//   messagingSenderId: "905324494523",
//   appId: "1:905324494523:web:49ad05e87bbb2707b9b39e",
//   measurementId: "G-NJ6LM938C8"
// };

// // Initialize Firebase (Checking if it's already initialized to prevent errors in Next.js)
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// // Initialize Services
// const auth = getAuth(app);
// const db = getFirestore(app);

// export { auth, db };
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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

// Yeh Next.js ka special rule hai jisse Firebase double-initialize na ho
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
