"use client";

import { Search, ShoppingCart, CircleUserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCookie } from "cookies-next";
import useCookie from "@/components/hooks/useCookie";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const Navbar = () => {
  const cartJson = getCookie("cart");
  const cartLength = cartJson ? JSON.parse(cartJson) : "";
  const { cookiesData } = useCookie();

  console.log(cookiesData);
  return (
    <div className="flex justify-between items-center px-3 py-4 ">
      <div>
        <img src="/buka-logo.png" width="120" />
      </div>

      <div className="flex items-center gap-3  ">
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

        {cookiesData ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUserIcon className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div>
            <Link
              href="/register"
              className="bg-green-500 w-[100px] h-[30px] flex justify-center items-center rounded md text-sm text-black   "
            >
              Regiser
            </Link>
          </div>
        )}

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
