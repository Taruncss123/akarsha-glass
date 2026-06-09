"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from './CartContext';
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Firebase imports
import { auth } from './firebase-config'
import AuthModal from './AuthModal';
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cart, setIsCartOpen } = useCart();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const [searchQuery, setSearchQuery] = useState('');
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

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

        <div className="nav-actions">
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

          <div className="nav-right">
            {user ? (
              <button className="action-btn" onClick={handleLogout} title="Logout">
                <i className="fas fa-sign-out-alt"></i>
              </button>
            ) : (
              <button className="action-btn" onClick={() => setIsAuthModalOpen(true)} title="Login/Signup">
                <i className="fas fa-user"></i>
              </button>
            )}
            <button className="action-btn" onClick={() => setIsCartOpen(true)} title="View Cart">
              <i className="fa-solid fa-bag-shopping"></i>
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </button>
            <AuthModal 
              isOpen={isAuthModalOpen} 
              onClose={() => setIsAuthModalOpen(false)} 
            />
          </div>

          <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <span></span><span></span><span></span>
          </div>
        </div>
      </nav>
    </>
  );
}