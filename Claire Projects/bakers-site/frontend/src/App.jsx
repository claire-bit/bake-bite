import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import Products from "./pages/Products"; // ✅ added
import ProductDetail from "./pages/ProductDetail"; // ✅ added

export default function App() {
  return (
    <div className="bg-softBlue min-h-screen flex flex-col">
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content */}
      <main className="flex-grow p-6">
        <Routes>
          {/* Core site routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify/:uid/:token" element={<VerifyEmail />} />

          {/* 🧁 Product pages */}
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </main>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
}
