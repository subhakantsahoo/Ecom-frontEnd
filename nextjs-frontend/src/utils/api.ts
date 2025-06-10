import axios from 'axios';
import { Product, Order } from '../types';
import { CUSTOMER_SERVICE_URL, PRODUCT_SERVICE_URL } from '../config/microservices';

// Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await axios.get<Product[]>(`${PRODUCT_SERVICE_URL}/products`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

// Create a new product
export const createProduct = async (productData: Omit<Product, 'id'>): Promise<Product> => {
    try {
        const response = await axios.post<Product>(`${PRODUCT_SERVICE_URL}/products`, productData);
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

// Add a product to the cart
export const addToCart = async (productId: string | number): Promise<any> => {
    try {
        const response = await axios.post(`${PRODUCT_SERVICE_URL}/cart`, { productId });
        return response.data;
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
    }
};

// Checkout an order
export const checkoutOrder = async (orderData: { items: any[]; totalAmount: number; totalCount: number }): Promise<any> => {
    try {
        const response = await axios.post(`${CUSTOMER_SERVICE_URL}/checkout`, orderData);
        return response.data;
    } catch (error) {
        console.error('Error during checkout:', error);
        throw error;
    }
};

// Fetch order history for a customer
export const fetchOrderHistory = async (customerId?: string | number): Promise<Order[]> => {
    try {
        const response = await axios.get<Order[]>(`${CUSTOMER_SERVICE_URL}/orders/history`, { params: { customerId } });
        return response.data;
    } catch (error) {
        console.error('Error fetching order history:', error);
        throw error;
    }
};

// Create a new order
export const createOrder = async (orderData: { items: any[]; totalAmount: number; totalCount: number }): Promise<Order> => {
    try {
        const response = await axios.post(`${CUSTOMER_SERVICE_URL}/orders`, orderData);
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};