import React from 'react';
import ProductList from 'components/ProductList';

const HomePage: React.FC = () => {
    return (
        <main style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
            <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1>Welcome to the Product Store</h1>
                <h4>Browse our selection of quality products and add them to your cart.</h4>
            </header>
            <section>
                <ProductList />
            </section>
        </main>
    );
};

export default HomePage;