"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/app/context/AuthContext";
import { usePathname } from "next/navigation"; // പാത്ത് ചെക്ക് ചെയ്യാൻ ഇത് വേണം
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // URL "/admin" എന്ന് തുടങ്ങുന്നുണ്ടോ എന്ന് നോക്കുന്നു
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