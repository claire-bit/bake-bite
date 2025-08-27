// src/pages/ProductListingPage.jsx
import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";

// Dummy products
const products = [
  {
    id: 1,
    name: "Chocolate Cake",
    price: 1200,
    image: "/assets/cake.jpg",
    description: "Rich chocolate cake with smooth frosting.",
    badge: "Popular",
  },
  {
    id: 2,
    name: "Vanilla Doughnut",
    price: 200,
    image: "/assets/doughnut.jpg",
    description: "Soft doughnuts with vanilla glaze.",
    badge: "New",
  },
  {
    id: 3,
    name: "Strawberry Milkshake",
    price: 350,
    image: "/assets/milkshake.jpg",
    description: "Creamy strawberry milkshake for your sweet tooth.",
  },
  {
    id: 4,
    name: "Fries Combo",
    price: 450,
    image: "/assets/fries.jpg",
    description: "Crispy fries with a special sauce.",
  },
];

export default function ProductListingPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddToCart = (product) => {
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-pink-600 mb-8 text-center">
        Our Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => handleAddToCart(product)}
            onClick={() => handleQuickView(product)}
          />
        ))}
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <ProductModal
          isOpen={isModalOpen}
          product={selectedProduct}
          onClose={() => setIsModalOpen(false)}
          onAddToCart={() => handleAddToCart(selectedProduct)}
        />
      )}
    </div>
  );
}
