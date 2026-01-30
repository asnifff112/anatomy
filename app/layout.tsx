import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothCursor from "@/components/ui/SmoothCursor";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased overflow-x-hidden cursor-none md:cursor-none">
        <SmoothCursor />
        
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}