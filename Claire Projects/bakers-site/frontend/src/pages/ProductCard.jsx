// src/components/ProductCard.jsx
import React from "react";
import { motion } from "framer-motion";

export default function ProductCard({ product, onAddToCart, onClick }) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition transform hover:scale-105 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={onClick} // opens modal
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold text-pink-600 mb-2">{product.name}</h3>
      <p className="text-yellow-600 font-semibold mb-2">Ksh {product.price}</p>
      {product.badge && (
        <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full mb-2 inline-block">
          {product.badge}
        </span>
      )}
      <button
        onClick={(e) => {
          e.stopPropagation(); // prevent modal open when clicking button
          onAddToCart();
        }}
        className="bg-yellow-400 text-pink-700 font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300 transition mt-2"
      >
        Add to Cart
      </button>
    </motion.div>
  );
}
