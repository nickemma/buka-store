"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import { toast } from "sonner";
const endpoint = "https://buka-store.vercel.app/api/users/";

function Settings() {
  const [loading, setLoading] = useState(false);
  const cookie = getCookie("user");
  const myData = cookie ? JSON.parse(cookie) : "";
  const router = useRouter();
  const [data, setData] = useState(myData?.user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  };

  const valueChange = (fieldName, value) => {
    setData((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios
        .patch(endpoint + "updateuser", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then((res) => {
          setLoading(false);
          console.log(res.data);
          toast.success("Update successfully", {
            action: {
              label: "Close",
              onClick: () => console.log("Undo"),
            },
          });
          setCookie("user", JSON.stringify(res.data));
          router.push("/");
          router.refresh();
        })
        .catch((err) => {
          console.log(err, "Catch eeror");
          toast.error(
            <div>
              {err.response.data.errors
                ? err.response.data.errors.map((item) => item)
                : err.response.data.message}
            </div>,
            {
              action: {
                label: "Close",
                onClick: () => console.log("Undo"),
              },
            }
          );
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      toast.error(error.message, {
        className: "bg-red-500",
        action: {
          label: "Close",
          onClick: () => console.log("Undo"),
        },
      });
    }
  };

  return (
    <div>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="">
          <h1 className="text-lg font-semibold md:text-2xl">
            Account Settings
          </h1>
        </div>
        <div className=" rounded-lg border border-dashed shadow-sm">
          <div className="">
            <div className="bg-white  px-4 py-3 rounded-md">
              <div className="grid  md:grid-cols-2 gap-3">
                <div>
                  <abel className="text-[0.8rem] font-semibold">
                    First Name
                  </abel>
                  <Input
                    value={data?.first_name}
                    onChange={(e) => valueChange("first_name", e.target.value)}
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <abel className="text-[0.8rem] font-semibold">Last Name</abel>
                  <Input
                    value={data?.last_name}
                    onChange={(e) => valueChange("last_name", e.target.value)}
                    placeholder="Last Name"
                  />
                </div>
                <div>
                  <abel className="text-[0.8rem] font-semibold">
                    Phone Number
                  </abel>

                  <Input
                    value={data?.phone}
                    onChange={(e) => valueChange("phone", e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <abel className="text-[0.8rem] font-semibold">Email</abel>

                  <Input
                    value={data?.email}
                    onChange={(e) => valueChange("email", e.target.value)}
                    placeholder="Email"
                  />
                </div>
              </div>

              <div className="mt-5 m-auto flex justify-center">
                <Button onClick={handleUpdate} className="w-full md:w-40">
                  {loading ? <PuffLoader size={20} /> : "Next"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Settings;
