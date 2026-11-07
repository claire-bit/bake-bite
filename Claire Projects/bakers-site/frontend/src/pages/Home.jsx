import React from "react";
import HeroWithCTA from "../components/HeroWithCTA";
import FeaturedProducts from "../components/FeaturedProducts";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <HeroWithCTA />

      {/* Products Section */}
      <FeaturedProducts />
    </div>
  );
}
