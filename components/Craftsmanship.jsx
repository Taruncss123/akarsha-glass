"use client"; // Animation ke liye zaroori hai
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Craftsmanship() {
    return (
        <section className="craftsmanship-section" id="craftsmanship">
            <div className="craft-container">
                {/* Image Wrapper */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="craft-image-wrapper"
                >
                    {/* Yahan aap apni real image ka path daal sakte hain */}
                </motion.div>

                {/* Content Card */}
                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="craft-content glass-craft-card"
                >
                    <span className="subtitle">The Akarsha Legacy</span>
                    <h2>Bespoke Elegance for Royal Villas</h2>
                    <p>Every artifact at Akarsha Glass is born from a blend of traditional artistry and modern precision. We partner with elite 5-star hotels and luxury estates to create custom glass experiences that redefine dining and decor.</p>
                    
                    <ul className="craft-features">
                        <li><span className="check-icon">✓</span> Custom Dimensions & Designs</li>
                        <li><span className="check-icon">✓</span> Premium Borosilicate Strength</li>
                        <li><span className="check-icon">✓</span> Bulk Orders for Hospitality</li>
                    </ul>
                    
                    <Link href="/contact" className="cta-btn b2b-btn">
                        Inquire for Custom Orders
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}