// src/components/Footer.jsx
import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  MessageCircle,
} from "lucide-react";

// Import assets
import logoVideo from "../assets/BakenBite.mp4";
import logoImage from "../assets/bake n bite.jpg";

// TikTok Official Icon
const TikTokIcon = ({ size = 22, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
  >
    <path d="M34 12.1c-1.6-1.1-3.1-2.7-3.6-4.7-.2-.7-.4-1.6-.4-2.4h-5.7v24.5c0 3.2-2.7 5.8-6 5.8s-6-2.6-6-5.8c0-3.2 2.7-5.8 6-5.8.6 0 1.1.1 1.7.2v-6c-.6-.1-1.1-.1-1.7-.1-6.6 0-12 5.3-12 11.8s5.4 11.8 12 11.8 12-5.3 12-11.8V16.5c2 1.5 4.5 2.5 7.1 2.5V13c-1.1 0-2.2-.3-3.4-.9z" />
  </svg>
);

// Latest X (Twitter) Icon
const XIcon = ({ size = 22, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.77l-5.214-6.817-5.96 6.817H2.29l7.73-8.838L1.75 2.25H7.48l4.713 6.231 6.05-6.231zm-1.16 17.52h1.833L7.084 4.126H5.117l11.967 15.644z"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-yellow-400 via-pink-500 to-pink-700 text-white py-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 px-6">
        
        {/* About / Logo */}
        <div className="text-center md:text-left">
          {/* Logo */}
          <div className="flex justify-center md:justify-start mb-4">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-16 h-16 object-cover rounded-full border-2 border-white"
            >
              <source src={logoVideo} type="video/mp4" />
              <img
                src={logoImage}
                alt="Bake ’n’ Bite Hub Logo"
                className="w-16 h-16 object-cover rounded-full border-2 border-white"
              />
            </video>
          </div>

          <h3 className="text-2xl font-bold mb-4">Bake ’n’ Bite Hub</h3>
          <p className="text-sm leading-relaxed opacity-90">
            Cakes, doughnuts, milkshakes, fries — bringing sweetness and joy to
            every bite. Bake ’n’ Bite Hub is your one-stop destination for sweet
            treats and fast eats 🍰🍔
          </p>

          {/* Socials */}
          <div className="flex gap-4 mt-4 justify-center md:justify-start">
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-200">
              <Instagram />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-200">
              <Facebook />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-200">
              <XIcon />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-200">
              <MessageCircle />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-200">
              <TikTokIcon />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-yellow-200">Home</a></li>
            <li><a href="/about" className="hover:text-yellow-200">About</a></li>
            <li><a href="/menu" className="hover:text-yellow-200">Menu</a></li>
            <li><a href="/contact" className="hover:text-yellow-200">Contact</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Our Specialties</h3>
          <ul className="space-y-2 text-sm opacity-90">
            <li>Cakes & Pastries</li>
            <li>Milkshakes & Smoothies</li>
            <li>Burgers & Fries</li>
            <li>Custom Orders</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm opacity-90">
            <li className="flex items-center gap-2"><MapPin size={16} /> Kibwezi, Kenya</li>
            <li className="flex items-center gap-2"><Phone size={16} /> +254 792 702 398</li>
            <li className="flex items-center gap-2"><Mail size={16} /> bakers@example.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm opacity-90 border-t border-white/30 pt-4">
        &copy; {new Date().getFullYear()} Bake ’n’ Bite Hub. All rights reserved. | 
        <a href="#" className="hover:text-yellow-200 ml-1">Privacy Policy</a> | 
        <a href="#" className="hover:text-yellow-200 ml-1">Terms of Service</a>
      </div>
    </footer>
  );
};

export default Footer;
