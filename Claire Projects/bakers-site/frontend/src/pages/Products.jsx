// src/pages/Products.jsx
import React, { useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Products() {
  // Dummy product data
  const allProducts = [
    { id: 1, name: "Chocolate Cake", price: 1200, badge: "Popular", image: "/assets/cake.jpg", category: "cakes" },
    { id: 2, name: "Vanilla Donuts", price: 350, badge: "New", image: "/assets/donuts.jpg", category: "snacks" },
    { id: 3, name: "Strawberry Milkshake", price: 250, image: "/assets/milkshake.jpg", category: "drinks" },
    { id: 4, name: "French Fries", price: 200, image: "/assets/fries.jpg", category: "snacks" },
  ];

  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("default");

  // Filtering
  const filtered = filter === "all" ? allProducts : allProducts.filter(p => p.category === filter);

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "price-low") return a.price - b.price;
    if (sort === "price-high") return b.price - a.price;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-pink-600">
        Our Products
      </h1>

      {/* Filters & Sorting */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        {/* Category Filter */}
        <select
          className="border border-gray-300 rounded-lg p-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="cakes">Cakes</option>
          <option value="snacks">Snacks</option>
          <option value="drinks">Drinks</option>
        </select>

        {/* Sort */}
        <select
          className="border border-gray-300 rounded-lg p-2"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sorted.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
