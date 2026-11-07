import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ProductCard({ product, onAddToCart }) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition transform hover:scale-105"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold text-pink-600 mb-2">
        {product.name}
      </h3>
      <p className="text-yellow-600 font-semibold mb-2">
        Ksh {product.price}
      </p>
      {product.badge && (
        <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full mb-2 inline-block">
          {product.badge}
        </span>
      )}

      {/* View Details button */}
      <Link
        to={`/products/${product.id}`}
        className="bg-pink-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-pink-500 transition inline-block mt-2"
      >
        View Details
      </Link>

      {/* Add to Cart button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onAddToCart?.();
        }}
        className="bg-yellow-400 text-pink-700 font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300 transition mt-2 ml-2"
      >
        Add to Cart
      </button>
    </motion.div>
  );
}
