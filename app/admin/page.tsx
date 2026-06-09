"use client";
import React, { useState, useEffect } from 'react';
import { collection, addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import Link from 'next/link';
import { onAuthStateChanged, User, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth } from '../../components/firebase-config';
import { storage } from '../../components/firebase-config';

const ADMIN_EMAIL = "tcchauhantarun99176@gmail.com"; 

export default function AdminPage() {
    const [user, setUser] = useState<User | null>(null);
    const [authError, setAuthError] = useState('');
    const [isChecking, setIsChecking] = useState(true);

    // Dynamic Categories State
    const [categoriesList, setCategoriesList] = useState<any[]>([]);
    const [newCatName, setNewCatName] = useState('');
    const [newCatIcon, setNewCatIcon] = useState('✨'); // Emoji icon for homepage
    const [newCatDesc, setNewCatDesc] = useState('');

    // Product Form States
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [category, setCategory] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
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
            // Fetch Products
            const unsubCategories = onSnapshot(collection(db, "categories"), (snapshot) => {
    // 🚀 FIXED: TypeScript ko bypass karne ke liye (doc.data() as any) laga diya
    const cats = snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) })); 
    setCategoriesList(cats);
    if (cats.length > 0 && !category) {
        setCategory(cats[0].name); 
    }
});
            return () => { unsubProducts(); unsubCategories(); };
        }
    }, [user, category]);

    const handleGoogleLogin = async () => {
        if (isChecking) return;
        setAuthError('');
        try {
            const provider = new GoogleAuthProvider();
            provider.setCustomParameters({ prompt: 'select_account' }); 
            const result = await signInWithPopup(auth, provider);
            if (result.user.email !== ADMIN_EMAIL) {
                await signOut(auth);
                setAuthError("Access Denied! You are not the owner.");
            }
        } catch (error: any) {
            if (error.code !== 'auth/cancelled-popup-request') {
                setAuthError("Google Login Failed ❌");
            }
        }
    };

    // 🚀 Add New Collection/Category
    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Adding Collection...');
        try {
            await addDoc(collection(db, "categories"), { name: newCatName, icon: newCatIcon, desc: newCatDesc });
            setNewCatName(''); setNewCatDesc(''); setNewCatIcon('✨');
            setStatus('Collection Added! ✅');
            setTimeout(() => setStatus(''), 3000);
        } catch (error) {
            setStatus('Error adding collection ❌');
        }
    };

    const handleDeleteCategory = async (id: string) => {
        if(window.confirm("Are you sure you want to delete this Collection?")) {
            await deleteDoc(doc(db, "categories", id));
        }
    };

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Agar dono hi khali hain toh error do
        if (!imageFile && !imgUrl) {
            setStatus('Please select an image OR enter an image URL! ⚠️');
            return;
        }

        setStatus('Publishing Artifact... ⏳');
        try {
            let finalImageUrl = imgUrl; // Pehle maan lete hain client ne URL daala hai

            // Agar client ne PC/Phone se photo daali hai, toh usko server par upload karo
            if (imageFile) {
                setStatus('Uploading Image to Server... ⏳');
                const imageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
                await uploadBytes(imageRef, imageFile);
                finalImageUrl = await getDownloadURL(imageRef); // Server wala naya link le lo
            }

            setStatus('Saving to Database... ⏳');

            // Database mein entry save karna
            await addDoc(collection(db, "products"), { 
                name, 
                price: Number(price), 
                discount: discount ? Number(discount) : 0,
                category, 
                img: finalImageUrl,
                description,
                features: features.split(',').map((f: string) => f.trim()),
                material
            });

            setStatus('Artifact Added Successfully! ✅');
            
            // Form clear karna
            setName(''); setPrice(''); setDiscount(''); setImgUrl(''); setImageFile(null); setDescription(''); setFeatures('');
            (e.target as HTMLFormElement).reset(); 
            
            setTimeout(() => setStatus(''), 3000);
        } catch (error) {
            console.error(error);
            setStatus('Error adding artifact ❌');
        }
    };

    const handleDeleteProduct = async (id: string) => {
        if(window.confirm("Remove this piece?")) await deleteDoc(doc(db, "products", id));
    };

    if (isChecking) return <div style={{ color: '#d4af37', padding: '100px', textAlign: 'center', background: '#050505', minHeight: '100vh' }}>Loading Secure Portal...</div>;

    if (!user || user.email !== ADMIN_EMAIL) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#050505' }}>
                <div style={{ background: '#111', padding: '40px', borderRadius: '24px', textAlign: 'center', border: '1px solid #333' }}>
                    <h2 style={{ color: '#fff', marginBottom: '20px' }}>Owner Portal</h2>
                    {authError && <p style={{ color: '#ff4d4d', marginBottom: '15px' }}>{authError}</p>}
                    <button onClick={handleGoogleLogin} style={{ padding: '14px 20px', background: '#fff', color: '#000', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer' }}>Sign in with Google</button>
                </div>
            </div>
        );
    }

    return (
        <main style={{ minHeight: '100vh', padding: '60px 20px', background: '#050505', color: '#fff' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #222', paddingBottom: '20px' }}>
                    <h1 style={{ color: '#d4af37' }}>Admin Dashboard</h1>
                    <button onClick={() => signOut(auth)} style={{ background: 'transparent', color: '#ff4d4d', border: '1px solid #ff4d4d', padding: '8px 20px', borderRadius: '25px', cursor: 'pointer' }}>Logout</button>
                </div>

                <div className="admin-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                    
                    {/* Left Column: Forms */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        
                        {/* Manage Collections Form */}
                        <div style={{ background: '#111', padding: '30px', borderRadius: '15px', border: '1px solid #d4af37' }}>
                            <h2 style={{ marginBottom: '20px', color: '#d4af37', fontSize: '1.5rem' }}>1. Manage Collections (Categories)</h2>
                            <form onSubmit={handleAddCategory} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input type="text" placeholder="Icon (Emoji e.g. 🥣)" value={newCatIcon} onChange={(e) => setNewCatIcon(e.target.value)} required style={{...inputStyle, width: '80px', textAlign: 'center'}} />
                                    <input type="text" placeholder="Collection Name (e.g. Premium Bowls)" value={newCatName} onChange={(e) => setNewCatName(e.target.value)} required style={{...inputStyle, flex: 1}} />
                                </div>
                                <input type="text" placeholder="Short Description for Homepage" value={newCatDesc} onChange={(e) => setNewCatDesc(e.target.value)} required style={inputStyle} />
                                <button type="submit" style={{ padding: '12px', background: '#d4af37', color: '#000', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Add Collection</button>
                            </form>

                            {/* List of current categories */}
                            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                {categoriesList.map(cat => (
                                    <div key={cat.id} style={{ background: '#222', padding: '8px 12px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
                                        <span>{cat.icon} {cat.name}</span>
                                        <button onClick={() => handleDeleteCategory(cat.id)} style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontWeight: 'bold' }}>X</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Add Product Form */}
                        <div style={{ background: '#111', padding: '30px', borderRadius: '15px', border: '1px solid #222' }}>
                            <h2 style={{ marginBottom: '20px', color: '#d4af37' }}>2. Add Artifact to Collection</h2>
                            <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
                                
                                <select value={category} onChange={(e) => setCategory(e.target.value)} required style={inputStyle}>
                                    <option value="" disabled>Select Collection...</option>
                                    {categoriesList.map(cat => (
                                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                                    ))}
                                </select>

                                <div style={{ display: 'flex', gap: '15px' }}>
                                    <input type="number" placeholder="Price (₹)" value={price} onChange={(e) => setPrice(e.target.value)} required style={{...inputStyle, flex: 1}} />
                                    <input type="number" placeholder="Discount (%)" value={discount} onChange={(e) => setDiscount(e.target.value)} style={{...inputStyle, flex: 1}} />
                                </div>

                                {/* 🚀 NEW: HYBRID IMAGE UPLOAD BLOCK */}
                                <div style={{ background: '#1a1a1a', padding: '15px', borderRadius: '8px', border: '1px solid #333' }}>
                                    <p style={{ margin: '0 0 10px 0', color: '#888', fontSize: '0.9rem' }}>Product Image (Choose File OR Paste Link)</p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} 
                                            style={{...inputStyle, padding: '10px', background: '#222', cursor: 'pointer'}} 
                                        />
                                        <div style={{ textAlign: 'center', color: '#555', fontSize: '0.8rem', fontWeight: 'bold' }}>OR</div>
                                        <input 
                                            type="text" 
                                            placeholder="Paste Image URL here" 
                                            value={imgUrl} 
                                            onChange={(e) => setImgUrl(e.target.value)} 
                                            style={inputStyle} 
                                        />
                                    </div>
                                </div>

                                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} required style={{...inputStyle, resize: 'none'}} />
                                <input type="text" placeholder="Features (comma separated)" value={features} onChange={(e) => setFeatures(e.target.value)} required style={inputStyle} />
                                <button type="submit" style={{ padding: '15px', background: '#d4af37', color: '#000', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Publish Artifact</button>
                                {status && <p style={{ textAlign: 'center', marginTop: '10px', color: '#d4af37' }}>{status}</p>}
                            </form>
                        </div>

                    </div>

                    {/* Right Column: Live Artifacts */}
                    <div style={{ background: '#111', padding: '30px', borderRadius: '15px', border: '1px solid #222', maxHeight: '1000px', overflowY: 'auto' }}>
                        <h2 style={{ marginBottom: '20px', color: '#d4af37' }}>Live Artifacts ({products.length})</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {products.map(product => (
                                <div key={product.id} style={{ display: 'flex', alignItems: 'center', gap: '15px', background: '#1a1a1a', padding: '15px', borderRadius: '10px' }}>
                                    <img src={product.img || '/placeholder.jpg'} alt={product.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ margin: '0 0 5px 0' }}>{product.name}</h4>
                                        <span style={{ background: '#333', padding: '3px 8px', borderRadius: '5px', fontSize: '0.8rem', color: '#d4af37' }}>{product.category}</span>
                                    </div>
                                    <button onClick={() => handleDeleteProduct(product.id)} style={{ color: '#ff4d4d', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>🗑️</button>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}

const inputStyle = { padding: '14px', background: '#1a1a1a', color: '#fff', border: '1px solid #333', borderRadius: '8px', outline: 'none', width: '100%' };

function unsubProducts() {
    // No-op placeholder for products unsubscribe.
    // Kept to match return signature used in useEffect cleanup.
    return;
}
