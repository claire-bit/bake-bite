import React from "react";
import { Link } from "react-router-dom";

// Import 12 images from your assets folder
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

// Same product list used in Products.jsx
const products = [
  {
    id: 1,
    name: "Vanilla Bean Bliss",
    price: 1100,
    image: img1,
    description:
      "A light, buttery vanilla sponge layered with whipped cream and topped with white chocolate curls.",
  },
  {
    id: 2,
    name: "Dark Chocolate Truffle",
    price: 1300,
    image: img2,
    description:
      "Rich, moist chocolate cake filled with smooth ganache and finished with a glossy truffle glaze.",
  },
  {
    id: 3,
    name: "Red Velvet Dream",
    price: 1250,
    image: img3,
    description:
      "Classic red velvet layers with creamy vanilla cheese frosting and a hint of cocoa.",
  },
  {
    id: 4,
    name: "Black Forest Fantasy",
    price: 1400,
    image: img4,
    description:
      "Chocolate sponge layered with whipped cream, cherries, and dark chocolate shavings.",
  },
  {
    id: 5,
    name: "Strawberry Delight",
    price: 1200,
    image: img5,
    description:
      "Fluffy vanilla layers filled with strawberry puree and fresh cream frosting.",
  },
  {
    id: 6,
    name: "Lemon Zest Cake",
    price: 1150,
    image: img6,
    description:
      "Tangy lemon sponge paired with sweet buttercream and a light sugar glaze.",
  },
  {
    id: 7,
    name: "Carrot Walnut Cake",
    price: 1350,
    image: img7,
    description:
      "Moist carrot cake spiced with cinnamon and nutmeg, topped with cream cheese frosting.",
  },
  {
    id: 8,
    name: "Mocha Espresso Indulgence",
    price: 1450,
    image: img8,
    description:
      "A perfect balance of coffee and cocoa in a rich, decadent layered cake.",
  },
  {
    id: 9,
    name: "Pineapple Paradise",
    price: 1200,
    image: img9,
    description:
      "Light pineapple-infused sponge with whipped cream and tropical fruit toppings.",
  },
  {
    id: 10,
    name: "Oreo Cookies & Cream",
    price: 1500,
    image: img10,
    description:
      "Chocolate cake layers filled with Oreo crumbs and cream frosting for cookie lovers.",
  },
  {
    id: 11,
    name: "Blueberry Cheesecake",
    price: 1600,
    image: img11,
    description:
      "Creamy cheesecake with a buttery crust, topped with sweet blueberry compote.",
  },
  {
    id: 12,
    name: "Ferrero Rocher Fantasy",
    price: 1800,
    image: img12,
    description:
      "Hazelnut sponge filled with chocolate cream and crushed Ferrero Rocher pieces.",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-pink-600 text-center mb-8">
        Featured Cakes
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.slice(0, 8).map((product) => ( // only show 8 featured cakes
          <div
            key={product.id}
            className="bg-white/90 rounded-xl shadow-md p-4 text-center hover:shadow-lg transition backdrop-blur-sm"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-3"
            />
            <h3 className="font-semibold text-gray-800">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {product.description}
            </p>
            <p className="text-pink-600 font-bold mb-3">Ksh {product.price}</p>

            {/* ✅ Working “View Details” button */}
            <Link
              to={`/products/${product.id}`}
              className="bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-500 transition inline-block"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
