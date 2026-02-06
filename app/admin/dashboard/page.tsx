"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Users, Car, Heart, Activity, ArrowUpRight } from "lucide-react";

export default function AdminDashboard() {
  const root = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".stat-card", { opacity: 0, y: 30, stagger: 0.2, duration: 1, ease: "power4.out" });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="p-8 space-y-8 bg-[#0a0a0c] min-h-screen text-white">
      <h1 className="text-3xl font-black uppercase tracking-tighter text-blue-500">Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Users", val: "1,250", icon: <Users />, color: "border-blue-500" },
          { label: "Car Models", val: "24", icon: <Car />, color: "border-green-500" },
          { label: "Wishlists", val: "458", icon: <Heart />, color: "border-pink-500" },
          { label: "Engagement", val: "89%", icon: <Activity />, color: "border-orange-500" },
        ].map((s, i) => (
          <div key={i} className={`stat-card bg-[#141417] p-6 rounded-2xl border-l-4 ${s.color} shadow-xl`}>
            <div className="flex justify-between items-center text-gray-400">
              <span className="text-xs font-bold uppercase tracking-widest">{s.label}</span>
              {s.icon}
            </div>
            <div className="text-3xl font-bold mt-2">{s.val}</div>
            <div className="text-xs text-green-500 mt-2 flex items-center gap-1">
              <ArrowUpRight size={12}/> +12% this month
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#141417] p-8 rounded-2xl border border-white/5 h-64 flex items-center justify-center text-gray-600 italic">
        [ Visual Analytics Chart Placeholder ]
      </div>
    </div>
  );
}