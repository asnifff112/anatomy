"use client";
import { useState, useEffect } from "react";
import LabView from "@/components/canvas/labview";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Zap, Gauge, ArrowUpRight, Cpu } from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";

interface Car {
  id: string;
  name: string;
  price: string;
  modelUrl: string;
  stats: {
    engine: string;
    power: string;
  };
}

export default function LabPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("http://localhost:5000/cars");
        if (!res.ok) throw new Error("Database offline");
        const data = await res.json();
        if (data && data.length > 0) {
          setCars(data);
          setSelectedCar(data[0]);
        }
      } catch (err) {
        console.error(err);
        toast.error("SYSTEM_OFFLINE_04X");
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading || !selectedCar) {
    return (
      <div className="h-screen bg-[#020202] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4" />
        <div className="text-blue-500 font-mono text-[10px] tracking-[0.8em] uppercase animate-pulse">Initializing_Hangar</div>
      </div>
    );
  }

  return (
    <main className="relative w-full h-screen bg-[#020202] text-zinc-100 overflow-hidden font-sans">
      {/* Sidebar Inventory */}
      <div className="absolute left-0 top-0 h-full w-72 bg-black/40 backdrop-blur-3xl z-30 border-r border-white/5 flex flex-col">
        <div className="p-8 pb-4">
          <div className="flex items-center gap-2 mb-1">
            <Cpu size={14} className="text-blue-500" />
            <h1 className="text-lg font-bold tracking-tighter uppercase italic">V_Lab<span className="text-blue-500">.01</span></h1>
          </div>
          <p className="text-[8px] text-zinc-500 font-bold tracking-[0.4em] uppercase">Core_Inventory_System</p>
        </div>

        <div className="px-6 mb-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-500" />
            <input 
              type="text"
              placeholder="SEARCH_UNIT..."
              className="w-full bg-white/5 border border-white/5 py-2.5 pl-9 pr-4 text-[9px] tracking-widest focus:outline-none focus:border-blue-500/30 transition-all font-mono uppercase"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 space-y-1 pb-10 custom-scrollbar">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              onClick={() => setSelectedCar(car)}
              className={`group p-4 cursor-pointer transition-all duration-500 rounded-sm border ${
                selectedCar.id === car.id ? "bg-blue-600/5 border-blue-500/40" : "bg-transparent border-transparent hover:bg-white/5"
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`text-[7px] font-mono tracking-widest ${selectedCar.id === car.id ? "text-blue-400" : "text-zinc-600"}`}>#{car.id.padStart(3, '0')}</span>
                {selectedCar.id === car.id && <motion.div layoutId="active-dot" className="w-1 h-1 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]" />}
              </div>
              <h3 className="font-bold uppercase italic text-xs tracking-tight group-hover:translate-x-1 transition-transform">{car.name}</h3>
              <p className="text-zinc-500 text-[9px] font-mono mt-0.5">{car.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3D Viewport */}
      <div className="absolute inset-0 z-10 ml-72">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCar.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full"
          >
            <LabView modelUrl={selectedCar.modelUrl} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-12 right-12 z-20 text-right">
        <motion.div key={`data-${selectedCar.id}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="mb-6">
             <span className="text-blue-500 text-[9px] font-mono tracking-[0.5em] uppercase mb-2 block">Prototype_v2.6</span>
             <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none">{selectedCar.name}</h2>
          </div>
          
          <div className="flex flex-col items-end gap-5">
            <div className="flex justify-end gap-12 bg-white/[0.02] backdrop-blur-md p-5 border-r border-blue-500/50">
              <div className="text-right">
                <span className="text-zinc-500 text-[8px] font-bold uppercase tracking-[0.2em] flex items-center justify-end gap-2 mb-1">
                  <Zap size={10} className="text-blue-500"/> Power
                </span>
                <p className="text-xl font-bold italic">{selectedCar.stats.power}</p>
              </div>
              <div className="text-right border-l border-white/5 pl-12">
                <span className="text-zinc-500 text-[8px] font-bold uppercase tracking-[0.2em] flex items-center justify-end gap-2 mb-1">
                  <Gauge size={10} className="text-blue-500"/> Engine
                </span>
                <p className="text-xl font-bold italic">{selectedCar.stats.engine}</p>
              </div>
            </div>

            <Link href={`/products/${selectedCar.id}`}>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#1e40af" }}
                className="flex items-center gap-4 bg-blue-600 text-white px-8 py-3.5 text-[10px] font-black italic uppercase tracking-[0.3em] skew-x-[-15deg]"
              >
                <span className="skew-x-[15deg]">Launch_Details</span>
                <ArrowUpRight className="skew-x-[15deg]" size={16} />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}