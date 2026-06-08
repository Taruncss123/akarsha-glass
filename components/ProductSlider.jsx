"use client";
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useCart } from './CartContext';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

export default function ProductSlider() {
    const [featured, setFeatured] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchFeatured = async () => {
            const querySnapshot = await getDocs(collection(db, "products"));
            let items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const shuffledItems = items.sort(() => 0.5 - Math.random());
            setFeatured(shuffledItems.slice(0, 7)); 
        };
        fetchFeatured();
    }, []);

    if (featured.length === 0) return null;

    return (
        <section style={{ padding: '100px 0', background: '#0a0a0a', overflow: 'hidden' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <h2 style={{ fontFamily: 'Playfair Display', fontSize: '3rem', color: '#fff' }}>Featured Masterpieces</h2>
                <div className="divider"></div>
            </div>

            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                loop={false} 
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                coverflowEffect={{
                    rotate: 0, stretch: 0, depth: 250, modifier: 1.2, slideShadows: false, 
                }}
                pagination={{ clickable: true }}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="mySwiper"
                style={{ width: '100%', paddingBottom: '60px' }}
            >
                {featured.map((product) => {
                    // 🚀 FIXED: Discount Calculation
                    const finalPrice = Math.round(product.price - (product.price * (product.discount || 0)) / 100);

                    return (
                        <SwiperSlide key={product.id} style={{ width: '400px' }} className="blur-slide">
                            <div className="glass-product-card" style={{ paddingBottom: '20px' }}>
                                <div className="product-img-wrapper" style={{ height: '400px', position: 'relative' }}>
                                    <Image src={product.img} alt={product.name} layout="fill" objectFit="cover" />
                                    {product.discount > 0 && (
                                        <span style={{ position: 'absolute', top: 15, right: 15, background: '#ff4d4d', color: '#fff', padding: '5px 10px', borderRadius: '5px', fontWeight: 'bold' }}>
                                            {product.discount}% OFF
                                        </span>
                                    )}
                                </div>
                                <div className="product-info" style={{ textAlign: 'center', padding: '25px' }}>
                                    <span className="product-category">{product.category}</span>
                                    <h3 className="product-title" style={{ fontSize: '1.5rem', marginTop: '10px' }}>{product.name}</h3>
                                    
                                    <div style={{ marginBottom: '20px' }}>
                                        {product.discount > 0 ? (
                                            <>
                                                <span style={{ color: '#888', textDecoration: 'line-through', marginRight: '10px' }}>₹{product.price.toLocaleString('en-IN')}</span>
                                                <span style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '1.2rem' }}>₹{finalPrice.toLocaleString('en-IN')}</span>
                                            </>
                                        ) : (
                                            <span style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '1.2rem' }}>₹{product.price.toLocaleString('en-IN')}</span>
                                        )}
                                    </div>

                                    {/* 🚀 FIXED: Cart mein update hui price jayegi */}
                                    <button className="cta-btn" style={{ fontSize: '0.9rem', padding: '12px 25px' }} onClick={() => addToCart({...product, price: finalPrice})}>
                                        + Add to Cart
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </section>
    );
}