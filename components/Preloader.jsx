"use client";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 🚀 FIXED: Animation poori hone ka time diya hai taaki jhatka na lage
        const timer = setTimeout(() => setIsLoading(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    if (!isLoading) return null;

    return (
        <motion.div
            initial={{ y: 0 }}
            animate={{ y: '-100vh' }} // Shutter upar slide hoga
            transition={{ duration: 1, delay: 1.5, ease: [0.76, 0, 0.24, 1] }}
            style={{ 
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', 
                background: '#050505', zIndex: 99999, display: 'flex', 
                justifyContent: 'center', alignItems: 'center', borderBottom: '2px solid #d4af37' 
            }}
        >
            <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                style={{ fontFamily: 'Playfair Display', color: '#d4af37', fontSize: '4rem', letterSpacing: '5px' }}
            >
                AKARSHA<span style={{ color: '#fff' }}>.</span>
            </motion.h1>
        </motion.div>
    );
}