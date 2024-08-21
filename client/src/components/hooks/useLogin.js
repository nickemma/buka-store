"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { setCookie } from "cookies-next";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const endpoint = "https://buka-store.vercel.app/api/users/";

export const useLogin = (email, password, setLoading) => {
  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios
        .post(endpoint + "signin", {
          password,
          email,
        })
        .then((res) => {
          setLoading(false);
          console.log(res.data);
          toast.success("Login successfully", {
            className: "bg-red-500",
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

  return { handleLogin };
};
