import { Inter } from "next/font/google";
import ".././globals.css";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import BukaBar, { Navbar } from "@/components/bars/BukaBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Buka Store",
  description:
    "This project is a full-stack application developed using Next.js, TypeScript, Tailwind CSS, Node.js, Express.js, MongoDB, and a payment gateway. It aims to provide a seamless food e-commerce experience.",
};

export default function RootLayout({ children }) {

  const user = cookies().get("user");
  const getUser = user ? JSON.parse(user.value) : null;

  if (!getUser?.user?.business_name && !getUser?.user?.token) {
    redirect("/login");
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <BukaBar />
          <div className="flex flex-col">
            <Navbar />

            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
