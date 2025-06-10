import React, { useState } from 'react';
import Checkout from '../../components/Checkout';

const CheckoutPage = () => {
    const [orderSubmitted, setOrderSubmitted] = useState(false);

   const handleOrderSubmit = () => {
    setOrderSubmitted(true);
};

return (
    <div>
        <h1>Checkout</h1>
        {!orderSubmitted ? (
            <Checkout onSubmit={handleOrderSubmit} />
        ) : (
            <h2>Thank you for your order!</h2>
        )}
    </div>
);
};

export default CheckoutPage;