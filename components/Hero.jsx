"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // 🚀 Ab hum aapki actual local images use kar rahe hain jo public/IMGs me hain
    const slides = [
        '/IMGs/hero-1.jpg',
        '/IMGs/hero-2.jpg',
        '/IMGs/hero-3.jpg'
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <section className="hero">
            <div className="hero-bg-slider">
                {slides.map((imgUrl, index) => (
                    <div 
                        key={index}
                        className={`bg-slide ${index === currentSlide ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${imgUrl})` }}
                    ></div>
                ))}
            </div>

            <div className="hero-content glass-card">
                <h1>Masterpieces in Glass</h1>
                <p>Elevating 5-Star Dining & Royal Villas with Exquisite Glass Artifacts, Bowls, and Jugs.</p>
                <Link href="#collections" className="cta-btn">
                    Explore 90+ Artifacts
                </Link>
            </div>
        </section>
    );
}