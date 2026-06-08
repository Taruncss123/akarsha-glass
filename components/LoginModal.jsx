"use client";
import { useState } from 'react';
import { auth } from '../lib/firebase'; // Aapki banayi hui firebase config file
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginModal({ isOpen, onClose }) {
    const [isSignUp, setIsSignUp] = useState(false);
    
    // Form Inputs State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    if (!isOpen) return null;

    // Firebase Auth Handler
    const handleAuth = async (e) => {
        e.preventDefault();
        setErrorMsg(''); // Purane errors clear karein
        
        try {
            if (isSignUp) {
                // Naya User Create Karein
                await createUserWithEmailAndPassword(auth, email, password);
                alert("Welcome to the Elite! Account Created Successfully.");
                onClose(); // Modal band kardo
            } else {
                // Purana User Login Karein
                await signInWithEmailAndPassword(auth, email, password);
                alert("Welcome Back! Logged In Successfully.");
                onClose();
            }
        } catch (error) {
            // Agar password galat ho ya email pehle se ho
            setErrorMsg(error.message);
        }
    };

    return (
        <div className="login-overlay active" onClick={onClose}>
            <div className="login-modal glass-card" onClick={(e) => e.stopPropagation()}>
                <button className="close-login" onClick={onClose}>&times;</button>
                
                <div className="login-form-container">
                    <h2>{isSignUp ? "Join the Elite" : "Welcome Back"}</h2>
                    <p>{isSignUp ? "Create your custom account" : "Access your premium Akarsha account"}</p>
                    
                    {/* Error Message Display */}
                    {errorMsg && <p style={{ color: '#ff4d4d', fontSize: '0.8rem', marginTop: '-15px' }}>{errorMsg}</p>}

                    <form onSubmit={handleAuth}>
                        {/* Name field sirf Sign Up me dikhegi */}
                        {isSignUp && (
                            <div className="input-group">
                                <i className="fa-regular fa-user"></i>
                                <input 
                                    type="text" 
                                    placeholder="Full Name" 
                                    required 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        )}
                        
                        <div className="input-group">
                            <i className="fa-regular fa-envelope"></i>
                            <input 
                                type="email" 
                                placeholder="Email Address" 
                                required 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        
                        <div className="input-group">
                            <i className="fa-solid fa-lock"></i>
                            <input 
                                type="password" 
                                placeholder="Password (Min 6 chars)" 
                                required 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {!isSignUp && (
                            <div className="forgot-pass">
                                <a href="#">Forgot Password?</a>
                            </div>
                        )}

                        <button type="submit" className="cta-btn submit-btn">
                            {isSignUp ? "Create Account" : "Sign In"}
                        </button>
                    </form>

                    <p className="switch-form" style={{ marginTop: '20px' }}>
                        {isSignUp ? "Already have an account? " : "New to Akarsha? "}
                        <span onClick={() => setIsSignUp(!isSignUp)}>
                            {isSignUp ? "Sign In" : "Create an account"}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}