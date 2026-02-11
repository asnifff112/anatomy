"use client";
import React, { useState, useEffect } from "react";
import { Trash2, Car, Search, Gauge, Zap, Weight, Activity, Loader2, RotateCcw } from "lucide-react";
import { toast } from "react-hot-toast";

interface CarType {
  id: string;
  name: string;
  price: string;
  isAvailable?: boolean;
  stats: { 
    engine: string; 
    topSpeed: string;
    acceleration: string;
    weight: string;
  };
}

export default function FleetInventoryPage() {
  const [cars, setCars] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchCars = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/cars");
      const data = await res.json();
      setCars(data);
    } catch (error) {
      toast.error("Database connection failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // Recovery & Deactivation Logic
  const toggleStatus = async (car: CarType) => {
    const newStatus = car.isAvailable === false; // true if currently false, false if currently true
    try {
      const response = await fetch(`http://localhost:5000/cars/${car.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAvailable: newStatus })
      });

      if (response.ok) {
        toast.success(newStatus ? `${car.name} Recovered` : `${car.name} moved to Maintenance`);
        fetchCars();
      }
    } catch (err) {
      toast.error("Operation failed");
    }
  };

  const filteredCars = cars.filter(car => 
    car.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 p-6 bg-black min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter text-white uppercase flex items-center gap-3">
            Fleet <span className="text-blue-500">Command</span>
          </h1>
          <p className="text-[10px] text-zinc-500 font-bold tracking-[0.3em] uppercase mt-1">Live Asset Tracking & Recovery</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
          <input 
            className="bg-[#0d0d0f] border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm outline-none focus:border-blue-500 w-full text-zinc-300"
            placeholder="Search units..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredCars.map((car) => (
          <div 
            key={car.id} 
            className={`group bg-[#0d0d0f] border rounded-[32px] p-3 transition-all duration-500 ${
              car.isAvailable === false 
                ? 'border-red-900/20 opacity-60 grayscale' 
                : 'border-white/5 hover:border-blue-500/30'
            }`}
          >
            <div className="flex flex-col sm:flex-row gap-6 p-4">
              {/* Display Area */}
              <div className="relative w-full sm:w-52 h-44 bg-zinc-950 rounded-[24px] flex items-center justify-center border border-white/5">
                <Car size={50} className={`${car.isAvailable === false ? 'text-red-900/30' : 'text-zinc-800 group-hover:text-blue-500/20'} transition-all`} />
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-black/80 rounded-full border border-white/10">
                  <div className={`h-1.5 w-1.5 rounded-full ${car.isAvailable !== false ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                  <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400">
                    {car.isAvailable !== false ? "Active" : "In Recovery"}
                  </span>
                </div>
              </div>

              {/* Data Area */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">{car.name}</h3>
                    <p className="text-blue-500 font-black text-sm">{car.price}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="flex items-center gap-2 bg-white/[0.02] p-2 rounded-lg">
                      <Zap size={12} className="text-zinc-600" />
                      <span className="text-[10px] text-zinc-400 font-bold uppercase">{car.stats?.engine}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/[0.02] p-2 rounded-lg">
                      <Gauge size={12} className="text-zinc-600" />
                      <span className="text-[10px] text-zinc-400 font-bold uppercase">{car.stats?.topSpeed}</span>
                    </div>
                  </div>
                </div>

                {/* Unified Recovery/Deactivate Button */}
                <div className="mt-6 flex gap-2">
                  {car.isAvailable === false ? (
                    <button 
                      onClick={() => toggleStatus(car)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-emerald-500/20"
                    >
                      <RotateCcw size={14} /> Recover Unit
                    </button>
                  ) : (
                    <button 
                      onClick={() => toggleStatus(car)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-red-500/10 text-zinc-500 hover:text-red-500 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/5 hover:border-red-500/20"
                    >
                      <Trash2 size={14} /> Send to Maintenance
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}