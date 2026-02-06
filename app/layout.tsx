"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/app/context/AuthContext";
import { usePathname } from "next/navigation"; 
import "./globals.css";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <body className="bg-black text-white antialiased overflow-x-hidden">
        <AuthProvider>
          <Toaster position="top-center" reverseOrder={false} />
          {!isAdminPage && <Navbar />}
          {children}
          {!isAdminPage && <Footer />}
        </AuthProvider>
      </body>
    </html>
  );
}