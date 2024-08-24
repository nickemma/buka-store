"use client";

import { Search, ShoppingCart, CircleUserIcon } from "lucide-react";
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
const Navbar = () => {
  const cartJson = getCookie("cart");
  const cartLength = cartJson ? JSON.parse(cartJson) : "";
  const { cookiesData } = useCookie();
  const router = useRouter();
  console.log(cookiesData);
  return (
    <div className="flex justify-between items-center px-3 py-4 ">
      <div>
        <img src="/buka-logo.png" width="120" />
      </div>

      <div className="flex items-center gap-3  ">
        <Link href={"/cuisine"} className="  flex justify-center items-center rounded md text-sm text-black  ">
          <Search />
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
            href="/register"
            variant="outline"
            className="bg-green-500  w-[100px] h-[30px] flex justify-center items-center rounded md text-sm text-black   "
          >
            Regiser
          </Link>
            <Link
              href="/login"
              className="bg-green-500 w-[100px] h-[30px] flex justify-center items-center rounded md text-sm text-black   "
            >
              Login
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
