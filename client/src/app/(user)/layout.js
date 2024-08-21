import { Inter } from "next/font/google";
import ".././globals.css";
import UserBar, { Navbar } from "@/components/bars/UserBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard",
  description:
    "This project is a full-stack application developed using Next.js, TypeScript, Tailwind CSS, Node.js, Express.js, MongoDB, and a payment gateway. It aims to provide a seamless food e-commerce experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <UserBar />
          <div className="flex flex-col">
            <Navbar />

            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
