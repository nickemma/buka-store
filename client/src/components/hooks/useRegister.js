"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { setCookie } from "cookies-next";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const endpoint = "https://buka-store.vercel.app/api/users/";
const buka_endpoint = "https://buka-store.vercel.app/api/bukas/";

export const useRegister = (
  firstName,
  lastName,
  password,
  email,
  setLoading,
  role,

  bukaName
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

    const checkRole = role === "user" ? "user" : "buka";

    if (role === "user") {
      try {
        if (!firstName || !lastName || !email || !password) {
          toast.error("All fields are required", {
            action: {
              label: "Close",
              onClick: () => console.log("Undo"),
            },
          });
          setLoading(false);
        } else {
          await axios
            .post(
              endpoint + "signup",
              {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
                role: role,
              },
              {
                withCredentials: true,
              }
            )
            .then((res) => {
              setLoading(false);
              toast.success(res?.data?.message, {
                action: {
                  label: "Close",
                  onClick: () => console.log("Undo"),
                },
              });

              console.log(res.data);

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
        }
      } catch (error) {
        console.log(error, "Outside eeror");

        setLoading(false);
        toast.error(error.message, {
          action: {
            label: "Close",
            onClick: () => console.log("Undo"),
          },
        });
        setLoading(false);
      }
    } else {
      try {
        if (!bukaName || !email || !password) {
          toast.error("All fields are required", {
            action: {
              label: "Close",
              onClick: () => console.log("Undo"),
            },
          });
          setLoading(false);
        } else {
          await axios
            .post(
              buka_endpoint + "register",
              {
                buka_name: bukaName,
                email: email,
                password: password,
                role: role,
              },
              {
                withCredentials: true,
              }
            )
            .then((res) => {
              setLoading(false);
              toast.success(res?.data?.message, {
                action: {
                  label: "Close",
                  onClick: () => console.log("Undo"),
                },
              });

              console.log(res.data);

              setCookie("user", JSON.stringify(res.data));
              router.push("/buka");
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
        }
      } catch (error) {
        console.log(error, "Outside eeror");

        setLoading(false);
        toast.error(error.message, {
          action: {
            label: "Close",
            onClick: () => console.log("Undo"),
          },
        });
        setLoading(false);
      }
    }
  };
  return { handleRegister };
};
