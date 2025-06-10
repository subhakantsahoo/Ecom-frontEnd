import React, { useEffect, useState } from 'react';
import OrderHistory from '../../components/OrderHistory';
import { fetchOrderHistory } from '../../utils/api';

const OrderHistoryPage = () => {
    const [orders, setOrders] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getOrderHistory = async () => {
            try {
                const data = await fetchOrderHistory();
                setOrders(data);
            } catch (err:any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getOrderHistory();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Order History</h1>
            <OrderHistory orders={orders} />
        </div>
    );
};

export default OrderHistoryPage;