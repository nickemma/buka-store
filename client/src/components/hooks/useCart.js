"use client";
import { useState } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getCookie } from "cookies-next";

const useCart = (quantity, setQuantity, setOpen) => {
  const [cart, setCart] = useState([]);
  const [email, setEmail] = useState("");
  const cartJson = getCookie("cart");
  const carts = cartJson ? JSON.parse(cartJson) : "";
  const router = useRouter();

  const [ticketing, setTicketing] = useState(carts);

  const handleIncrement = (ticketId) => {
    const existingTicketIndex = carts.findIndex(
      (cartTicket) => cartTicket._id === ticketId
    );

    console.log(existingTicketIndex);
    const existingTicke = carts.findIndex(
      (cartTicket) => cartTicket._id === ticketId
    );
    if (existingTicketIndex !== -1) {
      const newCart = [...carts];
      const tickett = [...ticketing];

      const existingCart = newCart[existingTicketIndex];
      console.log(existingCart);
      const existingTicket = tickett[existingTicke];
      console.log(existingCart);
      let minSold = 2;
      if (existingCart.quantity) {
        if (existingCart) {
          existingCart.quantity += 1;
          existingTicket.quantity += 1;
        }
      }
      setCart(newCart);
      setCookie("cart", newCart);
      router.refresh();
    } else {
      const ticket = ticketing.find((ticket) => ticket._id === ticketId);
      const tickett = [...ticketing];
      const ticketIndex = tickett[existingTicke];
      if (ticket) {
        setCart([...cart, { ...ticket, quantity: 1 }]);
        setCookie("cart", [...cart, { ...ticket, quantity: 1 }]);
        router.refresh();

        ticketIndex.quantity = 1;
      }
    }
  };

  const handleDecrement = (ticketId) => {
    const existingTicketIndex = carts.findIndex(
      (cartTicket) => cartTicket._id === ticketId
    );
    const existingTicke = carts.findIndex(
      (cartTicket) => cartTicket._id === ticketId
    );
    if (existingTicketIndex !== -1) {
      const tickett = [...carts];
      const ticketIndex = tickett[existingTicke];

      const newCart = [...carts];
      newCart[existingTicketIndex].quantity -= 1;
      if (newCart[existingTicketIndex].quantity <= 0) {
        newCart.splice(existingTicketIndex, 1);
      }
      setCart(newCart);
      setCookie("cart", newCart);
      router.refresh();
    }
  };
  const handleAddToCart = (x) => {
    const cartJson = getCookie("cart");
    const carts = cartJson ? JSON.parse(cartJson) : "";
    const existingCart = cart.find((cartItem) => cartItem?._id === x._id);
    if (!existingCart) {
      setCart([
        ...carts,
        {
          _id: x._id,
          cuisine_name: x.cuisine_name,
          quantity,
          price: x.price,
          image: x.image,
          cuisine_owner: x?.cuisine_owner._id,
        },
      ]);
      setCookie(
        "cart",
        JSON.stringify([
          ...carts,
          {
            cuisine_owner: x?.cuisine_owner._id,
            _id: x._id,
            cuisine_name: x.cuisine_name,
            quantity,
            price: x.price,
            image: x.image,
          },
        ])
      );
      toast.success(`${quantity} of ${x?.cuisine_name} add to cart`, {
        action: {
          label: "Close",
          onClick: () => console.log("Undo"),
        },
      });
      router.refresh();
      console.log(cart);
      setQuantity(0);
      setOpen(false);
    } else {
      console.log(cart);
      toast.error("Item already exists in cart", {
        action: {
          label: "Close",
          onClick: () => console.log("Undo"),
        },
      });
    }
  };

  return { handleAddToCart, handleIncrement, handleDecrement, cart };
};

export default useCart;
