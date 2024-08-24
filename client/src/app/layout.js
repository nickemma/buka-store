import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Buka Store",
  description:
    "This project is a full-stack application developed using Next.js, TypeScript, Tailwind CSS, Node.js, Express.js, MongoDB, and a payment gateway. It aims to provide a seamless food e-commerce experience.",
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <section>{children}</section>
        </div>

        <div>
          <Toaster
            toastOptions={{
              classNames: {
                error: "bg-red-400",
                success: "bg-green-500",
                warning: "bg-yellow-500",
                info: "bg-blue-400",
              },
            }}
          />
        </div>
      </body>
    </html>
  );
}
