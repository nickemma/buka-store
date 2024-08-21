"use client";
import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  BellIcon,
  CircleUserIcon,
  HomeIcon,
  LineChartIcon,
  MenuIcon,
  Package2Icon,
  PackageIcon,
  SearchIcon,
  Settings,
  ShoppingCartIcon,
  UsersIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";

function UserBar() {
  const path = usePathname();
  console.log(path);
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link
            href="/buka"
            className="flex items-center gap-2 font-semibold"
            prefetch={false}
          >
            <img src="/buka-logo.png" width={100} height={100} />
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/buka"
              className={
                path == "/buka"
                  ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                  : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              }
              prefetch={false}
            >
              <HomeIcon className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/buka/orders"
              className={
                path == "/buka/orders"
                  ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                  : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              }
              prefetch={false}
            >
              <ShoppingCartIcon className="h-4 w-4" />
              Orders
              {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                6
              </Badge> */}
            </Link>
            <Link
              href="/buka/settings"
              className={
                path == "/buka/settings"
                  ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                  : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              }
              prefetch={false}
            >
              <Settings className="h-4 w-4" />
              Settings{" "}
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4"></div>
      </div>
    </div>
  );
}

export default UserBar;

export const Navbar = () => {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="/buka"
              className="flex items-center gap-2 text-lg font-semibold"
              prefetch={false}
            >
              <img src="/buka-logo.png" width={100} height={100} />
            </Link>
            <Link
              href="/buka"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              <HomeIcon className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
              prefetch={false}
            >
              <ShoppingCartIcon className="h-5 w-5" />
              Orders
         
            </Link>

            <Link
              href="/buka/settings"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <form></form>
      </div>
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
    </header>
  );
};
