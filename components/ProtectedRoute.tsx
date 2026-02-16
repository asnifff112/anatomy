"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    
    const user = localStorage.getItem("anatomy_admin");

    if (!user) {
      
      router.push("/login");
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  if (!isAuthorized) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center">
        <p className="text-blue-500 font-mono animate-pulse">AUTHENTICATING_SESSION...</p>
      </div>
    );
  }

  return <>{children}</>;
}