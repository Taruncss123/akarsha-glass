"use client";
import { useCart } from './CartContext';
import Image from 'next/image';

export default function CartSidebar() {
    const { cart, isCartOpen, setIsCartOpen, removeFromCart, changeQuantity } = useCart();
    
    // Total price calculate karna
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <>
            {/* 🚀 Overlay - Background ko blur/dark karega aur click par close karega */}
            <div 
                className={`cart-overlay ${isCartOpen ? 'active' : ''}`} 
                onClick={() => setIsCartOpen(false)}
                style={{
                    position: 'fixed',
                    top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(3px)',
                    zIndex: 9998,
                    opacity: isCartOpen ? 1 : 0,
                    visibility: isCartOpen ? 'visible' : 'hidden',
                    transition: 'all 0.3s ease-in-out'
                }}
            ></div>

            {/* 🚀 Sidebar - Yeh poore page par failne ki jagah sirf Right side mein limit rahega */}
            <div 
                className={`cart-sidebar ${isCartOpen ? 'active' : ''}`}
                style={{
                    position: 'fixed',
                    top: 0,
                    right: isCartOpen ? '0' : '-100%', // Right side se slide hone ka animation
                    width: '400px', // 👈 Yeh width isko poore page par failne se rokegi
                    maxWidth: '100vw', // Mobile screens ke liye perfect fit
                    height: '100vh',
                    backgroundColor: '#050505',
                    borderLeft: '1px solid rgba(212, 175, 55, 0.2)', // Akarsha Glass ki golden theme
                    zIndex: 9999,
                    transition: 'right 0.4s cubic-bezier(0.82, 0.085, 0.395, 0.895)',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '-5px 0 25px rgba(0,0,0,0.8)'
                }}
            >
                {/* Header */}
                <div className="cart-header" style={{ padding: '20px 25px', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ color: '#d4af37', margin: 0, fontSize: '1.5rem', fontFamily: 'Playfair Display' }}>Your Cart</h3>
                    <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer', lineHeight: '1' }}>&times;</button>
                </div>

                {/* Items List - Yeh scrollable area hoga */}
                <div className="cart-items-container" style={{ flex: 1, overflowY: 'auto', padding: '20px 25px' }}>
                    {cart.length === 0 ? (
                        <p style={{ textAlign: 'center', marginTop: '50px', color: '#888', fontStyle: 'italic' }}>Your cart is beautifully empty.</p>
                    ) : (
                        cart.map((item, index) => (
                            <div className="cart-item" key={item.id} style={{ display: 'flex', gap: '15px', marginBottom: '20px', background: '#111', padding: '15px', borderRadius: '12px', alignItems: 'center' }}>
                                
                                <div className="cart-item-img" style={{ position: 'relative', width: '70px', height: '70px', flexShrink: 0 }}>
                                   <Image 
                                      src={item.img || '/placeholder.jpg'} 
                                      alt={item.name} 
                                      fill
                                      style={{ borderRadius: '8px', objectFit: 'cover' }} 
                                      sizes="70px"
                                   />
                                </div>
                                
                                <div className="cart-item-details" style={{ flex: 1 }}>
                                    <h4 style={{ margin: '0 0 5px 0', color: '#fff', fontSize: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>{item.name}</h4>
                                    <p className="cart-item-price" style={{ margin: '0 0 10px 0', color: '#d4af37', fontWeight: 'bold' }}>₹{item.price.toLocaleString('en-IN')}</p>
                                    <div className="quantity-controls" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <button onClick={() => changeQuantity(index, -1)} style={qtyBtnStyle}>-</button>
                                        <span style={{ color: '#fff', fontSize: '0.9rem', width: '15px', textAlign: 'center' }}>{item.quantity}</span>
                                        <button onClick={() => changeQuantity(index, 1)} style={qtyBtnStyle}>+</button>
                                    </div>
                                </div>
                                
                                <button className="remove-item" onClick={() => removeFromCart(index)} style={{ background: 'rgba(255, 77, 77, 0.1)', border: '1px solid rgba(255, 77, 77, 0.3)', color: '#ff4d4d', cursor: 'pointer', fontSize: '1.2rem', padding: '8px 10px', borderRadius: '8px', transition: '0.2s' }}>🗑️</button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer / Checkout */}
                <div className="cart-footer" style={{ padding: '25px', borderTop: '1px solid #222', background: '#0a0a0a' }}>
                    <div className="cart-total" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}>
                        <span>Subtotal</span>
                        <span style={{ color: '#d4af37' }}>₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <p className="tax-note" style={{ color: '#888', fontSize: '0.85rem', textAlign: 'center', marginBottom: '20px' }}>Taxes and shipping calculated at checkout.</p>
                    <button className="checkout-btn" style={{ width: '100%', padding: '16px', background: '#d4af37', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', transition: '0.3s' }}>
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </>
    );
}

// Chhoti buttons ki styling
const qtyBtnStyle = { 
    background: '#222', 
    color: '#fff', 
    border: '1px solid #333', 
    width: '28px', 
    height: '28px', 
    borderRadius: '6px', 
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem'
};