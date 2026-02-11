"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/app/context/AuthContext";
import { usePathname } from "next/navigation"; 
import "./globals.css";
import { Toaster } from "react-hot-toast";
import TargetCursor from "@/components/ui/TargetCursor";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <body className="bg-black text-white antialiased overflow-x-hidden">
        <AuthProvider>
          <Toaster position="top-center" reverseOrder={false} />
          
          
              <TargetCursor 
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
  hoverDuration={0.2}
/>
          

          {!isAdminPage && <Navbar />}
          
          <main className="min-h-screen">
            {children}
          </main>

          {!isAdminPage && <Footer />}
        </AuthProvider>
      </body>
    </html>
  );
}