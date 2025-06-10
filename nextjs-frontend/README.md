# Next.js E-commerce Application

This project is a simple e-commerce application built with Next.js. It allows users to view products, add them to a cart, and proceed to checkout. Additionally, customers can view their order history after completing a purchase.

## Features

- **Product Listing**: Users can view a list of available products.
- **Shopping Cart**: Users can add products to their cart, modify quantities, and remove items.
- **Checkout Process**: Users can enter their information and submit orders.
- **Order History**: Customers can view their past orders.

## Project Structure

```
nextjs-frontend
├── src
│   ├── components
│   │   ├── ProductList.tsx      # Displays a list of products
│   │   ├── OrderCart.tsx        # Displays items in the cart
│   │   ├── Checkout.tsx         # Handles the checkout process
│   │   └── OrderHistory.tsx     # Displays customer's order history
│   ├── pages
│   │   ├── index.tsx            # Main entry point for the application
│   │   ├── product
│   │   │   └── index.tsx        # Product page
│   │   └── order
│   │       ├── index.tsx        # Entry point for order-related pages
│   │       ├── cart.tsx         # Cart page
│   │       ├── checkout.tsx      # Checkout page
│   │       └── history.tsx      # Order history page
│   ├── styles
│   │   └── globals.css          # Global CSS styles
│   └── utils
│       └── api.ts               # Utility functions for API calls
├── public
│   └── favicon.ico              # Favicon for the application
├── package.json                 # npm configuration file
├── tsconfig.json                # TypeScript configuration file
└── README.md                    # Project documentation
```

## Getting Started

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd nextjs-frontend
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the application**:
   ```
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000` to view the application.

## Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **PostgreSQL**: Used for database storage.
- **RabbitMQ**: For message queuing and communication between microservices.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.