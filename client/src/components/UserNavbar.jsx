import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserNavbar = () => {
  const [preOrder, setPreOrder] = useState(false);
  const [cookies, removeCookie] = useCookies(["user"]);

  const router = useNavigate();
  const handleToggle = () => {
    setPreOrder(!preOrder);
  };

  const isUserLoggedIn =
    cookies.user && cookies.user !== "undefined" && cookies.user !== null;

  return (
    <div className="flex justify-between items-center px-3 py-4 ">
      <Link to="/">
        <div>
          <img src="/buka-logo.png" width="120" />
        </div>
      </Link>

      <div className="flex items-center gap-3  ">
        <div
          className={`relative w-32 h-10 rounded-full p-1 cursor-pointer transition-all duration-300 ${
            preOrder ? "bg-green-600" : "bg-gray-300"
          }`}
          onClick={handleToggle}
        >
          <div
            className={`absolute w-1/2 h-[80%] rounded-full bg-white transition-transform duration-300 ${
              preOrder ? "translate-x-full" : "translate-x-0"
            }`}
          ></div>
          <span
            className={`absolute inset-0 flex items-center justify-center font-medium transition-opacity duration-300 ${
              preOrder ? "opacity-0" : "opacity-100"
            }`}
          >
            Order Now
          </span>
          <span
            className={`absolute inset-0 flex items-center justify-center font-medium transition-opacity duration-300 ${
              preOrder ? "opacity-100" : "opacity-0"
            }`}
          >
            Pre-Order
          </span>
        </div>

        <Link
          to="/cuisine"
          className=" flex justify-center items-center rounded md text-[1.2rem] text-black  "
        >
          Catering
        </Link>
        {isUserLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-1">
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <img
                    src={cookies?.user?.image}
                    className="h-5 w-5 rounded-full"
                  />
                </Button>
                <span className="hidden md:block text-sm font-medium">
                  {cookies?.user?.first_name}
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                {" "}
                <Link
                  to={
                    cookies?.user?.first_name
                      ? "/user/settings"
                      : "/buka/settings"
                  }
                >
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 hover:text-red-600"
                onClick={() => {
                  removeCookie("user");
                  router("/");
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex gap-2">
            <Link
              to="/login"
              className="bg-green-500 w-[100px] h-[30px] flex justify-center items-center rounded md text-sm text-black   "
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserNavbar;
