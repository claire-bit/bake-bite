// src/components/FeaturedProducts.jsx
import React from "react";
import sampleImage from "../assets/bake n bite.jpg"; // placeholder

const products = [
  { name: "Chocolate Cake", price: "$12", img: sampleImage },
  { name: "Vanilla Doughnut", price: "$3", img: sampleImage },
  { name: "Strawberry Milkshake", price: "$5", img: sampleImage },
  { name: "French Fries", price: "$4", img: sampleImage },
];

export default function FeaturedProducts() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-pink-600 text-center mb-8">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((prod, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition"
          >
            <img
              src={prod.img}
              alt={prod.name}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h3 className="font-semibold text-gray-800">{prod.name}</h3>
            <p className="text-pink-600 font-bold">{prod.price}</p>
            <button className="mt-3 bg-yellow-400 text-pink-700 px-4 py-2 rounded-full hover:bg-yellow-300 transition">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
