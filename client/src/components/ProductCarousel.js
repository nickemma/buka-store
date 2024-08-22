"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import useCart from "@/components/hooks/useCart";
import { Button } from "./ui/button";
import Link from "next/link";
import useCuisine from "@/components/hooks/useCuisine";

export default function ProductCarousel({ header }) {
  const { data } = useCuisine();

  // const { handleAddToCart, handleDecrement, handleIncrement, cart } = useCart(data);
  return (
    <div className="w-full  mx-auto  pt-10 ">
      <h2 className="text-[1.2rem] mt-3 font-bold">{header}</h2>
      <Carousel className="w-full">
        <CarouselContent>
          {data.map((product) => (
            <CarouselItem
              key={product?._id}
              className="basis-1/1 md:basis-1/3 lg:basis-1/4"
            >
              <div className="p-4">
                <Card>
                  <img
                    src={"/food2-buka.png"}
                    alt={product?.title}
                    width={300}
                    height={300}
                    className="aspect-square object-cover rounded-md"
                  />
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-[1rem]">
                      {product?.cuisine_name}
                    </h3>
                    <h3 className="font-semibold text-[0.6rem]">
                      {product?.cuisine_owner?.buka_name}
                    </h3>
                    <div className="text-primary font-semibold">
                      {product?.price}
                    </div>
                    <Link href={`/kitchen/${product?.cuisine_owner._id}`}>
                      <Button>View Cuisine</Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
