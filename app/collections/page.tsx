"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { db } from '../../lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../components/CartContext'; // Path apne hisaab se check kar lena

function CollectionContent() {
    const searchParams = useSearchParams();
    const categoryName = searchParams.get('category') || 'All Collections'; 
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            setLoading(true);
            try {
                let q;
                if (categoryName !== 'All Collections') {
                    // Sirf selected category wale items mangwao
                    q = query(collection(db, "products"), where("category", "==", categoryName));
                } else {
                    // Sab kuch mangwao
                    q = collection(db, "products");
                }
                
                const querySnapshot = await getDocs(q);
                let items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProducts(items);
            } catch (error) {
                console.error("Error fetching collections:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryProducts();
    }, [categoryName]);

    return (
        <main style={{ minHeight: '100vh', padding: '120px 20px', background: '#0a0a0a', color: '#fff' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                
                <h1 style={{ fontFamily: 'Playfair Display', fontSize: '3.5rem', color: '#d4af37', marginBottom: '10px' }}>
                    {categoryName}
                </h1>
                <p style={{ color: '#888', marginBottom: '50px' }}>Exquisite masterpieces crafted for royalty.</p>

                {loading ? (
                    <div style={{ color: '#d4af37', fontSize: '1.2rem' }}>Loading Masterpieces...</div>
                ) : products.length === 0 ? (
                    <div style={{ color: '#fff' }}>No masterpieces found in this collection yet.</div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                        {products.map((product) => (
                            <div key={product.id} className="glass-product-card" style={{ paddingBottom: '20px', background: '#111', borderRadius: '15px', overflow: 'hidden' }}>
                                <div style={{ height: '350px', position: 'relative' }}>
                                    <Image src={product.img || '/placeholder.jpg'} alt={product.name} fill style={{ objectFit: 'cover' }} />
                                </div>
                                <div style={{ padding: '20px', textAlign: 'center' }}>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{product.name}</h3>
                                    <p style={{ color: '#d4af37', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '20px' }}>
                                        ₹{product.price.toLocaleString('en-IN')}
                                    </p>
                                    <button 
                                        onClick={() => addToCart(product)} 
                                        style={{ padding: '10px 20px', background: 'transparent', border: '1px solid #d4af37', color: '#d4af37', borderRadius: '25px', cursor: 'pointer', transition: '0.3s' }}
                                        onMouseOver={(e) => { e.currentTarget.style.background = '#d4af37'; e.currentTarget.style.color = '#000'; }}
                                        onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#d4af37'; }}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                <div style={{ marginTop: '50px' }}>
                    <Link href="/" style={{ color: '#888', textDecoration: 'none', borderBottom: '1px solid #888', paddingBottom: '5px' }}>
                        &larr; Back to Home
                    </Link>
                </div>
            </div>
        </main>
    );
}

// Next.js App Router rules require searchParams to be wrapped in Suspense
export default function CollectionsPage() {
    return (
        <Suspense fallback={<div style={{ padding: '100px', textAlign: 'center', color: '#d4af37' }}>Loading Secure Portal...</div>}>
            <CollectionContent />
        </Suspense>
    );
}