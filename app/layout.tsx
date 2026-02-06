"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/app/context/AuthContext";
import { usePathname } from "next/navigation"; 
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <body className="bg-black text-white antialiased overflow-x-hidden">
        <AuthProvider>
          {/* അഡ്മിൻ പേജ് അല്ലെങ്കിൽ മാത്രം നാവ് ബാർ കാണിക്കും */}
          {!isAdminPage && <Navbar />}

          {children}

          {/* അഡ്മിൻ പേജ് അല്ലെങ്കിൽ മാത്രം ഫൂട്ടർ കാണിക്കും */}
          {!isAdminPage && <Footer />}
        </AuthProvider>
      </body>
    </html>
  );
}