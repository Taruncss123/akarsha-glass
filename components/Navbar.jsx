"use client";

import { useState, useEffect } from 'react'; // Ek hi line mein dono import karein
import Link from 'next/link';
import LoginModal from './LoginModal';
import AuthModal from './AuthModal';
import { useCart } from './CartContext';
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Firebase imports
import { auth } from './firebase-config'

export default function Navbar() {  
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false); // Ye LoginModal ke liye hai
    const [isAuthOpen, setIsAuthOpen] = useState(false);  // Ye AuthModal ke liye hai
    const { cart, setIsCartOpen } = useCart();
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const [searchQuery, setSearchQuery] = useState('');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // Agar user logged-in hai, to set ho jayega
        });
        return () => unsubscribe(); // Cleanup function
    }, []);
    const handleLogout = async () => {
        await signOut(auth);
        setUser(null);
        window.location.reload(); // Page refresh kar dein cleanup ke liye
    };

    return (
        <>
            <nav className="glass-nav">
                {/* 1. LEFT BUCKET */}
                <div className="nav-left">
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <div className="logo" style={{ color: '#fff' }}>AKARSHA<span>.</span></div>
                    </Link>
                </div>

                {/* 2. CENTER BUCKET */}
                <div className="nav-center">
                    <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                        <li><Link href="/collections" onClick={toggleMenu}><i className="fa-solid fa-list"></i> Collections</Link></li>
                        <li><Link href="/royal-villas" onClick={toggleMenu}><i className="fa-solid fa-crown"></i> Royal Villas</Link></li>
                        <li><Link href="/collections?cat=Borosilicate Series" onClick={toggleMenu}><i className="fa-solid fa-gem"></i> Borosilicate</Link></li>
                        <li><Link href="/contact" onClick={toggleMenu}><i className="fa-solid fa-envelope"></i> Contact</Link></li>
                    </ul>
                </div>

                {/* 3. RIGHT BUCKET */}
                <div className="nav-right">
                    <button className="search-toggle" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
                <input 
    type="text" 
    className={`search-input ${isSearchOpen ? 'active' : ''}`}
    placeholder="Search artifacts..." 
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    onKeyDown={(e) => { 
        if (e.key === 'Enter') {
            console.log("Searching for:", searchQuery); // Debug karne ke liye
            if (searchQuery.trim()) {
                window.location.href = `/collections?search=${searchQuery}`;
            }
        } 
    }}
/>
                </div>
                <div className="nav-actions">
                    {user ? (
                        <button className="action-btn" onClick={handleLogout}>Logout</button>
    ) : (
        <button className="action-btn" onClick={() => setIsAuthOpen(true)}>
            <i className="fas fa-user"></i>
        </button>
    )}
                      <button className="action-btn" onClick={() => setIsCartOpen(true)}>
        <i className="fa-solid fa-bag-shopping"></i>
        <span className="cart-badge">{totalItems}</span>
    </button>

                        <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                            <span></span><span></span><span></span>
                        </div>
                    </div>
            </nav>

            {/* Modals ko Nav ke bahar rakhein */}
            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
        </>
    );
}