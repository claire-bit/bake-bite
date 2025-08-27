// src/components/ProductModal.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductModal({ isOpen, onClose, product, onAddToCart }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl p-6 max-w-lg w-full"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-semibold text-pink-600 mb-2">{product.name}</h3>
            <p className="text-yellow-600 font-semibold mb-2">Ksh {product.price}</p>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <button
              onClick={onAddToCart}
              className="bg-yellow-400 text-pink-700 font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={onClose}
              className="mt-4 text-pink-600 hover:underline"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
