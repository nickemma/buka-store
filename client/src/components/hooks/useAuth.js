"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { setCookie } from "cookies-next";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const endpoint = "https://buka-store.vercel.app/";

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
        .get(endpoint + "/register", {
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
      toast.error(error, {
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
// export const verifyOtp = (otp, setLoading) => {
//   const cookie = getCookie("user");
//   const data = cookie ? JSON.parse(cookie) : "";
//   const router = useRouter();

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     if (!data._id || !otp) {
//       setLoading(false);
//       toast.error("Empty otp details are not allowed", {
//         className: "bg-red-500",
//         action: {
//           label: "Close",
//           onClick: () => console.log("Undo"),
//         },
//       });
//     } else {
//       const userOtpVerificationRecord = await client.fetch(
//         `*[_type == 'otp' &&  id == $_id] [0]  `,
//         {
//           _id: data._id,
//         }
//       );

//       if (userOtpVerificationRecord <= 0) {
//         console.log(
//           "Account record doesn't exist or has been verified already. please signup or signin"
//         );
//         setLoading(false);
//         toast.error(
//           "Account record doesn't exist or has been verified already. please signup or signin",
//           {
//             className: "bg-red-500",
//             action: {
//               label: "Close",
//               onClick: () => console.log("Undo"),
//             },
//           }
//         );
//       } else {
//         const ottp = otp;

//         if (ottp != userOtpVerificationRecord?.otp_code) {
//           setLoading(false);
//           toast.error("Invalid code Passed, check your inbox", {
//             className: "bg-red-500",
//             action: {
//               label: "Close",
//               onClick: () => console.log("Undo"),
//             },
//           });
//         } else {
//           const _id = data._id;

//           client
//             .patch(_id)
//             .set({
//               verify: true,
//             })
//             .commit();

//           const datas = await client.fetch(
//             `*[_type == 'user' &&  email == $email] [0]  `,
//             {
//               email: data.email,
//             }
//           );

//           console.log(datas);
//           client.delete(userOtpVerificationRecord._id);
//           setLoading(false);
//           router.push("/user");
//           toast.success("Account verified successfully", {
//             action: {
//               label: "Close",
//               onClick: () => console.log("Undo"),
//             },
//           });
//         }
//       }
//     }
//   };

//   return { handleVerify, data };
// };
export const useLogin = (email, password, setLoading) => {
  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios
        .get(endpoint + "/login", {
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
          if (res.data?.user?.role == "user") {
            router.push("/user");
          } else {
            router.push("/buka");
          }
          router.refresh();
        });
    } catch (error) {
      setLoading(false);
      toast.error(error, {
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
