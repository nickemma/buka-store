"use client";

import useCuisine from "@/components/hooks/useCuisine";
import React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Utensils, DollarSign } from "lucide-react";
import ProductCarousel, { ProductCard } from "@/components/ProductCarousel";
import Navbar from "@/components/Navbar";

function Cuisines() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data } = useCuisine();
  const filteredRestaurants = data.filter(
    (item) =>
      item?.cuisine_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.cuisine_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          Explore Cuisines and Restaurants
        </h1>
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search cuisines  "
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {filteredRestaurants.map((item) => (
          <ProductCard item={item} />
        ))}
        {filteredRestaurants.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No restaurants found. Try a different search term.
          </p>
        )}
      </div>
    </div>
  );
}

export default Cuisines;
