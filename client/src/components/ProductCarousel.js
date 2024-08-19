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

export default function ProductCarousel({ header }) {
  const data = [
    {
      id: 1,
      image: "/placeholder.svg",
      title: "Cozy Blanket",
      price: "$29.99",
    },
    {
      id: 2,
      image: "/placeholder.svg",
      title: "Autumn Mug",
      price: "$12.99",
    },
    {
      id: 3,
      image: "/placeholder.svg",
      title: "Fall Fragrance Candle",
      price: "$16.99",
    },
    {
      id: 4,
      image: "/placeholder.svg",
      title: "Autumn Leaves Wall Art",
      price: "$39.99",
    },
    {
      id: 5,
      image: "/placeholder.svg",
      title: "Fall Harvest Wreath",
      price: "$49.99",
    },
    {
      id: 6,
      image: "/placeholder.svg",
      title: "Spiced Apple Cider Syrup",
      price: "$12.99",
    },
    {
      id: 7,
      image: "/placeholder.svg",
      title: "Fall Foliage Table Runner",
      price: "$19.99",
    },
    {
      id: 8,
      image: "/placeholder.svg",
      title: "Fall Fashion Hat",
      price: "$24.99",
    },
  ];

  const { handleAddToCart, handleDecrement, handleIncrement, cart } = useCart(data);
  return (
    <div className="w-full  mx-auto  pt-10 ">
      <h2 className="text-[1.2rem] mt-3 font-bold">{header}</h2>
      <Carousel className="w-full">
        <CarouselContent>
          {data.map((product) => (
            <CarouselItem
              key={product.id}
              className="basis-1/1 md:basis-1/3 lg:basis-1/4"
            >
              <div className="p-4">
                <Card>
                  <img
                    src="/food2-buka.png"
                    alt={product.title}
                    width={300}
                    height={300}
                    className="aspect-square object-cover rounded-md"
                  />
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-[1rem]">
                      {product.title}
                    </h3>
                    <h3 className="font-semibold text-[0.6rem]">
                      {product.title}
                    </h3>
                    <div className="text-primary font-semibold">
                      {product.price}
                    </div>

                    <Button onClick={() => {
                        handleAddToCart(product)
                    }} className="w-full rounded-full h-[30px] mt-3">Add to Cart</Button>
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
