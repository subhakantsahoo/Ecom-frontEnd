import React from 'react';
import { Order } from '../types';

type OrderHistoryProps = {
    orders: Order[];
};

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => (
    <div>
        <h2>Order History</h2>
        {orders.length === 0 ? (
            <p>No orders found.</p>
        ) : (
            <ul>
                {orders.map((order) => (
                    <li key={order.id}>
                        <h3>Order ID: {order.id}</h3>
                        <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                        <p>Total: ${order.total}</p>
                        <h4>Items:</h4>
                        <ul>
                            {order.items.map((item) => (
                                <li key={item.productId}>
                                    {item.productName} - Quantity: {item.quantity}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        )}
    </div>
);

export default OrderHistory;