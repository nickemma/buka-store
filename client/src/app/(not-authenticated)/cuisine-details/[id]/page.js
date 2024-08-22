"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MinusIcon, PlusIcon, ShoppingCartIcon } from "lucide-react";
import useCart from "@/components/hooks/useCart";
import useCuisine from "@/components/hooks/useCuisine";

export default function Details({params}) {
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const {id}  = params
  console.log(id)

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const { handleAddToCart } = useCart(quantity, setQuantity, setOpen);
  const { details } = useCuisine(id);


  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              alt="Delicious Pizza"
              className="w-full h-full object-cover"
              height="600"
              src="/placeholder.svg?height=600&width=600"
              style={{
                aspectRatio: "600/600",
                objectFit: "cover",
              }}
              width="600"
            />
          </div>
          <CardContent className="p-6 md:w-1/2">
            <h1 className="text-3xl font-bold mb-2">{details?.cuisine_name}</h1>
            <p className="text-muted-foreground mb-4">
            {details?.cuisine_owner?.buka_name}
            </p>
            <div className="text-2xl font-bold mb-6">{details?.price}</div>
            <div className="flex items-center mb-6">
              <Button
                variant="outline"
                size="icon"
                onClick={decrementQuantity}
                aria-label="Decrease quantity"
              >
                <MinusIcon className="h-4 w-4" />
              </Button>
              <span className="mx-4 text-xl font-semibold">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={incrementQuantity}
                aria-label="Increase quantity"
              >
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>
            <Button
              onClick={() => handleAddToCart(details)}
              className="w-full"
              size="lg"
            >
              <ShoppingCartIcon className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
