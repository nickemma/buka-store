"use client";
import { useState } from "react";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/components/hooks/useAuth";
import PuffLoader from "react-spinners/PuffLoader";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
export default function page() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { handleLogin } = login(email, password, setLoading);

  return (
    <section className="h-screen grid grid-cols-1  md:grid-cols-2  gap-5">
      <div className="bg-[#2e37a4] hidden  md:flex items-center justify-center h-full rounded-r-20 rounded-e-[100px]  ">
        <div>
          <Image src="/Consulting.svg" width="600" height="600" />
        </div>
      </div>

      <div className=" h-full w-full flex justify-center items-center  ">
        <div className="bg-white w-full md:w-[500px]  rounded-md px-5 py-7">
          <Image src="/logoo.png" width="200" height="200" />
          <h2 className="text-[1.7rem] font-semibold my-6">Login</h2>

          <form className="flex flex-col gap-4">
            <div>
              <abel>Email</abel>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div>
              <abel>Password</abel>
              <Input
                placeholder="Enter your full name"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between  items-center gap-3 leading-none">
              <label
                htmlFor="terms1"
                className="text-sm flex items-center gap-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <Checkbox id="terms1" />
                Remember me
              </label>
              <div>
                <Link href="#" className="text-[#2e37a4] font-semibold text-sm">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <div>
              <Button
                onClick={handleLogin}
                disabled={loading}
                className="w-full  bg-[#2e37a4] "
              >
                {loading ? <PuffLoader size={25} color={"#fff"} /> : "Login"}
              </Button>
            </div>
            <div className="flex gap-3 leading-none">
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Need an account{"  "}
                <Link href="/register" className="text-[#2e37a4] font-semibold">
                  Sign Up
                </Link>{" "}
              </label>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
