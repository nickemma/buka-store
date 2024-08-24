"use client";

import { Button } from "@/components/ui/button";
import useCuisine from "@/components/hooks/useCuisine";
import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useCookie from "@/components/hooks/useCookie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import axios from "axios";
import ProductCarousel, { ProductCard } from "@/components/ProductCarousel";
import { UsersIcon } from "lucide-react";
const endpoint = "https://buka-store.vercel.app/api/cuisines";

const categories = [
  "Appetizer",
  "Main Dish",
  "Side Dish",
  "Dessert",
  "Beverages",
  "Others",
];
function Buka() {
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const { cookiesData } = useCookie();
  const router = useRouter();
  const inputRef = useRef(null);

  const valueChange = (fieldName, value) => {
    setFormData((prevState) => ({
      ...prevState,

      [fieldName]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  console.log(cookiesData);

  const { data } = useCuisine();
  console.log(data);
  const myCuisines = data?.filter(
    (item) => item?.cuisine_owner?._id === cookiesData?.user._id
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios
        .post(
          endpoint,
          {
            cuisine_category: category,
            ...formData,
            // image: image,
            cuisine_owner: cookiesData?.user._id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + cookiesData?.user.token,
            },
          }
        )
        .then((res) => {
          setLoading(false);
          console.log(res.data);
          toast.success("Cuisine Created Successfully", {
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
    } catch (error) {
      setLoading(false);
      toast.error(error.message, {
        className: "bg-red-500",
        action: {
          label: "Close",
          onClick: () => console.log("Undo"),
        },
      });
    }
  };
  return (
    <div>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
        </div>
        <div className="grid gap-4  md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card
            x-chunk="dashboard-01-chunk-0"
            className="bg-[#396effb6] text-white"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Current Balance.
              </CardTitle>
              <UsersIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold"> ₦45,231.89</div>
    
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Sales
              </CardTitle>
              <UsersIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+23</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2" className="bg-[#0090308b]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Canceled Orders</CardTitle>
              <UsersIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
        </div>
        <div
          className="flex flex-1 items-center justify-center rounded-lg border py-4 border-dashed shadow-sm"
          x-chunk="dashboard-02-chunk-1"
        >
          {myCuisines ? (
            <div>
              <h1 className="text-lg font-semibold md:text-2xl">
                Your Cuisines
              </h1>

              <div className="grid md:grid-cols-3">
                {myCuisines?.map((item) => (
                  <ProductCard item={item} />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                You have no cuisine
              </h3>
              <p className="text-sm text-muted-foreground">
                You can start adding new cuisine
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="" size="sm">
                    Add new cuisine
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Add new Cuisine 🍕</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="max-h-[60vh]">
                    <form className="flex flex-col gap-4">
                      <div>
                        <label>Cuisine Name</label>
                        <Input
                          value={data?.cuisine_name}
                          onChange={(e) =>
                            valueChange("cuisine_name", e.target.value)
                          }
                          placeholder="Enter Cuisine Name"
                        />
                      </div>

                      <div>
                        <label> Description</label>
                        <Input
                          value={data?.description}
                          onChange={(e) =>
                            valueChange("description", e.target.value)
                          }
                          placeholder="Enter description"
                        />
                      </div>
                      <div>
                        <label> Image</label>
                        <Input
                          value={data?.image}
                          ref={inputRef}
                          onChange={handleImageChange}
                          type="file"
                          accept="image/*"
                          // placeholder="Enter Cui"
                        />
                      </div>
                      <div>
                        <label> Price</label>
                        <Input
                          value={data?.price}
                          onChange={(e) => valueChange("price", e.target.value)}
                          placeholder="Enter Cuisine Price"
                        />
                      </div>
                      <div>
                        <label> Cuisine Type</label>
                        <Input
                          value={data?.cuisine_type}
                          onChange={(e) =>
                            valueChange("cuisine_type", e.target.value)
                          }
                          placeholder="Enter Cuisine Type"
                        />
                      </div>
                      <div>
                        <label> Category</label>

                        <Select onValueChange={(value) => setCategory(value)}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a fruit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Category</SelectLabel>
                              {categories?.map((item) => (
                                <SelectItem key={item} value={item}>
                                  {item}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label> Ready Time Unit</label>
                        <Input
                          value={data?.ready_time_unit}
                          onChange={(e) =>
                            valueChange("ready_time_unit", e.target.value)
                          }
                          placeholder="Enter Cuisine Ready time unit"
                        />
                      </div>

                      <div>
                        <Button
                          onClick={handleSubmit}
                          // disabled={loading}
                          className="w-full  bg-primary "
                        >
                          Add Cusiine
                        </Button>
                      </div>
                    </form>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Buka;
