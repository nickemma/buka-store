"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { getCookie } from "cookies-next";
import useCart from "../hooks/useCart";
import {
  Minus,
  MinusCircle,
  Pin,
  PinIcon,
  PlusCircle,
  SearchIcon,
  UserIcon,
} from "lucide-react";

export function CartCheckout() {
  const cartJson = getCookie("cart");
  const carts = cartJson ? JSON.parse(cartJson) : [];
  console.log(carts);
  const total = carts?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const { handleDecrement, handleIncrement } = useCart();

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Your Cart</h1>
          <div className="space-y-4">
            {carts?.length <= 0 ? (
              <div className="h-[150px] flex flex-col items-center justify-center">
                <h2 className="text-lg font-bold">Your Cart is Empty</h2>

                <Link href="/">
                  <Button>Continue Shopping</Button>
                </Link>
              </div>
            ) : (
              carts?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src="/placeholder.svg"
                      alt={item.name}
                      width={64}
                      height={64}
                      className="rounded-md object-cover"
                      style={{ aspectRatio: "64/64", objectFit: "cover" }}
                    />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-muted-foreground">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
                      <div className="flex items-center justify-center gap-3">
                        <button
                          disabled={item?.quantity <= 0 && true}
                          className=""
                          onClick={() => {
                            handleDecrement(item?.id);
                          }}
                        >
                          <MinusCircle size={"20"} />
                        </button>
                        <h3 className="text-[1rem] font-bold text-primary">
                          {item?.quantity}
                        </h3>
                        <button
                          onClick={() => {
                            handleIncrement(item?.id);
                          }}
                          className=""
                        >
                          <PlusCircle size={"20"} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))
            )}
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg font-medium">Total</p>
            <p className="text-2xl font-bold">${total.toFixed(2)}</p>
          </div>
        </div>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <form className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" placeholder="Enter your address" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="payment">Payment</Label>
              <Select id="payment">
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit-card">Credit Card</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="apple-pay">Apple Pay</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button size="lg" className="w-full">
              Proceed to Payment
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
