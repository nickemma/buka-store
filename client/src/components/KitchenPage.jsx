import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate } from "react-router-dom";
import { MinusCircle, PinIcon, PlusCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import { Label } from "@radix-ui/react-label";
import useCuisine from "./hooks/useCuisine";
import { useParams } from "react-router-dom";
import { useCartStore } from "@/store/CartStore";
import { useCookies } from "react-cookie";
import axios from "axios";

const endpoint = "https://buka-store.vercel.app/api/users/getuser";

function KitchenPage() {
  const [cookies] = useCookies(["user"]);
  const navigate = useNavigate();

  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [userData, setUserData] = useState([]);

  const { cart, addToCart, incrementItem, decrementItem } = useCartStore();

  const total = cart?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const { data } = useCuisine();

  // Filter cuisines based on the kitchen ID
  const filteredCuisines = data?.filter((x) => x?.cuisine_owner?._id === id);

  // Extract owner information from the first cuisine item
  const owner =
    filteredCuisines.length > 0 ? filteredCuisines[0].cuisine_owner : {};

  // Group cuisines by category
  const categories = {};
  filteredCuisines.forEach((item) => {
    const category = item.cuisine_category;
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(item);
  });

  const getUser = async () => {
    try {
      const response = await axios.get(endpoint, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies?.user?.token}`,
        },
      });
      setUserData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleCheckout = () => {
    if (userData === undefined) {
      navigate("/user/checkout");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="px-3">
        <div className="w-full h-[400px] relative">
          <img
            src="/food-buka.png"
            className="w-full h-[400px] object-cover "
          />
          <div className="absolute w-full flex text-center justify-center m-auto -bottom-10 left-0">
            <div className="w-full mx-3 md:w-[400px] shadow-md h-[200px] flex flex-col items-center justify-center rounded-md bg-white">
              {!isModalOpen && (
                <div className="mb-3">
                  <h2 className="text-[1.1rem]">{owner?.buka_name}</h2>
                  <span className="text-[0.8rem] py-3 flex items-center">
                    <PinIcon />
                    {owner?.address}
                  </span>
                  <div className="flex gap-5 text-center">
                    <div>
                      <h2 className="underline text-[0.7rem]">Opening Time</h2>
                      <span className="text-sm font-semibold">
                        {owner?.opening_time || "8am - 10pm"}
                      </span>
                    </div>
                    <div>
                      <h2 className="underline text-[0.7rem]">Delivery Time</h2>
                      <span className="text-sm font-semibold">
                        {owner?.delivery_time || "10 - 45 mins"}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => setIsModalOpen(true)} className="mt-1">
                    Write a Review
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 my-14 gap-3 ">
          <div className="border rounded-md p-3">
            <h1 className="text-xl font-bold">Available Categories</h1>
            <div className="flex flex-col gap-2 mt-3">
              <RadioGroup>
                {Object.keys(categories).map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={category}
                      id={`category-${category}`}
                    />
                    <Label htmlFor={`category-${category}`}>{category}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>

          <div className="border rounded-md p-3">
            <div className="space-y-4">
              {Object.keys(categories).map((category) => (
                <div key={category}>
                  <h2 className="text-lg font-bold">{category}</h2>
                  {categories[category].map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.cuisine_name}
                          width={50}
                          height={50}
                          className="rounded-md object-cover"
                          style={{ aspectRatio: "64/64", objectFit: "cover" }}
                        />
                        <div>
                          <h3 className="text-[0.7rem] font-bold">
                            {item.cuisine_name}
                          </h3>
                          <p className="font-medium">
                            ${item.price.toFixed(2)}
                          </p>
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
                </div>
              ))}
            </div>

            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogContent className="text-center">
                <AlertDialogHeader>
                  <AlertDialogTitle>{selected?.cuisine_name}</AlertDialogTitle>
                </AlertDialogHeader>
                <img src={selected?.image} alt={selected?.cuisine_name} />
                <h3 className="text-[1rem] font-bold">${selected?.price}</h3>
                <div>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      disabled={quantity <= 0}
                      onClick={() => {
                        if (quantity > 0) {
                          setQuantity((pre) => pre - 1);
                        }
                      }}
                    >
                      <MinusCircle size={"20"} />
                    </button>
                    <h3 className="text-[1rem] font-bold text-primary">
                      {quantity}
                    </h3>
                    <button onClick={() => setQuantity((pre) => pre + 1)}>
                      <PlusCircle size={"20"} />
                    </button>
                  </div>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button
                    onClick={() => {
                      addToCart({ ...selected, quantity });
                      setOpen(false);
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
                {cart.length === 0 ? (
                  <div className="h-[150px] flex flex-col items-center justify-center">
                    <h2 className="text-lg font-bold text-primary">
                      Your Cart is Empty
                    </h2>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.cuisine_name}
                          width={56}
                          height={56}
                          className="rounded-md object-cover"
                          style={{ aspectRatio: "64/64", objectFit: "cover" }}
                        />
                        <div>
                          <h3 className="font-medium text-[0.7rem]">
                            {item.cuisine_name}
                          </h3>
                          <p className="text-muted-foreground">
                            ${item?.price} x {item?.quantity}
                          </p>
                          <div className="flex items-center gap-3">
                            <button
                              disabled={item?.quantity <= 0}
                              onClick={() => decrementItem(item?._id)}
                            >
                              <MinusCircle size={"20"} />
                            </button>
                            <h3 className="text-[1rem] font-bold text-primary">
                              {item?.quantity}
                            </h3>
                            <button onClick={() => incrementItem(item._id)}>
                              <PlusCircle size={"20"} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div>${(item?.price * item?.quantity).toFixed(2)}</div>
                    </div>
                  ))
                )}
              </div>
              {cart.length > 0 && (
                <div className="space-y-6">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Subtotal:</h3>
                    <h3 className="font-medium">${total?.toFixed(2)}</h3>
                  </div>
                  <div className="flex items-center justify-center">
                    <Button onClick={handleCheckout} className="w-full">
                      {userData ? "Checkout" : "Login"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default KitchenPage;
