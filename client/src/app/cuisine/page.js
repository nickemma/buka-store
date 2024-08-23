"use client";

import useCuisine from "@/components/hooks/useCuisine";
import React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Utensils, DollarSign } from "lucide-react";
import ProductCarousel from "@/components/ProductCarousel";

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((item) => (
            <ProductCarousel item={item} />
          ))}
        </div>
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
