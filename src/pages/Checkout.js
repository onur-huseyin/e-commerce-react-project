import React, { useState } from 'react';
import styles from './Checkout.module.css';

const Checkout = () => {
    const [step, setStep] = useState(1);

    // Her adımın ilerlemesi için fonksiyonlar
    const nextStep = () => setStep((prevStep) => prevStep + 1);
    const prevStep = () => setStep((prevStep) => prevStep - 1);

    return (
        <div className={styles.checkoutContainer}>
            <h2>Checkout - Adım {step}</h2>
            
            {step === 1 && (
                <div className={styles.step}>
                    <h3>Kişisel Bilgiler</h3>
                    <input type="text" placeholder="İsim" />
                    <input type="text" placeholder="Soyisim" />
                    <input type="email" placeholder="Email" />
                    <button onClick={nextStep}>Devam</button>
                </div>
            )}

            {step === 2 && (
                <div className={styles.step}>
                    <h3>Adres Bilgileri</h3>
                    <input type="text" placeholder="Adres" />
                    <input type="text" placeholder="Şehir" />
                    <input type="text" placeholder="Posta Kodu" />
                    <button onClick={prevStep}>Geri</button>
                    <button onClick={nextStep}>Devam</button>
                </div>
            )}

            {step === 3 && (
                <div className={styles.step}>
                    <h3>Ödeme Bilgileri</h3>
                    <input type="text" placeholder="Kart Numarası" />
                    <input type="text" placeholder="Son Kullanma Tarihi" />
                    <input type="text" placeholder="CVV" />
                    <button onClick={prevStep}>Geri</button>
                    <button onClick={nextStep}>Ödemeyi Tamamla</button>
                </div>
            )}

            {step === 4 && (
                <div className={styles.step}>
                    <h3>Teşekkürler!</h3>
                    <p>Ödemeniz başarıyla tamamlandı.</p>
                    <button onClick={() => setStep(1)}>Alışverişe Geri Dön</button>
                </div>
            )}
        </div>
    );
};

export default Checkout;