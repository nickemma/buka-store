"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCarousel from "@/components/ProductCarousel";
import useCuisine from "@/components/hooks/useCuisine";
import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
const endpoint = "https://buka-store.vercel.app/api/bukas";

export default function Home() {
  const { data } = useCuisine();

  const [buka, setBuka] = useState([]);
  const [details, setSetails] = useState(null);

  useEffect(() => {
    const fetchCuisines = async () => {
      await axios
        .get(endpoint)
        .then((res) => setBuka(res.data))
        .catch((err) => {});
    };

    fetchCuisines();
  }, []);

  console.log(buka);

  return (
    <main className="">
      <Navbar />
      <Hero />

      <div className=" mx-5">
        <ProductCarousel datas={data} header="Popular Meals" />
      </div>
      <Footer/>
    </main>
  );
}
