"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '../lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export default function Categories() {
    const [categories, setCategories] = useState([]);

    // Firebase se dynamic categories fetch karna
    useEffect(() => {
        const unsub = onSnapshot(collection(db, "categories"), (snapshot) => {
            const cats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCategories(cats);
        });
        return () => unsub();
    }, []);

    return (
        <section style={{ padding: '100px 20px', background: '#0a0a0a' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h2 style={{ fontFamily: 'Playfair Display', fontSize: '3rem', color: '#fff' }}>Signature Collections</h2>
                    <div style={{ width: '80px', height: '3px', background: '#d4af37', margin: '20px auto 0' }}></div>
                </div>

                {categories.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#888' }}>Loading collections...</p>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                        {categories.map((cat) => (
                            <div key={cat.id} style={{ background: '#111', padding: '40px 30px', borderRadius: '15px', textAlign: 'center', border: '1px solid #222', transition: 'transform 0.3s', cursor: 'pointer' }}
                                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>{cat.icon}</div>
                                <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '15px' }}>{cat.name}</h3>
                                <p style={{ color: '#888', marginBottom: '30px', lineHeight: '1.6' }}>{cat.desc}</p>
                                
                                {/* 🚀 FIXED: Dynamic Link */}
                                <Link 
                                    href={`/collections?category=${cat.name}`} 
                                    style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 'bold', letterSpacing: '1px', fontSize: '0.9rem' }}
                                >
                                    VIEW COLLECTION &rarr;
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
                
            </div>
        </section>
    );
}