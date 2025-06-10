import React from 'react';
import Link from 'next/link';

const OrderIndex = () => {
    return (
        <div>
            <h1>Order Management</h1>
            <ul>
                <li>
                    <Link href="/order/cart">View Cart</Link>
                </li>
                <li>
                    <Link href="/order/checkout">Checkout</Link>
                </li>
                <li>
                    <Link href="/order/history">Order History</Link>
                </li>
            </ul>
        </div>
    );
};

export default OrderIndex;