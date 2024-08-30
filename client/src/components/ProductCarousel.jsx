import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export default function ProductCarousel({ header, data }) {
  return (
    <div className="w-full  mx-auto  pt-10 ">
      <div className="flex justify-between items-center mt-4">
        <h2 className="text-[2rem] mt-3 font-bold pl-4 ">{header}</h2>
      </div>
      <Carousel className="w-full">
        <CarouselContent>
          {data?.map((item) => (
            <CarouselItem
              key={item?._id}
              className="basis-1/1 md:basis-1/3 lg:basis-1/4"
            >
              <div className="p-4">
                <Card>
                  <img
                    src={item?.image}
                    alt={item?.title}
                    width={300}
                    height={300}
                    className="aspect-square object-cover rounded-md"
                  />
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-[1.2rem] text-center">
                      {item?.cuisine_owner?.buka_name}
                    </h3>
                    <p className="font-semibold text-[0.85rem] text-center">
                      {item?.cuisine_type}
                    </p>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-semibold text-[1rem]">
                        {item?.cuisine_name}
                      </h3>
                      <div className="text-primary font-semibold">
                        ${item?.price}
                      </div>
                    </div>
                    <Link to={`/kitchen/${item?.cuisine_owner?._id}`}>
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
