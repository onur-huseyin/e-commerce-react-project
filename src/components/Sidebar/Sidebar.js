import React, { useState, useCallback, useMemo } from 'react';
import styles from './Sidebar.module.css';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const Sidebar = React.memo(({ onCategoryChange, onPriceChange, onFilter, onClearFilters }) => {
    const [category, setCategory] = useState('');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [isOpen, setIsOpen] = useState(false); // Sidebar aç/kapa durumu

    // Kategori seçenekleri, statik bir dizi olduğu için useMemo ile sarıyoruz
    const categories = useMemo(() => [
        { name: 'Hepsi', value: '' },
        { name: 'Elektronik', value: 'electronics' },
        { name: 'Takı', value: 'jewelery' },
        { name: 'Erkek Giyim', value: "men's clothing" },
        { name: 'Kadın Giyim', value: "women's clothing" }
    ], []);

    // Kategori değişimlerini yönetmek için useCallback kullanıyoruz
    const handleCategoryChange = useCallback((e) => {
        const selectedCategory = e.value;
        setCategory(selectedCategory);
        onCategoryChange(selectedCategory);
    }, [onCategoryChange]); // `onCategoryChange` değişmedikçe referansı korunur

    // Fiyat değişimlerini yönetmek için useCallback kullanıyoruz
    const handlePriceChange = useCallback((type, value) => {
        const updatedPriceRange = { ...priceRange, [type]: value };
        setPriceRange(updatedPriceRange);
        onPriceChange(type, value);
    }, [priceRange, onPriceChange]); // `priceRange` veya `onPriceChange` değişmedikçe referansı korunur

    // Filtreleme işlemini yönetmek için useCallback kullanıyoruz
    const handleFilterClick = useCallback(() => {
        onFilter();
    }, [onFilter]);

    // Filtreleri temizlemek için useCallback kullanıyoruz
    const handleClearFilters = useCallback(() => {
        setCategory('');
        setPriceRange({ min: 0, max: 1000 });
        onClearFilters();
    }, [onClearFilters]);

    // Sidebar aç/kapa işlevi
    const toggleSidebar = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    return (
        <>
            {/* Aç/Kapa Butonu */}
            <button onClick={toggleSidebar} className={`${styles.toggleButton} ${isOpen ? styles.open : ''}`}>
                <i className={`pi ${isOpen ? 'pi-times' : 'pi-bars'}`} />
            </button>

            <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
                <h2>Filtreler</h2>
                
                {/* Kategori Filtresi */}
                <div className={styles.filterSection}>
                    <h3>Kategori</h3>
                    <Dropdown 
                        value={category} 
                        onChange={handleCategoryChange} 
                        options={categories} 
                        optionLabel="name" 
                        placeholder="Kategori Seçin" 
                        className="w-full md:w-14rem" 
                    />
                </div>
                
                {/* Fiyat Filtresi */}
                <div className={styles.filterSection}>
                    <h3>Fiyat Aralığı</h3>
                    <label>
                        Minimum Fiyat: {priceRange.min}
                        <input 
                            type="range" 
                            min="0" 
                            max="1000" 
                            value={priceRange.min}
                            onChange={(e) => handlePriceChange('min', e.target.value)} 
                        />
                    </label>
                    <label>
                        Maksimum Fiyat: {priceRange.max}
                        <input 
                            type="range" 
                            min="0" 
                            max="1000" 
                            value={priceRange.max}
                            onChange={(e) => handlePriceChange('max', e.target.value)} 
                        />
                    </label>
                </div>

                {/* Filtrele ve Temizle Butonları */}
                <div className={styles.sideButton}>
                    <button className={styles.filterButton} onClick={handleFilterClick}>
                        Filtrele <i className='pi pi-filter'> </i>
                    </button>
                    <button className={styles.clearButton} onClick={handleClearFilters}>
                        Temizle <i className='pi pi-trash'></i>
                    </button>
                </div>
            </div>
        </>
    );
});

export default Sidebar;