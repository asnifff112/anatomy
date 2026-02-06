"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { UserX, ShieldCheck, Mail, Heart } from "lucide-react";

export default function UserDetails() {
  const root = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".user-card", { opacity: 0, scale: 0.9, stagger: 0.15, duration: 0.7, ease: "back.out(1.7)" });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="p-8 space-y-8 bg-[#0a0a0c] min-h-screen text-white">
      <h1 className="text-3xl font-black uppercase tracking-tighter text-blue-500">User Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: "Asnif", email: "asnif@anatomy.com", wish: 12, status: "Active" },
          { name: "Rahul", email: "rahul@test.com", wish: 5, status: "Active" },
          { name: "Siddharth", email: "sid@dev.com", wish: 0, status: "Blocked" },
        ].map((user, i) => (
          <div key={i} className="user-card bg-[#141417] p-6 rounded-2xl border border-white/5 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-blue-600/20 text-blue-500 rounded-full flex items-center justify-center font-black text-xl">
                {user.name[0]}
              </div>
              <div>
                <h3 className="font-bold text-lg">{user.name}</h3>
                <p className="text-xs text-gray-500 flex items-center gap-1"><Mail size={12}/> {user.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-[10px] font-bold text-pink-500 uppercase flex items-center gap-1"><Heart size={10}/> Wishlist</p>
                <p className="text-xl font-black">{user.wish}</p>
              </div>
              <button className={`p-3 rounded-xl transition-all ${user.status === "Active" ? "bg-red-500/10 text-red-500 hover:bg-red-500" : "bg-green-500/10 text-green-500 hover:bg-green-500"} hover:text-white`}>
                {user.status === "Active" ? <UserX size={18}/> : <ShieldCheck size={18}/>}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}