import React, { useEffect, useState } from "react";
import { Product } from "../types";
import { fetchProducts as fetchProductsAPI, createProduct } from "../utils/api";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/router";

const defaultImageUrl = "https://via.placeholder.com/150";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  const [newProduct, setNewProduct] = useState<Product>({
    id: Date.now(),
    name: "",
    description: "",
    price: 0,
    stock: "",
  });

  const { addToCart, cartItems } = useCart();
  const router = useRouter();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setModalProduct(product);
    setTimeout(() => setModalProduct(null), 1200); // Auto-close after 1.2s
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data: Product[] = await fetchProductsAPI();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const openModal = () => {
    setNewProduct({
      id: Date.now(),
      name: "",
      description: "",
      price: 0,
      imageUrl: "",
      stock: "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || newProduct.price <= 0) {
      alert("Please enter a valid product name and price.");
      return;
    }
    try {
      const createdProduct = await createProduct({
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        // imageUrl: newProduct.imageUrl,
        stock: newProduct.stock,
      });
      setProducts((prev) => [...prev, createdProduct]);
      closeModal();
    } catch (error) {
      alert("Failed to add product. Please try again.");
      console.error("Error adding product:", error);
    }
  };

  const handleOrderClick = () => {
    router.push("/order/cart");
  };

  return (
    <div>
      <h1>Product List</h1>
      <button
        onClick={openModal}
        style={{
          marginBottom: "16px",
          padding: "8px 16px",
          backgroundColor: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Add Product
      </button>
      {cartItems.length > 0 && (
        <button
          onClick={handleOrderClick}
          style={{
            marginBottom: "16px",
            marginLeft: "16px",
            padding: "8px 16px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Order ({cartItems.length})
        </button>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              width: "200px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#fff",
            }}
          >
            <img
              src={product.imageUrl || defaultImageUrl}
              alt={product.name}
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "4px",
                marginBottom: "12px",
              }}
            />
            <h2
              style={{
                fontSize: "1.2rem",
                margin: "0 0 8px 0",
                textAlign: "center",
              }}
            >
              {product.name}
            </h2>
            <p
              style={{
                fontSize: "0.9rem",
                color: "#666",
                textAlign: "center",
                margin: "0 0 8px 0",
              }}
            >
              {product.description || "No description available."}
            </p>
            <p style={{ fontWeight: "bold", margin: "0 0 12px 0" }}>
              Price: {product.price}
            </p>
            <button
              onClick={() => handleAddToCart(product)}
              style={{
                padding: "8px 12px",
                backgroundColor: "#0070f3",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      {modalProduct && (
        <div
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            background: "#0070f3",
            color: "#fff",
            padding: "16px 24px",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            zIndex: 2000,
          }}
        >
          Added <b>{modalProduct.name}</b> to cart!
        </div>
      )}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "24px",
              borderRadius: "8px",
              width: "400px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            <h2>Add New Product</h2>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                style={{ width: "100%", marginBottom: "12px" }}
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                style={{ width: "100%", marginBottom: "12px" }}
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                style={{ width: "100%", marginBottom: "12px" }}
              />
            </label>
            <label>
              Stock:
              <input
                type="text"
                name="stock"
                value={newProduct.stock}
                onChange={handleInputChange}
                style={{ width: "100%", marginBottom: "12px" }}
              />
            </label>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "8px",
              }}
            >
              <button
                onClick={closeModal}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#ccc",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddProduct}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#0070f3",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
