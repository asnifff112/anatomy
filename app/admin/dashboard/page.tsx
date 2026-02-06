"use client";
import { useEffect, useState } from "react";
import { Users, Car, Heart, Activity } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalCars: 0, wishlists: 0 });

  useEffect(() => {
    fetch("http://localhost:5000/stats")
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  return (
    <div className="p-8 space-y-8 bg-[#0a0a0c] min-h-screen text-white">
      <h1 className="text-3xl font-black uppercase tracking-tighter text-blue-500">Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Users" val={stats.totalUsers} icon={<Users/>} color="border-blue-500" />
        <StatCard label="Car Models" val={stats.totalCars} icon={<Car/>} color="border-green-500" />
        <StatCard label="Wishlists" val={stats.wishlists} icon={<Heart/>} color="border-pink-500" />
      </div>
    </div>
  );
}

function StatCard({ label, val, icon, color }: any) {
  return (
    <div className={`bg-[#141417] p-6 rounded-2xl border-l-4 ${color} shadow-xl`}>
      <div className="flex justify-between items-center text-gray-400">
        <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
        {icon}
      </div>
      <div className="text-3xl font-bold mt-2">{val}</div>
    </div>
  );
}