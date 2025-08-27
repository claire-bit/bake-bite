import React from "react";

export default function Home() {
  return (
    <section className="max-w-6xl mx-auto text-center py-20">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to Bakers Site 🍞
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Freshly baked goods delivered right to your doorstep. 
        Explore our delicious treats and order with ease.
      </p>
      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
        Shop Now
      </button>
    </section>
  );
}
