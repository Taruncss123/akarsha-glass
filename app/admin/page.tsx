"use client";
import React, { useState, useEffect } from 'react';
import { db, auth } from '../../lib/firebase';
import { collection, addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import Link from 'next/link';
import { onAuthStateChanged, User, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const ADMIN_EMAIL = "tcchauhantarun99176@gmail.com"; 

export default function AdminPage() {
    const [user, setUser] = useState<User | null>(null);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [isChecking, setIsChecking] = useState(true);

    // Form States
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [category, setCategory] = useState('Premium Bowls');
    const [imgUrl, setImgUrl] = useState('');
    const [description, setDescription] = useState('');
    const [features, setFeatures] = useState('');
    const [material, setMaterial] = useState('Pure Borosilicate');
    const [status, setStatus] = useState('');
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsChecking(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (user?.email === ADMIN_EMAIL) {
            const unsub = onSnapshot(collection(db, "products"), (snapshot) => {
                setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            });
            return () => unsub();
        }
    }, [user]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthError('');
        try {
            const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            if (userCredential.user.email !== ADMIN_EMAIL) {
                await signOut(auth);
                setAuthError("Access Denied! You are not the owner.");
            }
        } catch (error) {
            setAuthError("Invalid Email or Password ❌");
        }
    };

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Publishing...');
        try {
            await addDoc(collection(db, "products"), { 
                name, 
                price: Number(price), 
                discount: discount ? Number(discount) : 0,
                category, 
                img: imgUrl,
                description,
                features: features.split(',').map(f => f.trim()),
                material
            });
            setStatus('Artifact Added Successfully! ✅');
            setName(''); setPrice(''); setDiscount(''); setImgUrl(''); setDescription(''); setFeatures('');
            setTimeout(() => setStatus(''), 3000);
        } catch (error) {
            setStatus('Error adding artifact ❌');
        }
    };

    const handleDelete = async (id: string) => {
        if(window.confirm("Are you sure you want to remove this piece?")) {
            await deleteDoc(doc(db, "products", id));
        }
    };

    if (isChecking) return <div style={{ color: 'white', padding: '100px', textAlign: 'center' }}>Loading Secure Portal...</div>;

    if (!user || user.email !== ADMIN_EMAIL) {
        return (
            <div style={
                {
                     minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#050505', padding: '20px' }}>
                <form onSubmit={handleLogin} style={{ background: 'rgba(255,255,255,0.03)', padding: '40px', borderRadius: '24px', backdropFilter: 'blur(15px)', border: '1px solid rgba(212, 175, 55, 0.2)', width: '100%', maxWidth: '420px', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
                    <h2 style={{ color: '#fff', marginBottom: '10px', fontSize: '2rem' }}>Owner Login</h2>
                    {authError && <p style={{ color: '#ff4d4d', marginBottom: '15px', fontSize: '0.9rem' }}>{authError}</p>}
                    <input type="email" placeholder="Admin Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required style={{ width: '100%', padding: '14px', marginBottom: '15px', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '8px' }} />
                    <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required style={{ width: '100%', padding: '14px', marginBottom: '25px', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '8px' }} />
                    <button type="submit" style={{ width: '100%', padding: '14px', background: '#d4af37', border: 'none', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer', color: '#000' }}>Access Portal</button>
                    <Link href="/" style={{ display: 'block', marginTop: '20px', color: '#aaa', fontSize: '0.9rem', textDecoration: 'none' }}>&larr; Return to Site</Link>
                </form>
            </div>
        );
    }

    return (
        <main style={{ minHeight: '100vh', padding: '60px 20px', background: '#050505', color: '#fff' }}>
             {/* ... UI Code remains same ... */}
             <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <Link href="/" style={{ color: '#d4af37', textDecoration: 'none' }}>&larr; Back to Home</Link>
                    <button onClick={() => signOut(auth)} style={{ background: 'transparent', color: '#ff4d4d', border: '1px solid #ff4d4d', padding: '8px 20px', borderRadius: '25px', cursor: 'pointer' }}>Logout</button>
                </div>
                {/* ... rest of your UI ... */}
             </div>
        </main>
    );
}