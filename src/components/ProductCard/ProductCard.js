import React from 'react';
import { AddToCartButton } from './ProductCard.styles';
import { useCart } from '../../context/CartContext';
import styles from './ProductCard.module.css';
import { Rating } from 'primereact/rating';
import { toast } from 'sonner';

const ProductCard = ({ product, onAddToCart }) => {
    const { cart, addToCart, removeFromCart } = useCart();
    const isInCart = cart.some((item) => item.id === product.id);
    const handleAddToCart = () => {
        if (!isInCart) {
            addToCart(product);
            onAddToCart();
            toast.success('Ürün sepete eklendi', {
                duration: 5000, 
                position:'top-center' 
            });
        } else {
            removeFromCart(product.id);
            toast.error('Ürün sepetten kaldırıldı', {
                duration: 5000,
                position:'top-center' 
            });
        }
    };
    const truncateTitle = (title) => {
        return title.length > 20 ? `${title.slice(0, 30)}...` : title;
    };
    return (
        <div className={styles.Card}>
            <img className={styles.CardImg}
                src={product.image} 
                alt={product.name} 
                loading="lazy"
            />
            <div className={styles.rating}>
                <Rating value={product.rating.rate} readOnly stars={5} cancel={false} />
                <span>({product.rating.count})</span>
            </div>
            <div className={styles.productInfo}>
                <h3>{truncateTitle(product.title)}</h3>
                <span className={styles.CardPrice}>${product.price}</span>
                <AddToCartButton onClick={handleAddToCart} isInCart={isInCart}>
                    {isInCart ? 'Sepetten Kaldır' : 'Sepete Ekle'}
                </AddToCartButton>
            </div>
        </div>
    );
};
export default ProductCard;