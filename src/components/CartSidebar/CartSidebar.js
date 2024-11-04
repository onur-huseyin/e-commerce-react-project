import React, { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../../context/CartContext';
import styles from './CartSidebar.module.css';
import { Drawer } from 'vaul';
import { Steps } from 'primereact/steps';

const Sidebar = styled.div`
    position: fixed;
    right: 0;
    overflow-y: scroll;
    top: 0;
    height: 100%;
    width: 300px;
    background-color: #fff;
    padding: 20px;
    transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
    transition: transform 0.3s ease, z-index 0.3s ease;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    z-index: ${({ isDrawerOpen }) => (isDrawerOpen ? 0 : 998)}; /* z-index'i Drawer durumuna göre ayarlıyoruz */
`;

const CartItem = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const truncateTitle = (title) => {
    return title.length > 15 ? `${title.slice(0, 15)}...` : title;
};

const CartSidebar = ({ isOpen, onClose }) => {
    const { cart, removeFromCart } = useCart();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Drawer açılma durumunu kontrol ediyoruz
    const items = [
        {
            label: 'Adres ve bilgiler'
        },
        {
            label: 'Kart Bilgileri'
        },
        {
            label: 'Siparişi oluştur'
        }
    ];
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    return (
        <>
            <Sidebar isOpen={isOpen} isDrawerOpen={isDrawerOpen}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h2>Sepetiniz</h2>
                    <button className={styles.BoxClose} onClick={onClose}>
                        <i className='pi pi-times'></i>
                    </button>
                </div>
                {cart.length === 0 ? (
                    <div className={styles.EmptyBox}>
                        <i className='pi pi-box'></i>
                        <p>Sepetiniz boş!</p>
                    </div>
                ) : (
                    cart.map((item) => (
                        <CartItem style={{ marginTop: "2rem", alignItems: "center" }} key={item.id}>
                            <span style={{ fontSize: "12px", fontWeight: "500" }}>{truncateTitle(item.title)}</span>
                            <span style={{ fontWeight: "bold" }}>${item.price}</span>
                            <button className={styles.removeBut} onClick={() => removeFromCart(item.id)}>
                                <i className='pi pi-trash'></i>
                            </button>
                        </CartItem>
                    ))
                )}

                {cart.length > 0 && (
                    <div className={styles.TotalPrice}>
                        <h3>Toplam Tutar: ${totalPrice.toFixed(2)}</h3>

                        {/* Drawer Bileşeni */}
                        <Drawer.Root open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                            {/* Drawer Trigger Butonu */}
                            <Drawer.Trigger asChild>
                                <button className={styles.checkoutLink}>
                                    Ödemeye geç
                                    <i className='pi pi-money-bill'></i>
                                </button>
                            </Drawer.Trigger>
                            
                            {/* Drawer İçeriği */}
                            <Drawer.Portal>
                                <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                                <Drawer.Content className="bg-white flex flex-col fixed bottom-0 left-0 right-0 max-h-[82vh] rounded-t-[10px]">
                                    <div className="max-w-md w-full mx-auto overflow-auto p-4 rounded-t-[10px]">
                                        <Drawer.Handle />
                                        <Drawer.Title className="font-medium text-gray-900 mt-8">Ödeme İşlemi</Drawer.Title>
                                        <Drawer.Description className="leading-6 mt-2 text-gray-600">
                                            Sepetinizdeki ürünleri ve toplam fiyatı kontrol edin.
                                        </Drawer.Description>
                                        {/* Sepet Öğeleri */}
                                        <div className="mt-4 overflow-scroll">
                                        {cart.length === 0 ? (
                                            <div className={styles.EmptyBox}>
                                                <i className='pi pi-box'></i>
                                                <p>Sepetiniz boş!</p>
                                            </div>
                                        ) : (
                                                cart.map((item) => (
                                                    <CartItem style={{ marginTop: "2rem", alignItems: "center", justifyContent:"flex-start", gap:"2rem", borderBottom:"1px solid #ECEFF3", paddingBottom:".7rem" }} key={item.id}>
                                                        <span style={{ fontSize: "12px", fontWeight: "500" }}>{truncateTitle(item.title)}</span>
                                                        <span style={{ fontWeight: "bold" }}>${item.price}</span>
                                                        <button className={styles.removeBut} onClick={() => removeFromCart(item.id)}>
                                                            <i className='pi pi-trash'></i>
                                                        </button>
                                                    </CartItem>
                                                ))
                                            )}
                                        </div>
                                        {/* Toplam Tutar */}
                                        <div className="flex justify-between align-items-center  mt-6 font-medium text-lg">
                                            <span>Toplam Tutar:</span>
                                            <span className='font-bold ml-2 text-2xl text-green-500'>${totalPrice.toFixed(2)}</span>
                                        </div>
                                        <div className="card mt-6">
                                            <Steps model={items} />
                                        </div>
                                        <label htmlFor="name" className="font-medium text-gray-900 text-sm mt-4 my-2 block">
                                        İsim Soyisim
                                        </label>
                                        <input
                                            id="name"
                                            className="border border-gray-300 bg-white w-full px-3 h-9 rounded-lg outline-none focus:ring-2 focus:ring-black/5 text-gray-900"
                                        />
                                        <label htmlFor="card-number" className="font-medium text-gray-900 text-sm my-2 block">
                                            Telefon numarası
                                        </label>
                                        <input
                                            id="card-number"
                                            className="border border-gray-300 bg-white w-full px-3 h-9 rounded-lg outline-none focus:ring-2 focus:ring-black/5 text-gray-900"
                                        />
                                         <label htmlFor="card-number" className="font-medium text-gray-900 text-sm my-2 block">
                                            Açık adres
                                        </label>
                                        <input
                                            id="card-number"
                                            className="border border-gray-300 bg-white w-full px-3 h-9 rounded-lg outline-none focus:ring-2 focus:ring-black/5 text-gray-900"
                                        />
                                        <button className="h-[44px] bg-black text-gray-50 rounded-lg mt-4 w-full font-medium">
                                            Ödemeye geç
                                        </button>
                                    </div>
                                </Drawer.Content>
                            </Drawer.Portal>
                        </Drawer.Root>
                    </div>
                )}
            </Sidebar>
        </>
    );
};

export default CartSidebar;