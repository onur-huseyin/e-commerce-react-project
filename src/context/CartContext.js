import React, { createContext, useContext, useState, useEffect } from 'react';

// Sepet Context'i
const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // İlk başta sessionStorage'dan veriyi yükle
    const initialCart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const [cart, setCart] = useState(initialCart);

    // Sepete ürün ekleme
    const addToCart = (product) => {
        const updatedCart = [...cart, product];
        setCart(updatedCart);
        sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // Sepetten ürün çıkarma
    const removeFromCart = (productId) => {
        const updatedCart = cart.filter((item) => item.id !== productId);
        setCart(updatedCart);
        sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // Sayfa yüklendiğinde sessionStorage'dan sepeti yükle
    useEffect(() => {
        const storedCart = JSON.parse(sessionStorage.getItem('cart'));
        if (storedCart) {
            setCart(storedCart);
        }
    }, []);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

// useCart Hook'u
export const useCart = () => {
    return useContext(CartContext);
};