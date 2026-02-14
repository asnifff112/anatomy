"use client";
import { useEffect, useState } from "react";
import { UserX, ShieldCheck, ShieldAlert } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Blocked";
  role: string;
}

export default function UserDetails() {
  const [users, setUsers] = useState<User[]>([]);

 
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then(setUsers)
      .catch((err) => console.error("Error loading users:", err));
  }, []);

 
  const toggleUserStatus = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "Active" ? "Blocked" : "Active";

    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "PATCH", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, status: newStatus as any } : u))
        );
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="p-8 space-y-8 bg-[#0a0a0c] min-h-screen text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black uppercase tracking-tighter text-blue-500">
          User_Management.sys
        </h1>
        <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
          Total_Units: {users.length}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className={`bg-[#141417] p-6 rounded-2xl border transition-all ${
              user.status === "Blocked" ? "border-red-500/20 opacity-60" : "border-white/5"
            } flex items-center justify-between group`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${user.status === "Active" ? "bg-blue-500/10" : "bg-red-500/10"}`}>
                <div className={`w-2 h-2 rounded-full animate-pulse ${user.status === "Active" ? "bg-blue-500" : "bg-red-500"}`} />
              </div>
              <div>
                <h3 className="font-bold flex items-center gap-2 uppercase tracking-tight">
                  {user.name}
                  {user.role === "Admin" && (
                    <span className="text-[9px] bg-blue-600 text-white px-2 py-0.5 rounded italic">ADMIN</span>
                  )}
                </h3>
                <p className="text-xs text-gray-500 font-mono">{user.email}</p>
              </div>
            </div>

            {user.role !== "Admin" ? (
              <button
                onClick={() => toggleUserStatus(user.id, user.status)}
                className={`p-3 rounded-xl transition-all active:scale-90 ${
                  user.status === "Active" 
                  ? "bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white shadow-[0_0_15px_rgba(239,68,68,0.1)]" 
                  : "bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white shadow-[0_0_15px_rgba(34,197,94,0.1)]"
                }`}
                title={user.status === "Active" ? "Block User" : "Unblock User"}
              >
                {user.status === "Active" ? <UserX size={20} /> : <ShieldCheck size={20} />}
              </button>
            ) : (
              <div className="p-3 text-gray-700 cursor-not-allowed" title="Admin cannot be modified">
                <ShieldAlert size={20} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}