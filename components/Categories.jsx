"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Categories() {
    // Data mapping clean rakhi hai
    const cardData = [
        { icon: "🥗", title: "Premium Bowls", desc: "Handcrafted clarity for elite 5-star dining experiences." },
        { icon: "🏺", title: "Luxury Jugs", desc: "Elegant and flawless pours designed for royal villas." },
        { icon: "💎", title: "Borosilicate Series", desc: "High-endurance, crystal-clear artifacts." }
    ];

    return (
        <section className="categories-section" id="collections">
            {/* Header Animation */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8 }} 
                className="section-header"
            >
                <h2>Signature Collections</h2>
                <div className="divider"></div>
            </motion.div>
            
            {/* Grid */}
            <div className="category-grid">
                {cardData.map((item, index) => (
                    <motion.div 
                        key={index} 
                        whileHover={{ scale: 1.05 }} 
                        className="glass-category-card"
                    >
                        <div className="card-icon">{item.icon}</div>
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                        
                        {/* 🚀 Dynamic Route Fix: Cat parameter pass ho raha hai */}
                        <Link href={`/collections?cat=${item.title}`} className="explore-link">
                            View Collection <span>&rarr;</span>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}