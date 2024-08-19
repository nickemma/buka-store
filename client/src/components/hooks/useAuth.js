// "use client";
// import { useState, useEffect } from "react";
// import { client } from "@/lib/sanity";
// import axios from "axios";
// import { setCookie } from "cookies-next";
// import { getCookie } from "cookies-next";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// var CryptoJS = require("crypto-js");

// export const register = (
//   firstName,
//   lastName,
//   password,
//   phone,
//   email,
//   setLoading
// ) => {
//   const [disable, setDisable] = useState(true);
//   const router = useRouter();
//   const handleRegister = async (e) => {
//     e.preventDefault();

//     setLoading(true);
//     if (!firstName || !lastName || !password || !phone || !email) {
//       setLoading(false);
//       toast.error("All input are required", {
//         className: "bg-red-500",
//         action: {
//           label: "Close",
//           onClick: () => console.log("Undo"),
//         },
//       });
//     } else {
//       const findUser = await client.fetch(
//         `*[_type == 'user' &&  email == $email] [0]  `,
//         {
//           email: email,
//         }
//       );

//       console.log(findUser);
//       if (findUser) {
//         setLoading(false);
//         toast.error("User Already Exist", {
//           className: "bg-red-500",
//           action: {
//             label: "Close",
//             onClick: () => console.log("Undo"),
//           },
//         });
//         console.log("User already exist");
//       } else {
//         var cyperwif = CryptoJS.AES.encrypt(password, "EMMYDON").toString();

//         const mutations = [
//           {
//             create: {
//               _type: "user",
//               first_name: firstName,
//               last_name: lastName,
//               email: email,
//               phone: phone,
//               verify: false,
//               password: cyperwif,
//             },
//           },
//         ];

//         const response = await client.create({
//           _type: "user",
//           first_name: firstName,
//           last_name: lastName,
//           email: email,
//           phone: phone,
//           verify: false,
//           password: cyperwif,
//         });

//         setCookie(
//           "user",
//           JSON.stringify({
//             firstName,
//             lastName,
//             _id: response._id,
//             phone,
//             email,
//             verify: false,
//           })
//         );

//         console.log(response);
//         const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

//         await client.create({
//           _type: "otp",
//           id: response._id,
//           otp_code: otp,
//         });
//         await axios
//           .post("/api/signup", {
//             otp: otp,
//           })
//           .then((res) => {
//             setLoading(false);

//             router.push("/otp");
//             toast.success("Account created successfull", {
//               action: {
//                 label: "Close",
//                 onClick: () => console.log("Undo"),
//               },
//             });
//           })
//           .catch((err) => console.log(err, "ckmkmdv"));
//       }
//     }
//   };
//   return { handleRegister };
// };
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
// export const login = (email, password, setLoading) => {
//   const router = useRouter();
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const users = await client.fetch(
//       `*[_type == 'user' &&  email == $email] [0]  `,
//       {
//         email: email,
//       }
//     );
//     const professionals = await client.fetch(
//       `*[_type == 'professionals' &&  email == $email] [0]  `,
//       {
//         email: email,
//       }
//     );

//     const data =
//       professionals?._type == "professionals" ? professionals : users;

//     console.log(data, password, email);
//     if (!data) {
//       toast.error("User does not exist.", {
//         action: {
//           label: "Close",
//           onClick: () => console.log("Undo"),
//         },
//       });
//       setLoading(false);
//     } else {
//       var isMatch = CryptoJS.AES.decrypt(data?.password, "EMMYDON").toString(
//         CryptoJS.enc.Utf8
//       );

//       console.log(password, isMatch);

//       if (password !== isMatch) {
//         toast.error("Invalid Credential", {
//           action: {
//             label: "Close",
//             onClick: () => console.log("Undo"),
//           },
//         });
//         setLoading(false);
//       } else {
//         delete data.password;
//         setCookie(
//           "user",
//           JSON.stringify({
//             firstName: data?.first_name,
//             lastName: data?.last_name,
//             _id: data?._id,
//             phone: data?.phone,
//             email: data?.email,
//             verify: data?.verify,
//           })
//         );

//         toast.success("Login Successfuly", {
//           action: {
//             label: "Close",
//             onClick: () => console.log("Undo"),
//           },
//         });

//         if (data?._type == "professionals") {
//           router.push("/consultant/dashboard");
//         } else {
//           router.push("/user");
//         }
//         setLoading(false);
//       }
//     }
//   };

//   return { handleLogin };
// };
