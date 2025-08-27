// src/pages/About.jsx
import React from "react";
import { Cake, Coffee, Heart, Smile, Camera, Sparkles } from "lucide-react";

// Import assets correctly
import logoVideo from "../assets/BakenBite.mp4";  
import logoImage from "../assets/bake n bite.jpg";  

const About = () => {
  return (
    <section className="bg-gradient-to-br from-pink-50 via-yellow-50 to-white py-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left: Logo with animation + fallback */}
        <div className="flex justify-center">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-56 h-56 rounded-full shadow-lg border-4 border-pink-400 object-cover"
          >
            {/* Animated logo */}
            <source src={logoVideo} type="video/mp4" />

            {/* Fallback static logo */}
            <img
              src={logoImage}
              alt="Bake ’n’ Bite Hub Logo"
              className="w-56 h-56 rounded-full shadow-lg border-4 border-pink-400 object-cover"
            />
          </video>
        </div>

        {/* Right: Text */}
        <div>
          <h2 className="text-3xl font-bold text-pink-600 mb-4">
            About Bake ’n’ Bite Hub
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            At <span className="font-semibold text-pink-500">Bake ’n’ Bite Hub</span>, 
            we believe food is more than just a meal — it’s an experience. From fluffy cakes 
            to golden fries, every bite is crafted with love to bring sweetness and joy to your day.  
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Whether you’re celebrating a birthday, craving a milkshake, or just want a quick snack, 
            we’ve got you covered. Our passion is to make sure every moment with us is memorable, 
            delicious, and made just for you.
          </p>

          {/* Highlights with icons */}
          <div className="grid grid-cols-2 gap-6 mt-6">
            <div className="flex items-center gap-3">
              <Cake className="text-pink-500" />
              <span className="text-gray-800">Delicious Cakes</span>
            </div>
            <div className="flex items-center gap-3">
              <Coffee className="text-yellow-500" />
              <span className="text-gray-800">Fresh Drinks</span>
            </div>
            <div className="flex items-center gap-3">
              <Heart className="text-red-500" />
              <span className="text-gray-800">Made with Love</span>
            </div>
            <div className="flex items-center gap-3">
              <Smile className="text-green-500" />
              <span className="text-gray-800">Happy Customers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-4xl mx-auto mt-16 text-center">
        <h3 className="text-2xl font-semibold text-pink-600 mb-4">Our Mission</h3>
        <p className="text-gray-700 leading-relaxed">
          To create moments of happiness through baked treats and fast foods that not only 
          satisfy your cravings but also warm your heart. Every recipe is carefully chosen, 
          every ingredient fresh, and every smile genuine. 🧁🍔
        </p>
      </div>

      {/* Services Section */}
      <div className="max-w-6xl mx-auto mt-20 px-6">
        <h3 className="text-2xl font-bold text-center text-pink-600 mb-12">
          What We Do
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
            <Cake className="text-pink-500 w-10 h-10 mx-auto mb-3" />
            <h4 className="text-lg font-semibold mb-2">Cakes & Pastries</h4>
            <p className="text-sm text-gray-600">
              Custom cakes, pastries, and desserts for every occasion.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
            <Coffee className="text-yellow-500 w-10 h-10 mx-auto mb-3" />
            <h4 className="text-lg font-semibold mb-2">Drinks & Fast Foods</h4>
            <p className="text-sm text-gray-600">
              Milkshakes, smoothies, burgers, fries, and quick bites.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
            <Camera className="text-blue-500 w-10 h-10 mx-auto mb-3" />
            <h4 className="text-lg font-semibold mb-2">Event Coverage</h4>
            <p className="text-sm text-gray-600">
              We capture your special moments with professional coverage.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
            <Sparkles className="text-purple-500 w-10 h-10 mx-auto mb-3" />
            <h4 className="text-lg font-semibold mb-2">Event Decor</h4>
            <p className="text-sm text-gray-600">
              Stunning decor setups tailored to your theme and occasion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
