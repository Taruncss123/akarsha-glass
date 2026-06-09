"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useSearchParams } from 'next/navigation';
import { useCart } from '../../components/CartContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CartSidebar from '../../components/CartSidebar';
import Image from 'next/image';

function CollectionContent() {
    const searchParams = useSearchParams();
    const categoryQuery = searchParams.get('cat');
    const [products, setProducts] = useState<any[]>([]);
    // FIX: TypeScript ko batao ki ye 'any' type ka object ya null ho sakta hai
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null); 
    const { addToCart } = useCart();
    const searchParam = searchParams.get('search');

    useEffect(() => {
        const fetchProducts = async () => {
            const querySnapshot = await getDocs(collection(db, "products"));
            let items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[];
            if (categoryQuery) {
                items = items.filter((item: any) => item.category === categoryQuery);
            }

            if (searchParam) {
                items = items.filter(item => 
                    item.name.toLowerCase().includes(searchParam.toLowerCase())
                );
            }
            setProducts(items);
        };
        fetchProducts();
    }, [categoryQuery, searchParam]);

    return (
        <div style={{ paddingTop: '120px', minHeight: '80vh' }}>
            {/* ... (Navbar/Header remain same) ... */}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '40px', maxWidth: '1300px', margin: '0 auto', padding: '0 20px 100px' }}>
                {products.map(product => (
                    <div key={product.id} className="glass-product-card" style={{ paddingBottom: '20px', cursor: 'pointer' }} onClick={() => setSelectedProduct(product)}>
                        <div className="product-img-wrapper" style={{ height: '320px', position: 'relative' }}>
                            {/* FIX: TypeScript error avoid karne ke liye optional chaining use karo */}
                            <Image src={product.img || '/placeholder.jpg'} alt={product.name} layout="fill" objectFit="cover" />
                        </div>
                        {/* ... (Product info remains same) ... */}
                    </div>
                ))}
            </div>

            {/* 🚀 ELITE POPUP WINDOW MODAL */}
            {selectedProduct && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(15px)', zIndex: 2000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }} onClick={() => setSelectedProduct(null)}>
                    <div style={{ background: '#0c0c0c', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '24px', width: '100%', maxWidth: '850px', display: 'flex', flexWrap: 'wrap', overflow: 'hidden', position: 'relative', boxShadow: '0 30px 70px rgba(0,0,0,0.8)' }} onClick={(e) => e.stopPropagation()}>
                        <button style={{ position: 'absolute', top: '15px', right: '20px', background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer', zIndex: 10 }} onClick={() => setSelectedProduct(null)}>&times;</button>
                        
                        <div style={{ flex: '1 1 350px', position: 'relative', minHeight: '400px' }}>
                            {/* FIX: selectedProduct as any cast */}
                            <Image src={(selectedProduct as any).img} alt={(selectedProduct as any).name} layout="fill" objectFit="cover" />
                        </div>

                        <div style={{ flex: '1 2 400px', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <span style={{ color: '#d4af37', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>{(selectedProduct as any).category}</span>
                            <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.2rem', marginTop: '5px', marginBottom: '15px' }}>{(selectedProduct as any).name}</h2>
                            {/* ... (rest of the fields with similar (selectedProduct as any) casting) ... */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default function CollectionsPage() {
    return (
        <main style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', color: '#fff' }}>
            <Navbar />
            <CartSidebar />
            <Suspense fallback={<div style={{ paddingTop: '150px', textAlign: 'center' }}>Loading Collection Portfolio...</div>}>
                <CollectionContent />
            </Suspense>
            <Footer />
        </main>
    );
}