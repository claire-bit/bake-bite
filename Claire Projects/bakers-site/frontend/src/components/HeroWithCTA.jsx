import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// Background images (you can add more)
import cakeBg from "../assets/1.jpg";
import pastryBg from "../assets/2.jpg";
import dessertBg from "../assets/3.jpg";

export default function HeroWithCTA() {
  const backgrounds = [cakeBg, pastryBg, dessertBg];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgrounds.length);
    }, 4000); // Change every 4 seconds
    return () => clearInterval(interval);
  }, [backgrounds.length]);

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
    <section className="relative w-full overflow-hidden">
      {/* Background transition */}
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgrounds[currentIndex]})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        />
      </AnimatePresence>

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Hero Text */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-[90vh] text-center px-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-white drop-shadow-lg">
          Welcome to <br />
          <span className="text-yellow-400">Bake ’n’ Bite Hub</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto text-gray-100">
          Cakes, pastries, and sweet delights made with love — bringing joy to
          every bite 🎂💫
        </p>

        {/* Contact Us link */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Link
            to="/contact"
            className="bg-pink-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-pink-500 transition"
          >
            Contact Us
          </Link>
        </motion.div>
      </motion.div>

      {/* Transparent Floating Services List */}
      <motion.div
        className="relative z-20 max-w-5xl mx-auto text-center px-6 mt-10 mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <h2 className="text-yellow-300 text-3xl font-bold mb-8 drop-shadow">
          Our Services
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
          {services.map((service, index) => (
            <motion.li
              key={index}
              className="flex items-center gap-3 text-white font-medium bg-transparent"
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 10px rgba(255,255,255,0.8)",
              }}
            >
              <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
              <span>{service}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
