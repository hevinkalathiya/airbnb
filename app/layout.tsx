import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";

const inter = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Airbnb: Vacation Rentals, Cabins, Beach Houses, Unique Homes & Experiences",
  description:
    "Airbnb: Vacation Rentals, Cabins, Beach Houses, Unique Homes & Experiences",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
