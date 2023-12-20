import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import RegisterModal from "./components/models/RegisterModal";
import Navbar from "./components/navbar/Navbar";
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
    //remove changes
    <html lang="en">
      <body className={inter.className}>
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
