"use client";
import { useCart } from './CartContext';
import Image from 'next/image';

export default function CartSidebar() {
    const { cart, isCartOpen, setIsCartOpen, removeFromCart, changeQuantity } = useCart();
    // Total price calculate karna
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <>
            <div 
                className={`cart-overlay ${isCartOpen ? 'active' : ''}`} 
                onClick={() => setIsCartOpen(false)}
            ></div>

           <div className={`cart-sidebar ${isCartOpen ? 'active' : ''}`}>
                <div className="cart-header">
                    <h3>Your Cart</h3>
                    <button className="close-cart" onClick={() => setIsCartOpen(false)}>&times;</button>
                </div>

                <div className="cart-items-container">
                    {cart.length === 0 ? (
                        <p style={{ textAlign: 'center', marginTop: '50px', color: '#aaa' }}>Your cart is empty.</p>
                    ) : (
                        cart.map((item, index) => (
                            <div className="cart-item" key={item.id}>
                                
                                {/* 🚀 Image tag ab loop ke andar sahi place par hai */}
                                <div className="cart-item-img">
                                   <Image 
                                      src={item.img} 
                                      alt={item.name} 
                                      width={80} 
                                      height={80} 
                                      style={{ borderRadius: '8px', objectFit: 'cover' }} 
                                   />
                                </div>
                                
                                <div className="cart-item-details">
                                    <h4>{item.name}</h4>
                                    <p className="cart-item-price">₹{item.price.toLocaleString('en-IN')}</p>
                                    <div className="quantity-controls">
                                        <button className="qty-btn" onClick={() => changeQuantity(index, -1)}>-</button>
                                        <span className="qty-num">{item.quantity}</span>
                                        <button className="qty-btn" onClick={() => changeQuantity(index, 1)}>+</button>
                                    </div>
                                </div>
                                <button className="remove-item" onClick={() => removeFromCart(index)}>🗑️</button>
                            </div>
                        ))
                    )}
                </div>

                <div className="cart-footer">
                    <div className="cart-total">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <p className="tax-note">Taxes and shipping calculated at checkout.</p>
                    <button className="checkout-btn">Proceed to Checkout</button>
                </div>
            </div>
        </>
    );
}