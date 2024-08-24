"use client"
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCarousel from "@/components/ProductCarousel";
import useCuisine from "@/components/hooks/useCuisine";

export default function Home() {
  const { data } = useCuisine();

  return (
    <main className="">
      <Navbar />
      <Hero />

      <div className=" mx-5">

     
        <ProductCarousel datas={data} header="Popular Meals" />

    
      </div>
    </main>
  );
}
