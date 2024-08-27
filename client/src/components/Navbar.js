"use client";

import { Button } from "@/components/ui/button";
import { deleteCookie, getCookie } from "cookies-next";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
const Navbar = () => {
  const [preOrder, setPreOrder] = useState(false);

  const handleToggle = () => {
    setPreOrder(!preOrder);
  };
  const cartJson = getCookie("cart");
  const cartLength = cartJson ? JSON.parse(cartJson) : "";
  const { cookiesData } = useCookie();
  const router = useRouter();

  return (
    <div className="flex justify-between items-center px-3 py-4 ">
      <div>
        <img src="/buka-logo.png" width="120" />
      </div>

      <div className="flex items-center gap-3  ">
        <div
      className={`relative w-32 h-10 rounded-full p-1 cursor-pointer transition-all duration-300 ${
        preOrder ? 'bg-green-600' : 'bg-gray-300'
      }`}
      onClick={handleToggle}
    >
      <div
        className={`absolute w-1/2 h-[80%] rounded-full bg-white transition-transform duration-300 ${
          preOrder ? 'translate-x-full' : 'translate-x-0'
        }`}
      ></div>
      <span
        className={`absolute inset-0 flex items-center justify-center font-medium transition-opacity duration-300 ${
          preOrder ? 'opacity-0' : 'opacity-100'
        }`}
      >
        Order Now
      </span>
      <span
        className={`absolute inset-0 flex items-center justify-center font-medium transition-opacity duration-300 ${
          preOrder ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Pre-Order
      </span>
    </div>
        <Link href={"/cuisine"} className="  flex justify-center items-center rounded md text-sm text-black  ">
         Catering
        </Link>

        {cookiesData ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-1">
               <Button variant="secondary" size="icon" className="rounded-full">
                <img src={cookiesData?.user?.image} className="h-5 w-5 rounded-full" />
              </Button>
                 <span className="hidden md:block text-sm font-medium">{cookiesData?.user?.first_name}</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <Link href={cookiesData?.user?.first_name ? "/user" : "/buka"}>
                  My Account
                </Link>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {" "}
                <Link
                  href={
                    cookiesData?.user?.first_name
                      ? "/user/settings"
                      : "/buka/settings"
                  }
                >
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 hover:text-red-600"
                onClick={() => {
                  deleteCookie("user");
                  router.refresh();
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex gap-2">
            <Link
              href="/login"
              className="bg-green-500 w-[100px] h-[30px] flex justify-center items-center rounded md text-sm text-black   "
            >
              Login
            </Link>
          </div>
        )}

        {/* <button className="bg-[none] text-black   ">
          <UserIcon />
        </button> */}
      </div>
    </div>
  );
};
export default Navbar;
