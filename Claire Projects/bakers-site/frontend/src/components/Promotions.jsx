// src/components/Promotions.jsx
import React from "react";

export default function Promotions() {
  return (
    <section className="w-full bg-pink-50 py-12">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-pink-600 mb-4">Special Promotions</h2>
        <p className="text-gray-700 mb-6">
          Enjoy our seasonal discounts and sweet deals! Treat yourself or surprise someone special 🍰
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <div className="bg-yellow-400 text-pink-700 px-6 py-4 rounded-lg shadow hover:shadow-lg transition">
            20% off Cakes this Weekend!
          </div>
          <div className="bg-pink-600 text-white px-6 py-4 rounded-lg shadow hover:shadow-lg transition">
            Buy 2 Milkshakes, Get 1 Free!
          </div>
        </div>
      </div>
    </section>
  );
}
