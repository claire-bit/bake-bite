import React from "react";
import { Link } from "react-router-dom";

// Import assets
import logoVideo from "../assets/BakenBite.mp4";
import logoImage from "../assets/bake n bite.jpg";

export default function Navbar() {
  return (
    <nav className="bg-offWhite shadow-md w-full">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Left: Logo + Site Name */}
        <div className="flex items-center gap-3">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-12 h-12 object-cover rounded-full border-2 border-pink-400"
          >
            <source src={logoVideo} type="video/mp4" />
            <img
              src={logoImage}
              alt="Bake ’n’ Bite Hub Logo"
              className="w-12 h-12 object-cover rounded-full border-2 border-pink-400"
            />
          </video>
          <h1 className="text-primary font-bold text-xl">Bake 'n' Bite Hub</h1>
        </div>

        {/* Navigation Links */}
        <ul className="flex gap-6 text-deepBrown font-medium">
          <li><Link to="/" className="hover:text-primary">Home</Link></li>
          <li><Link to="/about" className="hover:text-primary">About</Link></li>
          <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          <li><Link to="/login" className="hover:text-primary">Login</Link></li>
          <li><Link to="/register" className="hover:text-primary">Register</Link></li>
        </ul>
      </div>
    </nav>
  );
}
