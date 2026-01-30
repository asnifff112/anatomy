import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "ANATOMY | Experience Tech",
  description: "High-end product deconstruction experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased selection:bg-white selection:text-black">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}