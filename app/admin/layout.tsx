"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    
    const isAuthenticated = localStorage.getItem("isLoggedIn");

    if (isAuthenticated !== "true") {
     
      router.replace("/login"); 
    } else {
      setAuthorized(true);
    }
  }, [router]);

  
  if (!authorized) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-blue-500 font-mono tracking-widest animate-pulse">
          SYSTEM_ACCESS_CHECKING...
        </div>
      </div>
    );
  }

  return <section>{children}</section>;
}