import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { Toaster } from 'sonner';
import CartSidebar from './components/CartSidebar/CartSidebar';
import Checkout from './pages/Checkout.js';
import { useCart } from './context/CartContext';
import './App.css';
import 'primeicons/primeicons.css';

function App() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { cart } = useCart();

    const handleAddToCart = () => {
        // Eğer sepet boşsa (yani, ilk ürün ekleniyorsa) sepet panelini aç
        if (cart.length === 0) {
            setIsCartOpen(true);
        }
    };

    const toggleCart = () => {
        setIsCartOpen((prev) => !prev);
    };

    return (
        <Router>
            <div>
            <Toaster richColors  />
                <button className='boxButton' onClick={toggleCart}>
                    <i className='pi pi-shopping-bag'></i>
                </button>
                <CartSidebar isOpen={isCartOpen} onClose={toggleCart} />

                {/* Route tanımlamaları */}
                <Routes>
                    <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
                    <Route path="/checkout" element={<Checkout />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;