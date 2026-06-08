"use client";
import React, { useState, useEffect } from 'react';
import { db, auth } from '../../lib/firebase';
import { collection, addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import Link from 'next/link';

const ADMIN_EMAIL = "tcchauhantarun99176@gmail.com"; 

export default function AdminPage() {
    const [user, setUser] = useState(null);
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
    const [products, setProducts] = useState([]);

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

    const handleLogin = async (e) => {
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

    const handleAddProduct = async (e) => {
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
                features: features.split(',').map(f => f.trim()), // Comma separated to Array
                material
            });
            setStatus('Artifact Added Successfully! ✅');
            setName(''); setPrice(''); setDiscount(''); setImgUrl(''); setDescription(''); setFeatures('');
            setTimeout(() => setStatus(''), 3000);
        } catch (error) {
            setStatus('Error adding artifact ❌');
        }
    };

    const handleDelete = async (id) => {
        if(window.confirm("Are you sure you want to remove this piece?")) {
            await deleteDoc(doc(db, "products", id));
        }
    };

    if (isChecking) return <div style={{ color: 'white', padding: '100px', textAlign: 'center' }}>Loading Secure Portal...</div>;

    if (!user || user.email !== ADMIN_EMAIL) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#050505', padding: '20px' }}>
                <form onSubmit={handleLogin} style={{ background: 'rgba(255,255,255,0.03)', padding: '40px', borderRadius: '24px', backdropFilter: 'blur(15px)', border: '1px solid rgba(212, 175, 55, 0.2)', width: '100%', maxWidth: '420px', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
                    <h2 style={{ color: '#fff', marginBottom: '10px', fontFamily: 'Playfair Display', fontSize: '2rem' }}>Owner Login</h2>
                    <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '25px' }}>Access your premium dashboard</p>
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
        <main style={{ minHeight: '100vh', padding: '60px 20px', background: '#050505', color: '#fff', fontFamily: 'Arial' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <Link href="/" style={{ color: '#d4af37', textDecoration: 'none' }}>&larr; Back to Home</Link>
                    <button onClick={() => signOut(auth)} style={{ background: 'transparent', color: '#ff4d4d', border: '1px solid #ff4d4d', padding: '8px 20px', borderRadius: '25px', cursor: 'pointer' }}>Logout</button>
                </div>
                
                <h1 style={{ textAlign: 'center', fontFamily: 'Playfair Display', color: '#d4af37', fontSize: '2.8rem', marginBottom: '50px' }}>Akarsha Admin Control</h1>
                
                {/* Centered Aesthetically Pleasing Form */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '50px' }}>
                    <form onSubmit={handleAddProduct} style={{ background: 'rgba(255,255,255,0.02)', padding: '40px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', width: '100%', maxWidth: '700px', display: 'flex', flexDirection: 'column', gap: '18px', boxShadow: '0 30px 60px rgba(0,0,0,0.6)' }}>
                        <h2 style={{ fontFamily: 'Playfair Display', borderBottom: '1px solid #222', paddingBottom: '10px' }}>Publish New Masterpiece</h2>
                        
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <input type="text" placeholder="Artifact Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ flex: 2, padding: '12px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '8px' }} />
                            <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ flex: 1, padding: '12px', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '8px' }}>
                                <option value="Premium Bowls">Premium Bowls</option>
                                <option value="Luxury Jugs">Luxury Jugs</option>
                                <option value="Borosilicate Series">Borosilicate Series</option>
                            </select>
                        </div>

                        <div style={{ display: 'flex', gap: '15px' }}>
                            <input type="number" placeholder="Price (₹)" value={price} onChange={(e) => setPrice(e.target.value)} required style={{ flex: 1, padding: '12px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '8px' }} />
                            <input type="number" placeholder="Discount (%) e.g. 10" value={discount} onChange={(e) => setDiscount(e.target.value)} style={{ flex: 1, padding: '12px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '8px' }} />
                        </div>

                        <input type="text" placeholder="Image URL" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} required style={{ padding: '12px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '8px' }} />
                        <input type="text" placeholder="Material (e.g., Handblown Quartz Glass)" value={material} onChange={(e) => setMaterial(e.target.value)} required style={{ padding: '12px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '8px' }} />
                        
                        <textarea placeholder="Detailed Description (Tell the story of this artifact...)" value={description} onChange={(e) => setDescription(e.target.value)} required style={{ padding: '12px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '8px', height: '100px', resize: 'none' }}></textarea>
                        <input type="text" placeholder="Key Highlights (Comma separated: Gold Rimmed, Scratch Resistant, Elite Cut)" value={features} onChange={(e) => setFeatures(e.target.value)} required style={{ padding: '12px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '8px' }} />

                        <button type="submit" style={{ padding: '14px', background: '#d4af37', border: 'none', color: '#000', fontWeight: 'bold', cursor: 'pointer', borderRadius: '8px', fontSize: '1rem', marginTop: '10px', transition: 'all 0.3s ease' }}>Publish to Akarsha</button>
                        <p style={{ color: '#d4af37', textAlign: 'center' }}>{status}</p>
                    </form>

                    {/* Inventory Area */}
                    <div style={{ width: '100%', maxWidth: '700px' }}>
                        <h2 style={{ marginBottom: '20px', fontFamily: 'Playfair Display' }}>Live Inventory ({products.length} Items)</h2>
                        <div style={{ maxHeight: '400px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {products.map(item => (
                                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                                    <div>
                                        <span style={{ fontWeight: 'bold', display: 'block' }}>{item.name}</span>
                                        <span style={{ fontSize: '0.8rem', color: '#d4af37' }}>{item.category} | ₹{item.price}</span>
                                    </div>
                                    <button onClick={() => handleDelete(item.id)} style={{ color: '#ff4d4d', cursor: 'pointer', background: 'none', border: 'none', fontSize: '1.2rem' }}>🗑️</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}