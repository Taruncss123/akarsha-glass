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
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null); // Modal popup handling
    const { addToCart } = useCart();
    const searchParam = searchParams.get('search');

    useEffect(() => {
        const fetchProducts = async () => {
            const querySnapshot = await getDocs(collection(db, "products"));
            let items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            if (categoryQuery) {
                items = items.filter(item => item.category === categoryQuery);
            }

            if (searchParam) {
            items = items.filter(item => 
                item.name.toLowerCase().includes(searchParam.toLowerCase())
            );
        }
            setProducts(items);
        };
        fetchProducts();
    }, [categoryQuery]);

    return (
        <div style={{ paddingTop: '120px', minHeight: '80vh' }}>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <h1 style={{ fontFamily: 'Playfair Display', fontSize: '3.5rem', color: '#d4af37' }}>
                    {categoryQuery ? categoryQuery : 'Complete Collection'}
                </h1>
                <div className="divider" style={{ margin: '20px auto' }}></div>
            </div>

            {/* 🚀 Grid Width Fix: Changed auto-fit to auto-fill so single items don't stretch layout */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '40px', maxWidth: '1300px', margin: '0 auto', padding: '0 20px 100px' }}>
                {products.map(product => (
                    <div 
                        key={product.id} 
                        className="glass-product-card" 
                        style={{ paddingBottom: '20px', cursor: 'pointer' }}
                        onClick={() => setSelectedProduct(product)} // Open popup on click
                    >
                        <div className="product-img-wrapper" style={{ height: '320px', position: 'relative' }}>
                            <Image src={product.img} alt={product.name} layout="fill" objectFit="cover" />
                        </div>
                        <div className="product-info" style={{ textAlign: 'center', padding: '20px' }}>
                            <span className="product-category">{product.category}</span>
                            <h3 className="product-title" style={{ fontSize: '1.3rem', marginTop: '8px' }}>{product.name}</h3>
                            <div style={{ marginTop: '10px' }}>
                                <span style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '1.2rem' }}>₹{product.price.toLocaleString('en-IN')}</span>
                                {product.discount > 0 && <span style={{ color: '#ff4d4d', marginLeft: '10px', fontSize: '0.9rem', textDecoration: 'line-through' }}>{product.discount}% OFF</span>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 🚀 ELITE POPUP WINDOW MODAL */}
            {selectedProduct && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(15px)', zIndex: 2000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }} onClick={() => setSelectedProduct(null)}>
                    <div style={{ background: '#0c0c0c', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '24px', width: '100%', maxWidth: '850px', display: 'flex', flexWrap: 'wrap', overflow: 'hidden', position: 'relative', boxShadow: '0 30px 70px rgba(0,0,0,0.8)' }} onClick={(e) => e.stopPropagation()}>
                        <button style={{ position: 'absolute', top: '15px', right: '20px', background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer', zIndex: 10 }} onClick={() => setSelectedProduct(null)}>&times;</button>
                        
                        {/* Left Side: Product Media */}
                        <div style={{ flex: '1 1 350px', position: 'relative', minHeight: '400px' }}>
                            <Image src={selectedProduct.img} alt={selectedProduct.name} layout="fill" objectFit="cover" />
                        </div>

                        {/* Right Side: Luxury Product Specifications */}
                        <div style={{ flex: '1 2 400px', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <span style={{ color: '#d4af37', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>{selectedProduct.category}</span>
                            <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.2rem', marginTop: '5px', marginBottom: '15px' }}>{selectedProduct.name}</h2>
                            
                            <p style={{ color: '#ccc', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>{selectedProduct.description || 'Bespoke hand-crafted crystal masterpiece meticulously engineered for royal experiences and legacy collections.'}</p>
                            
                            <div style={{ marginBottom: '20px', fontSize: '1.3rem' }}>
                                <span style={{ color: '#fff', fontWeight: 'bold' }}>₹{selectedProduct.price.toLocaleString('en-IN')}</span>
                                {selectedProduct.discount > 0 && <span style={{ color: '#ff4d4d', marginLeft: '12px', fontSize: '0.9rem', background: 'rgba(255,77,77,0.1)', padding: '3px 8px', borderRadius: '5px' }}>{selectedProduct.discount}% Special Privilege</span>}
                            </div>

                            <div style={{ borderTop: '1px solid #222', paddingTop: '15px', marginBottom: '25px' }}>
                                <div style={{ fontSize: '0.9rem', marginBottom: '8px' }}><strong style={{ color: '#d4af37' }}>Material:</strong> {selectedProduct.material || 'Pure Borosilicate Crystal'}</div>
                                <div style={{ fontSize: '0.9rem' }}><strong style={{ color: '#d4af37' }}>Highlights:</strong></div>
                                <ul style={{ paddingLeft: '20px', marginTop: '5px', color: '#aaa', fontSize: '0.85rem' }}>
                                    {selectedProduct.features && Array.isArray(selectedProduct.features) ? selectedProduct.features.map((f, i) => <li key={i} style={{ marginBottom: '4px' }}>{f}</li>) : (
                                        <>
                                            <li>Ultra-pure Refraction Index</li>
                                            <li>Thermal Shock Defying Integrity</li>
                                        </>
                                    )}
                                </ul>
                            </div>

                            <button className="cta-btn" style={{ width: '100%', padding: '14px', borderRadius: '30px' }} onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}>
                                Add to Cart Portfolio
                            </button>
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