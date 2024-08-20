"use client";

import { Search, ShoppingCart, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCookie } from "cookies-next";
import Link from "next/link";
const Navbar = () => {
  const cartJson = getCookie("cart");
  const cartLength = cartJson ? JSON.parse(cartJson) : "";
  return (
    <div className="flex justify-between items-center px-3 py-4 ">
      <div>
        <img src="/buka-logo.png" width="120" />
      </div>

      <div className="flex gap-3  ">
        <button className="  flex justify-center items-center rounded md text-sm text-black  ">
          <Search />
        </button>
        <Link
          href="/cart-checkout"
          className="  relative h-[30px] flex justify-center items-center rounded md text-sm text-black   "
        >
          <ShoppingCart />
          <span className="bg-primary rounded-full text-white  w-5 h-5 text-center">
            {cartLength ? cartLength?.length : 0}
          </span>
        </Link>

        <Link
          href="/register"
          className="bg-green-500 w-[100px] h-[30px] flex justify-center items-center rounded md text-sm text-black   "
        >
          Regiser
        </Link>

        {/* <button className="bg-[none] text-black  ">
          <Search />
        </button> */}
        {/* <button className="bg-[none] text-black   ">
          <UserIcon />
        </button> */}
      </div>
    </div>
  );
};
export default Navbar;
