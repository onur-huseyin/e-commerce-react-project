import React from 'react';
import { useCart } from '../../context/CartContext';

const Cart = () => {
    const { cart, removeFromCart } = useCart();

    return (
        <div>
            <h2>Sepetiniz</h2>
            {cart.length === 0 ? (
                <p><i className='pi pi-shop'></i></p>
            ) : (
                <ul style={{marginTop:"1rem"}}>
                    {cart.map((item) => (
                        <li key={item.id}>
                            {item.name} - ${item.price}
                            <button onClick={() => removeFromCart(item.id)}>Kaldır</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;