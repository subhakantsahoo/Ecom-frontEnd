import React, { ChangeEvent } from "react";
import { useCart } from "../context/CartContext";
import { checkoutOrder, createOrder } from "../utils/api";
import { useRouter } from "next/router";

const OrderCart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const router = useRouter();

  // Calculate total amount and total count
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const totalCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const handleCheckout = async () => {
    try {
      const orderData = cartItems.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      }));
      await checkoutOrder({ items: orderData, totalAmount, totalCount });
      alert("Checkout successful!");
      clearCart();
      router.push("/"); // Navigate to homepage after checkout
    } catch (error) {
      alert("Checkout failed. Please try again.");
      console.error("Checkout error:", error);
    }
  };

  const handleOrderConfirm = async () => {
    try {
      const orderData = cartItems.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      }));
      await createOrder({ items: orderData, totalAmount, totalCount });
      alert("Order confirmed successfully!");
      clearCart();
      router.push("/"); // Navigate to homepage after order confirmation
    } catch (error) {
      alert("Order confirmation failed. Please try again.");
      console.error("Order confirmation error:", error);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem" }}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li
                key={item.product.id}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 5,
                }}
              >
                {item.product.name}
                <input
                  type="number"
                  value={item.quantity}
                  min={1}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateQuantity(item.product.id, parseInt(e.target.value) || 1)
                  }
                  style={{ width: "50px", marginLeft: 10 }}
                />
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 10,
                  }}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          <p>
            <strong>Total Amount: </strong>${totalAmount.toFixed(2)}
          </p>
        </>
      )}
      <button onClick={handleCheckout} style={{ marginRight: 10 }}>
        Checkout
      </button>
      <button onClick={handleOrderConfirm}>Order Confirm</button>
    </div>
  );
};

export default OrderCart;
