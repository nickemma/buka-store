"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import Link from "next/link";

import {
  Minus,
  MinusCircle,
  Pin,
  PinIcon,
  PlusCircle,
  SearchIcon,
  UserIcon,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { toast } from "sonner";
import useCart from "./hooks/useCart";
import { Label } from "@radix-ui/react-label";
import { getCookie } from "cookies-next";
import useCuisine from "./hooks/useCuisine";
function Kitchen({ id }) {
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState();

  const [role, setRole] = useState("");
  const cartJson = getCookie("cart");
  const carts = cartJson ? JSON.parse(cartJson) : [];

  const total = carts?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCart = (data) => {
    console.log({
      ...data,
      quantity,
    });
    toast.success(`${quantity} of ${data?.name}add to cart`, {
      action: {
        label: "Close",
        onClick: () => console.log("Undo"),
      },
    });

    setQuantity(0);
    setOpen(false);
  };

  const { data } = useCuisine();
  const { handleAddToCart, handleDecrement, handleIncrement } = useCart(
    quantity,
    setQuantity,
    setOpen
  );

  return (
    <div className="px-3">
      <div className="w-full h-[400px] relative">
        <img src="/food-buka.png" className="w-full h-[400px] object-cover " />

        <div className="absolute w-full flex text-center justify-center m-auto -bottom-10 left-0">
          <div className="w-full mx-3 md:w-[400px] shadow-md h-[200px] flex flex-col items-center justify-center  rounded-md bg-white">
            <h2 className="text-[1.1rem]">Aduke Kitchen</h2>

            <span className="text-[0.6rem] py-3">African, Nigeria</span>
            <span className="text-[0.8rem] py-3 flex items-center">
              <PinIcon />
              England W3, London Uk African, Nigeria
            </span>

            <div className="flex gap-5">
              <div>
                <h2 className=" underline text-[0.7rem] ">Opening Time</h2>
                <span className=" text-sm  font-semibold">8am - 10pm</span>
              </div>
              <div>
                <h2 className=" underline text-[0.7rem] ">Delivery Time</h2>
                <span className=" text-sm  font-semibold">8am - 10pm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 my-14 gap-3 ">
        <div className="border rounded-md  p-3">
          <h1 className="text-xl font-bold">Filter Category</h1>

          <div className="flex flex-col gap-2 mt-3">
            <RadioGroup
              onValueChange={(value) => setRole(value)}
              defaultValue="user"
              className="flex flex-col"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="user" id="r2" />
                <Label htmlFor="r2">User</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="buka" id="r3" />
                <Label htmlFor="r3">Buka</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <div className="border rounded-md p-3">
          <h1 className="text-xl font-bold">Cuisines</h1>
          <div className="space-y-4">
            {data.map((item) => (
              <div
                key={item?._id}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src="/food-buka.png"
                    alt={item?.cuisine_name}
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                    style={{ aspectRatio: "64/64", objectFit: "cover" }}
                  />
                  <div>
                    <h3 className="text-[0.7rem] font-bold">
                      {item?.cuisine_name}
                    </h3>
                    <p className="text-muted-foreground text-[0.7rem]"></p>
                    <p className="font-medium">${item?.price.toFixed(2)}</p>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    setOpen(true);
                    setSelected(item);
                  }}
                >
                  <PlusCircle />
                </Button>
              </div>
            ))}
          </div>{" "}
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="text-center">
              <AlertDialogHeader>
                <AlertDialogTitle></AlertDialogTitle>
                <AlertDialogDescription></AlertDialogDescription>
              </AlertDialogHeader>
              <img src="/food-buka.png" />
              <h3 className="text-[1rem] font-bold">{selected?.name}</h3>
              <h3 className="text-[1rem] font-bold text-primary">
                ${selected?.price}
              </h3>
              <div>
                <div className="flex items-center justify-center gap-3">
                  <button
                    disabled={quantity <= 0 && true}
                    className=""
                    onClick={() => {
                      if (quantity <= 0) {
                        setQuantity(0);
                      } else {
                        setQuantity((pre) => (pre -= 1));
                      }
                    }}
                  >
                    <MinusCircle size={"20"} />
                  </button>
                  <h3 className="text-[1rem] font-bold text-primary">
                    {quantity}
                  </h3>
                  <button
                    onClick={() => {
                      setQuantity((pre) => (pre += 1));
                    }}
                    className=""
                  >
                    <PlusCircle size={"20"} />
                  </button>
                </div>
              </div>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button
                  onClick={() => {
                    handleAddToCart(selected);
                  }}
                >
                  Add to Cart
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="border rounded-md p-3">
          <div className="space-y-6">
            <h1 className="text-xl font-bold">Your Cart</h1>
            <div className="space-y-4">
              {carts?.length <= 0 ? (
                <div className="h-[150px] flex flex-col items-center justify-center">
                  <h2 className="text-lg font-bold text-primary">
                    Your Cart is Empty
                  </h2>
                </div>
              ) : (
                carts?.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src="/placeholder.svg"
                        alt={item.name}
                        width={56}
                        height={56}
                        className="rounded-md object-cover"
                        style={{ aspectRatio: "64/64", objectFit: "cover" }}
                      />
                      <div>
                        <h3 className="font-medium text-[0.7rem] ">
                          {item.cuisine_name}
                        </h3>
                        <p className="text-muted-foreground ">
                          ${item.price.toFixed(2)} x {item.quantity}
                        </p>
                        <div className="flex items-center  gap-3">
                          <button
                            disabled={item?.quantity <= 0 && true}
                            className=""
                            onClick={() => {
                              handleDecrement(item?._id);
                            }}
                          >
                            <MinusCircle size={"20"} />
                          </button>
                          <h3 className="text-[1rem] font-bold text-primary">
                            {item?.quantity}
                          </h3>
                          <button
                            onClick={() => {
                              handleIncrement(item?._id);
                            }}
                            className=""
                          >
                            <PlusCircle size={"20"} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <p className="font-medium text-[0.8rem]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))
              )}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium">Total</p>
              <p className="text-xl font-bold">${total.toFixed(2)}</p>
            </div>
            <Link href={`/kitchen/${id}/cart-checkout`}>
              <Button className="w-full">Checkout</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kitchen;
