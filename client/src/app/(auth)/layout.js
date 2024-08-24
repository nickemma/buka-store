import { Inter } from "next/font/google";
import "./../layout";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Buka Store",
  description:
    "This project is a full-stack application developed using Next.js, TypeScript, Tailwind CSS, Node.js, Express.js, MongoDB, and a payment gateway. It aims to provide a seamless food e-commerce experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <Navbar />
          <section>{children}</section>
        </div>

        <div>
   
        </div>
      </body>
    </html>
  );
}
