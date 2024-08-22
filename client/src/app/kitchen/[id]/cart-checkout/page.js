import { CartCheckout } from "@/components/component/cart-checkout";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

function page({ params }) {
  const { id } = params;
  const user = cookies().get("user");
  const getUser = user ? JSON.parse(user.value) : null;

  if (!getUser?.user?.first_name && !getUser?.user?.token) {
    redirect("/login");
  }
  return (
    <div>
      <CartCheckout id={id} />
    </div>
  );
}

export default page;
