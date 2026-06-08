'use client';
import { useState } from 'react';
import { auth, db } from './firebase-config';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup 
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function AuthModal({ isOpen, onClose }) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            console.log("Starting Google Login...");
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            
            console.log("Logged in UID:", user.uid);
            
            // Save user to Firestore
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                name: user.displayName,
                createdAt: new Date()
            }, { merge: true });
            
            console.log("Data successfully saved to Firestore!");
            onClose();
        } catch (error) {
            console.error("DEBUG ERROR: ", error); 
        }
    };

    // Handle Email Auth
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await setDoc(doc(db, "users", userCredential.user.uid), {
                    email: email,
                    createdAt: new Date()
                });
            }
            onClose();
        } catch (error) {
            alert(error.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="login-overlay active" onClick={onClose}>
            <div className="login-modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-login" onClick={onClose}>&times;</button>
                <div className="login-form-container">
                    <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="input-group">
                            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className="checkout-btn">{isLogin ? 'Login' : 'Sign Up'}</button>
                    </form>

                    <button onClick={handleGoogle} style={{ marginTop: '15px' }} className="cta-btn">
                        Continue with Google
                    </button>
                </div>
            </div>
        </div>
    );
}