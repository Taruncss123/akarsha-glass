"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('akarsha_cart')) || [];
        setCart(savedCart);
    }, []);

    useEffect(() => {
        localStorage.setItem('akarsha_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item => 
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true); 
    };

    const removeFromCart = (index) => {
        setCart(prevCart => prevCart.filter((_, i) => i !== index));
    };

    // 🚀 FIXED: "1 se 3" hone wala glitch yahan theek kiya hai
    const changeQuantity = (index, amount) => {
        setCart(prevCart => {
            const newCart = [...prevCart];
            // Naya object banakar update kiya taaki React double render na kare
            newCart[index] = { ...newCart[index], quantity: newCart[index].quantity + amount };
            
            if (newCart[index].quantity <= 0) {
                return newCart.filter((_, i) => i !== index); 
            }
            return newCart;
        });
    };

    return (
        <CartContext.Provider value={{ 
            cart, addToCart, removeFromCart, changeQuantity, 
            isCartOpen, setIsCartOpen 
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}