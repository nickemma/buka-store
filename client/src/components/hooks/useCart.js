"use client";
import { useState } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useCart = (quantity, setQuantity, setOpen) => {
  const [cart, setCart] = useState([]);
  const [email, setEmail] = useState("");

  const router = useRouter();

  // const ticketWithQuantity = data?.map((ticket) => ({
  //   ...ticket,
  //   quantity: 0,
  // }));

  // const [ticketing, setTicketing] = useState(ticketWithQuantity);

  // const handleIncrement = (ticketId) => {
  //   const existingTicketIndex = cart.findIndex(
  //     (cartTicket) => cartTicket.id === ticketId
  //   );
  //   const existingTicke = ticketing.findIndex(
  //     (cartTicket) => cartTicket.id === ticketId
  //   );
  //   if (existingTicketIndex !== -1) {
  //     const newCart = [...cart];
  //     const tickett = [...ticketing];

  //     const existingCart = newCart[existingTicketIndex];
  //     console.log(existingCart);
  //     const existingTicket = tickett[existingTicke];
  //     console.log(existingCart);
  //     let minSold = 2;
  //     if (existingCart.quantity < existingCart.number_to_be_sold) {
  //       if (existingCart) {
  //         existingCart.quantity += 1;
  //         existingTicket.quantity += 1;
  //       }
  //     }
  //     setCart(newCart);
  //   } else {
  //     const ticket = ticketing.find((ticket) => ticket.id === ticketId);
  //     const tickett = [...ticketing];
  //     const ticketIndex = tickett[existingTicke];
  //     if (ticket) {
  //       setCart([...cart, { ...ticket, quantity: 1 }]);
  //       ticketIndex.quantity = 1;
  //     }
  //   }
  // };

  // const handleDecrement = (ticketId) => {
  //   const existingTicketIndex = cart.findIndex(
  //     (cartTicket) => cartTicket.id === ticketId
  //   );
  //   const existingTicke = ticketing.findIndex(
  //     (cartTicket) => cartTicket.id === ticketId
  //   );
  //   if (existingTicketIndex !== -1) {
  //     const ticket = ticketing.find((ticket) => ticket.id === ticketId);
  //     const tickett = [...ticketing];
  //     const ticketIndex = tickett[existingTicke];

  //     const newCart = [...cart];
  //     ticketIndex.quantity -= 1;
  //     newCart[existingTicketIndex].quantity -= 1;
  //     if (newCart[existingTicketIndex].quantity <= 0) {
  //       newCart.splice(existingTicketIndex, 1);
  //     }
  //     setCart(newCart);
  //   }
  // };
  const handleAddToCart = (x) => {
    const existingCart = cart.find((cartItem) => cartItem?.id === x.id);
    if (!existingCart) {
   
      setCart([...cart, { ...x, quantity }]);
      setCookie("cart", JSON.stringify([...cart, { ...x, quantity }]));
      toast.success(`${quantity} of ${x?.name}add to cart`, {
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

  return { handleAddToCart, cart };
};

export default useCart;
