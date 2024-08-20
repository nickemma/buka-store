"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { setCookie } from "cookies-next";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const endpoint = "https://buka-store-client.vercel.app/api/users/";

export const useRegister = (
  firstName,
  lastName,
  password,
  phone,
  email,
  setLoading,
  role
) => {
  const [disable, setDisable] = useState(true);
  const router = useRouter();
  console.log({
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password,
    role: role,
  });
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios
        .post(endpoint + "signup", {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          role: role,
        })
        .then((res) => {
          setLoading(false);
          console.log(res.data);
          toast.success("Account created successfully", {
            className: "bg-red-500",
            action: {
              label: "Close",
              onClick: () => console.log("Undo"),
            },
          });

          setCookie("user", JSON.stringify(res.data));
          if (res.data?.user?.role == "user") {
            router.push("/user");
          } else {
            router.push("/buka");
          }
          router.refresh();
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
  return { handleRegister };
};
