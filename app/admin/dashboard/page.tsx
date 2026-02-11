"use client";
import { useEffect, useState } from "react";
import { Users, Car, Heart, Activity, ArrowUpRight, TrendingUp } from "lucide-react";
import { gsap } from "gsap";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ 
    totalUsers: 0, 
    totalCars: 0, 
    wishlists: 0,
    activeSessions: 0 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, carsRes] = await Promise.all([
          fetch("http://localhost:5000/users"),
          fetch("http://localhost:5000/cars")
        ]);

        const users = await usersRes.json();
        const cars = await carsRes.json();

        setStats({
          totalUsers: users.length,
          totalCars: cars.length,
          wishlists: Math.floor(users.length * 1.5), 
          activeSessions: Math.floor(Math.random() * users.length) + 1
        });
      } catch (error) {
        console.error("Data Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8 space-y-8 bg-[#060608] min-h-screen text-white font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-blue-500 italic">
            Command_Center<span className="text-white/20">.vpx</span>
          </h1>
          <p className="text-gray-500 text-xs font-mono uppercase tracking-[0.3em] mt-1">
            System status: <span className="text-green-500 animate-pulse">Operational</span>
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full flex items-center gap-3">
          <Activity size={16} className="text-blue-500" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Live Traffic Check</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total Pilots" 
          val={stats.totalUsers} 
          icon={<Users size={20}/>} 
          color="blue" 
          loading={loading}
        />
        <StatCard 
          label="Fleet Size" 
          val={stats.totalCars} 
          icon={<Car size={20}/>} 
          color="green" 
          loading={loading}
        />
        <StatCard 
          label="Target Hits" 
          val={stats.wishlists} 
          icon={<Heart size={20}/>} 
          color="pink" 
          loading={loading}
        />
        <StatCard 
          label="Uptime Ops" 
          val={stats.activeSessions} 
          icon={<TrendingUp size={20}/>} 
          color="orange" 
          loading={loading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#101014] border border-white/5 rounded-[32px] p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Activity size={120} />
          </div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            System Intelligence
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-md">
            The fleet is performing at 98.4% efficiency. No unauthorized access attempts detected in the last 24 cycles.
          </p>
          <div className="mt-6 flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black uppercase px-6 py-3 rounded-xl transition-all">
              Run Diagnostics
            </button>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-600 to-indigo-900 rounded-[32px] p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(37,99,235,0.2)]">
          <ArrowUpRight size={40} className="text-white/50" />
          <div>
            <div className="text-4xl font-black mb-1">PRO</div>
            <p className="text-white/70 text-xs font-bold uppercase tracking-widest">V-Power Analytics Enabled</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  val: number;
  icon: React.ReactNode;
  color: string;
  loading: boolean;
}

function StatCard({ label, val, icon, color, loading }: StatCardProps) {
  const colorMap: any = {
    blue: "border-blue-500/20 text-blue-500 bg-blue-500/5",
    green: "border-green-500/20 text-green-500 bg-green-500/5",
    pink: "border-pink-500/20 text-pink-500 bg-pink-500/5",
    orange: "border-orange-500/20 text-orange-500 bg-orange-500/5",
  };

  return (
    <div className={`relative overflow-hidden border ${colorMap[color]} p-6 rounded-[24px] transition-all hover:scale-[1.02] hover:bg-white/5`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl bg-black/40 border border-white/5`}>
          {icon}
        </div>
        <div className="text-[10px] font-mono opacity-50">STABLE</div>
      </div>
      
      <div>
        <div className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
          {label}
        </div>
        <div className="text-3xl font-black tracking-tighter text-white">
          {loading ? "---" : val.toLocaleString()}
        </div>
      </div>
    </div>
  );
}