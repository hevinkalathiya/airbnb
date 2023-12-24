import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import RegisterModal from "./pages/models/RegisterModal";
import Navbar from "./pages/navbar/Navbar";
import { Toaster } from "react-hot-toast";
import LoginModal from "./pages/models/LoginModal";
import { getCurrentUser } from "./actions/getCurrentUser";
import RentModal from "./pages/models/RentModal";

const inter = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Airbnb: Vacation Rentals, Cabins, Beach Houses, Unique Homes & Experiences",
  description:
    "Airbnb: Vacation Rentals, Cabins, Beach Houses, Unique Homes & Experiences",
};
export const dynamic = "force-dynamic"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <LoginModal />
        <RegisterModal />
        <RentModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
