import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard/ProductCard';
import Sidebar from '../components/Sidebar/Sidebar';
import styles from './Home.module.css';
import '../App.css';
import { ProgressSpinner } from 'primereact/progressspinner';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [category, setCategory] = useState('');
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(''); // Ürün adı arama terimi

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            fetch('https://fakestoreapi.com/products')
                .then((res) => res.json())
                .then((data) => {
                    setProducts(data);
                    setFilteredProducts(data);
                    setLoading(false);
                });
        }, 2000);
    }, []);

    const handleCategoryChange = (selectedCategory) => {
        setCategory(selectedCategory);
    };

    const handlePriceChange = (type, value) => {
        setPriceRange((prevRange) => ({
            ...prevRange,
            [type]: value,
        }));
    };

    const handleFilter = () => {
        let updatedProducts = products;

        if (category) {
            updatedProducts = updatedProducts.filter((product) => product.category === category);
        }

        if (priceRange.min) {
            updatedProducts = updatedProducts.filter((product) => product.price >= priceRange.min);
        }
        if (priceRange.max) {
            updatedProducts = updatedProducts.filter((product) => product.price <= priceRange.max);
        }

        if (searchTerm) {
            updatedProducts = updatedProducts.filter((product) =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredProducts(updatedProducts);
    };

    const handleClearFilters = () => {
        setCategory('');
        setPriceRange({ min: '', max: '' });
        setSearchTerm(''); // Arama terimini sıfırlayın
        setFilteredProducts(products);
    };

    // Arama alanı değişimlerini izleyen işlev
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        handleFilter(); // Arama terimine göre filtreleme yap
    };

    const handleAddToCart = (product) => {
        console.log(`${product.title} sepete eklendi`);
    };

    return (
        <div className={styles.container}>
            <Sidebar 
                onCategoryChange={handleCategoryChange} 
                onPriceChange={handlePriceChange} 
                onFilter={handleFilter} 
                onClearFilters={handleClearFilters} 
            />
            
            {/* Arama alanı */}
            <div className={styles.searchContainer} style={{ position: 'relative', marginTop: '.7rem', width: '100%' }}>
                <i className="pi pi-search" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#888' }}></i>
                <input
                    type="text"
                    placeholder="Ürün ara..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                    style={{ width: '100%', paddingLeft: '40px', border:"none", borderRadius:"8px" }} // Simge için padding ayarlandı
                />
            </div>

            <div className={styles.productCards}>
                {loading ? (
                    <div className={styles.spinner}>
                        <ProgressSpinner />
                    </div>
                ) : (
                    filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} onAddToCart={() => handleAddToCart(product)} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;