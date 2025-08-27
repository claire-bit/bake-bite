// src/pages/ProductDetail.jsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext"; // 👈 import

export default function ProductDetail() {
  const { addToCart } = useCart(); // 👈 use global cart
  const [quantity, setQuantity] = useState(1);

  // Dummy product (later you’ll fetch by ID from backend)
  const product = {
    id: 1,
    name: "Chocolate Cake",
    price: 1200,
    description:
      "Delicious rich chocolate cake layered with smooth frosting. Perfect for birthdays, weddings, or just a sweet treat.",
    images: ["/assets/cake.jpg", "/assets/cake2.jpg"],
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Images */}
        <div>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full rounded-xl shadow-lg mb-4"
          />
          <div className="flex gap-4">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="thumb"
                className="w-24 h-24 object-cover rounded-lg border hover:scale-105 transition"
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <h1 className="text-4xl font-bold text-pink-600 mb-4">
            {product.name}
          </h1>
          <p className="text-xl text-yellow-600 font-semibold mb-6">
            Ksh {product.price}
          </p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <label className="font-medium">Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 border rounded-lg p-2 text-center"
            />
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="bg-yellow-400 text-pink-700 font-semibold px-6 py-3 rounded-lg hover:bg-yellow-300 transition"
          >
            Add to Cart
          </button>

          {/* Reviews */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Customer Reviews
            </h2>
            <div className="space-y-4">
              <div className="border p-4 rounded-lg">
                <p className="text-gray-700">
                  ⭐⭐⭐⭐⭐ “Absolutely delicious! The best chocolate cake I’ve ever had.”
                </p>
                <span className="text-sm text-gray-500">– Jane</span>
              </div>
              <div className="border p-4 rounded-lg">
                <p className="text-gray-700">
                  ⭐⭐⭐⭐ “Very tasty and moist, but a bit too sweet for me.”
                </p>
                <span className="text-sm text-gray-500">– Mark</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
