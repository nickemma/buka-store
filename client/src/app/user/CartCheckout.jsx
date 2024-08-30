import { useState } from "react";
import { Button } from "@/components/ui/button";

import { useCookies } from "react-cookie";
import { MinusCircle, PlusCircle } from "lucide-react";
import axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";
import { Link } from "react-router-dom";
import { useCartStore } from "@/store/CartStore";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";

const endpoint = "https://buka-store.vercel.app/api/orders";
// const endpoint = "http://localhost:5000/api/orders";

const CartCheckout = () => {
  // fetching cuisines from cookies
  const [cookies] = useCookies(["user"]);
  // fetching user information from cookies
  const userJson = cookies?.user;
  const [loading, setLoading] = useState(false);
  const { cart, incrementItem, decrementItem } = useCartStore();

  const total = cart?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51MOfapIgrifBGT4dyD6usmKJYxwo1wVrP3Icn7qt0spq6ol8E3HANGZAazjf68mJ2UGMhuoogNe9HOEheedQ2m1V00VsKHfZbQ"
    );

    try {
      const response = await axios.post(
        endpoint + `create-checkout-session`,
        cart.map((item) => ({
          cuisine_id: item._id,
          name: item?.cuisine_name,
          image: item?.image,
          price: item?.price,
          quantity: item.quantity,
        })),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userJson?.token}`,
          },
        }
      );
      const { id, orderId } = response.data;

      const result = await stripe.redirectToCheckout({
        sessionId: id,
      });

      if (response?.data) {
        localStorage.removeItem("cart");
        updateTransaction(orderId);
      }

      if (result.error) {
        console.error("Stripe Checkout Error:", result.error.message);
      }
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  const updateTransaction = async (orderId) => {
    await axios
      .patch(
        endpoint + `update/${orderId}`,
        {
          is_paid: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userJson?.token,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        toast.success("Payment successfully", {
          action: {
            label: "Close",
            onClick: () => console.log("Undo"),
          },
        });
      })
      .catch((err) => {
        console.log(err, "Catch error");
        toast.error(
          <div>
            {err?.response.data.errors
              ? err?.response.data.errors.map((item) => item)
              : err?.response.data.message}
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
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Your Cart</h1>
          <div className="space-y-4">
            {cart?.length <= 0 ? (
              <div className="h-[150px] flex flex-col items-center justify-center">
                <h2 className="text-lg font-bold">Your Cart is Empty</h2>

                <Link href="/cuisine">
                  <Button>Continue Shopping</Button>
                </Link>
              </div>
            ) : (
              cart?.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item?.image}
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
                {userJson?.first_name + " " + userJson?.last_name}
              </span>
            </div>
            <div className=" flex justify-between">
              <p className="font-bold">Email</p>{" "}
              <span className="text-primary">{userJson?.email}</span>
            </div>
            <div className=" flex justify-between">
              <Button className="w-full mt-6" onClick={makePayment}>
                {loading ? <PuffLoader size={25} color={"#fff"} /> : "Checkout"}
              </Button>
            </div>
          </di>
        </div>
      </div>
    </div>
  );
};

export default CartCheckout;
