"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

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
import useCart from "@/components/hooks/useCart";
import {
  Minus,
  MinusCircle,
  Pin,
  PinIcon,
  PlusCircle,
  SearchIcon,
  UserIcon,
} from "lucide-react";
import axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";
const endpoint = "https://buka-store.vercel.app/api/orders";

export function CartCheckout({ id }) {
  const cartJson = getCookie("cart");

  const carts = cartJson ? JSON.parse(cartJson) : [];

  const userJson = getCookie("user");
  const userData = userJson ? JSON.parse(userJson) : "";
  const [data, setData] = useState(userData?.user);
  const [loading, setLoading] = useState(false);
  console.log(carts);
  const total = carts?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const valueChange = (fieldName, value) => {
    setData((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const orderItems = carts?.map((item) => {
    return {
      cuisine_id: item?._id,
      quantity: item?.quantity,
      price: item?.price,
    };
  });

  const { handleDecrement, handleIncrement } = useCart();

  console.log(`Bearer ${" "} ${data?.token}`);
  const handleCheckout = async () => {
    const orderDetails = {
      order_items: orderItems,
      order_number: carts?.length.toString(),
      order_status: "PENDING",
      order_total: total,
      order_owner: userData?._id,
      order_buka: id,
      payment_method: "true",
      delivery_date: Date.now(),
    };
    setLoading(true);

    await axios
      .post(endpoint + "/create", orderDetails, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data?.token,
        },
      })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        toast.success("Login successfully", {
          action: {
            label: "Close",
            onClick: () => console.log("Undo"),
          },
        });

        router.refresh();
      })
      .catch((err) => {
        console.log(err, "Catch eeror");
        toast.error(
          <div>
            {err.response.data.errors
              ? err.response.data.errors.map((item) => item)
              : err.response.data.message}
          </div>,
          {
            action: {
              label: "Close",
              onClick: () => console.log("Undo"),
            },
          }
        );
        setLoading(false);
      });
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6  ">
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
                  key={item._id}
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
                      <h3 className="font-medium">{item.cuisine_name}</h3>
                      <p className="text-muted-foreground">
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
          <di>
            <div className=" flex justify-between">
              <p className="font-bold">Full Name</p>{" "}
              <span className="text-primary">
                {data?.first_name + " " + data?.last_name}
              </span>
            </div>
            <div className=" flex justify-between">
              <p className="font-bold">Email</p>{" "}
              <span className="text-primary">{data?.email}</span>
            </div>
            <div className=" flex justify-between">
              <Button className="w-full mt-6" onClick={handleCheckout}>
                {loading ? <PuffLoader size={25} color={"#fff"} /> : "Checkout"}
              </Button>
            </div>
          </di>
        </div>
      </div>
    </div>
  );
}
