// src/pages/Cart.jsx
import React from "react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h1 className="text-3xl font-bold text-pink-600 mb-4">Your Cart</h1>
        <p className="text-gray-600">Your cart is empty 🛒</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-pink-600 mb-8">Your Cart</h1>

      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-4"
          >
            {/* Product Info */}
            <div className="flex items-center gap-4">
              <img
                src={item.images[0]}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg shadow"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-yellow-600 font-medium">
                  Ksh {item.price}
                </p>
              </div>
            </div>

            {/* Quantity Control */}
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.id, Number(e.target.value))
                }
                className="w-16 border rounded-lg p-2 text-center"
              />
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 font-semibold hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-10 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Total: Ksh {total}</h2>
        <button className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-500 transition">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
