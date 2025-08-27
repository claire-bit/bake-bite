// src/components/HeroWithCTA.jsx
import React from "react";
import { motion } from "framer-motion";

export default function HeroWithCTA() {
  const services = [
    "Cake Baking",
    "Event Planning",
    "Events Decor",
    "Church Altar",
    "Tents & Seats",
    "Doughnuts",
    "Milkshakes",
    "Fries",
    "And more...",
  ];

  return (
    <section className="relative w-full bg-white">
      {/* Hero Banner */}
      <motion.div
        className="py-24 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-pink-600">
          Welcome to <br />
          <span className="text-yellow-500">Bake ’n’ Bite Hub</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto text-gray-700">
          Cakes, doughnuts, milkshakes, fries — and so much more!  
          Bringing sweetness, flavor, and joy to every occasion 🎉
        </p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <button className="bg-yellow-400 text-pink-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-yellow-300 transition">
            Explore Our Menu
          </button>
          <button className="bg-pink-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-pink-500 transition">
            Contact Us
          </button>
        </motion.div>
      </motion.div>

      {/* Services Floating Card */}
      <motion.div
        className="max-w-4xl mx-auto px-6 -mt-10 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        <div className="bg-white rounded-xl shadow-xl p-8 border border-pink-100">
          <h2 className="text-pink-600 text-2xl font-semibold mb-6 text-center">
            Our Services
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((service, index) => (
              <motion.li
                key={index}
                className="flex items-center gap-3 bg-yellow-50 p-3 rounded-lg shadow-sm hover:shadow-md transition"
                whileHover={{ scale: 1.03, boxShadow: "0px 10px 15px rgba(0,0,0,0.1)" }}
              >
                <span className="w-3 h-3 bg-pink-500 rounded-full"></span>
                <span className="text-gray-800 font-medium">{service}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
