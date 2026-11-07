import React, { useState } from "react";
import ProductCard from "../pages/ProductCard";

// Import all 12 cake images
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";
import img6 from "../assets/6.jpg";
import img7 from "../assets/7.jpg";
import img8 from "../assets/8.jpg";
import img9 from "../assets/9.jpg";
import img10 from "../assets/10.jpg";
import img11 from "../assets/11.jpg";
import img12 from "../assets/12.jpg";

export default function Products() {
  // Product Data (12 Cakes)
  const allProducts = [
    {
      id: 1,
      name: "Vanilla Bean Bliss",
      price: 1100,
      image: img1,
      category: "cakes",
      description:
        "A light, buttery vanilla sponge layered with whipped cream and topped with white chocolate curls.",
    },
    {
      id: 2,
      name: "Dark Chocolate Truffle",
      price: 1300,
      image: img2,
      category: "cakes",
      description:
        "Rich, moist chocolate cake filled with smooth ganache and finished with a glossy truffle glaze.",
    },
    {
      id: 3,
      name: "Red Velvet Dream",
      price: 1250,
      image: img3,
      category: "cakes",
      description:
        "Classic red velvet layers with creamy vanilla cheese frosting and a hint of cocoa.",
    },
    {
      id: 4,
      name: "Black Forest Fantasy",
      price: 1400,
      image: img4,
      category: "cakes",
      description:
        "Chocolate sponge layered with whipped cream, cherries, and dark chocolate shavings.",
    },
    {
      id: 5,
      name: "Strawberry Delight",
      price: 1200,
      image: img5,
      category: "cakes",
      description:
        "Fluffy vanilla layers filled with strawberry puree and fresh cream frosting.",
    },
    {
      id: 6,
      name: "Lemon Zest Cake",
      price: 1150,
      image: img6,
      category: "cakes",
      description:
        "Tangy lemon sponge paired with sweet buttercream and a light sugar glaze.",
    },
    {
      id: 7,
      name: "Carrot Walnut Cake",
      price: 1350,
      image: img7,
      category: "cakes",
      description:
        "Moist carrot cake spiced with cinnamon and nutmeg, topped with cream cheese frosting.",
    },
    {
      id: 8,
      name: "Mocha Espresso Indulgence",
      price: 1450,
      image: img8,
      category: "cakes",
      description:
        "A perfect balance of coffee and cocoa in a rich, decadent layered cake.",
    },
    {
      id: 9,
      name: "Pineapple Paradise",
      price: 1200,
      image: img9,
      category: "cakes",
      description:
        "Light pineapple-infused sponge with whipped cream and tropical fruit toppings.",
    },
    {
      id: 10,
      name: "Oreo Cookies & Cream",
      price: 1500,
      image: img10,
      category: "cakes",
      description:
        "Chocolate cake layers filled with Oreo crumbs and cream frosting for cookie lovers.",
    },
    {
      id: 11,
      name: "Blueberry Cheesecake",
      price: 1600,
      image: img11,
      category: "cakes",
      description:
        "Creamy cheesecake with a buttery crust, topped with sweet blueberry compote.",
    },
    {
      id: 12,
      name: "Ferrero Rocher Fantasy",
      price: 1800,
      image: img12,
      category: "cakes",
      description:
        "Hazelnut sponge filled with chocolate cream and crushed Ferrero Rocher pieces.",
    },
  ];

  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("default");

  // Filtering by category
  const filtered =
    filter === "all"
      ? allProducts
      : allProducts.filter((p) => p.category === filter);

  // Sorting by price
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "price-low") return a.price - b.price;
    if (sort === "price-high") return b.price - a.price;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-pink-600">
        Our Cake Collection
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
