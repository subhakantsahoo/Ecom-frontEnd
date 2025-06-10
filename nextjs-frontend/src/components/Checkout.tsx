import React, { useState } from 'react';

type CheckoutProps = {
    onSubmit: () => void;
};

const Checkout: React.FC<CheckoutProps> = ({ onSubmit }) => {
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        email: '',
        address: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomerInfo({ ...customerInfo, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Call API to submit the order
        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customerInfo),
            });
            if (response.ok) {
                // Handle successful order submission
                onSubmit();
            } else {
                // Handle error
                alert('Failed to submit order.');
            }
        } catch (error) {
            console.error('Error submitting order:', error);
            alert('An error occurred while submitting the order.');
        }
    };

    return (
        <div>
            <h2>Checkout</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={customerInfo.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={customerInfo.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Address:
                        <input
                            type="text"
                            name="address"
                            value={customerInfo.address}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Submit Order</button>
            </form>
        </div>
    );
};

export default Checkout;