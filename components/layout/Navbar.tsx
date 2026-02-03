"use client";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex items-center gap-6 px-6 py-4">
      
      {/* LEFT SIDE */}
      <Link href="/">Home</Link>

      {/* RIGHT SIDE */}
      <div className="ml-auto flex gap-4 items-center">

        {/* ❌ USER NOT LOGGED IN */}
        {!user && (
          <>
            <Link href="/signup">
              <button className="btn">Generate ID</button>
            </Link>

            <Link href="/login">
              <button className="btn-outline">Login</button>
            </Link>
          </>
        )}

        {/* ✅ USER LOGGED IN */}
        {user && (
          <>
            <Link href="/profile">
              <button className="btn">Garage</button>
            </Link>

            <button onClick={logout} className="btn-outline">
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
}
