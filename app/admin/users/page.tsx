"use client";
import { useEffect, useState } from "react";
import { UserX, ShieldCheck } from "lucide-react";

export default function UserDetails() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/users").then(res => res.json()).then(setUsers);
  }, []);

  return (
    <div className="p-8 space-y-8 bg-[#0a0a0c] min-h-screen text-white">
      <h1 className="text-3xl font-black uppercase tracking-tighter text-blue-500">Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {users.map((user: any) => (
          <div key={user.id} className="bg-[#141417] p-6 rounded-2xl border border-white/5 flex items-center justify-between">
            <div>
              <h3 className="font-bold">{user.name}</h3>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <button className={`p-3 rounded-xl ${user.status === "Active" ? "bg-red-500/10 text-red-500" : "bg-green-500/10 text-green-500"}`}>
              {user.status === "Active" ? <UserX size={18}/> : <ShieldCheck size={18}/>}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}