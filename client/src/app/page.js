import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCarousel from "@/components/ProductCarousel";

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <Hero />

      <div className=" mx-5">
        <ProductCarousel header="Popular Meals" />
        <ProductCarousel header=" Meals Near Me" />
      </div>
    </main>
  );
}
