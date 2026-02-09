"use client";
import { useState, useEffect } from "react";
import LabView from "@/components/canvas/labview";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Zap, Gauge, ArrowUpRight } from "lucide-react";
import Link from "next/link";

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

  useEffect(() => {
    fetch("/db.json")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        if (data.cars && data.cars.length > 0) {
          setCars(data.cars);
          setSelectedCar(data.cars[0]);
        }
      })
      .catch((err) => console.error("Fetch Error:", err));
  }, []);

  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!selectedCar) {
    return (
      <div className="h-screen bg-[#050505] flex items-center justify-center text-blue-500 font-mono tracking-[0.5em] animate-pulse">
        SYNCING_SYSTEM...
      </div>
    );
  }

  return (
    <main className="relative w-full h-screen bg-[#020202] text-white overflow-hidden">
      
      {/* Side Inventory */}
      <div className="absolute left-0 top-0 h-full w-80 bg-black/40 backdrop-blur-xl z-30 border-r border-white/5 flex flex-col shadow-2xl">
        <div className="p-8">
          <h1 className="text-2xl font-black italic uppercase tracking-tighter">V_LAB.01</h1>
          <p className="text-blue-500 text-[10px] font-bold tracking-[0.3em] uppercase opacity-80">Inventory System</p>
        </div>

        <div className="px-6 mb-6">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text"
              placeholder="SEARCH_UNITS..."
              className="w-full bg-white/5 border border-white/10 py-3 pl-10 pr-4 text-[10px] tracking-widest focus:outline-none focus:border-blue-500/50 transition-all font-mono uppercase"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-10 custom-scrollbar">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              onClick={() => setSelectedCar(car)}
              className={`p-5 cursor-pointer transition-all duration-300 rounded-lg border ${
                selectedCar.id === car.id 
                ? "bg-blue-600/10 border-blue-500/50" 
                : "bg-white/5 border-transparent hover:bg-white/10"
              }`}
            >
              <span className="text-[9px] text-white/30 uppercase font-mono">ID: {car.id}</span>
              <h3 className="font-bold uppercase italic text-sm">{car.name}</h3>
              <p className="text-blue-400 text-xs font-black mt-1">{car.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3D Viewport */}
      <div className="absolute inset-0 z-10 ml-80 pointer-events-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCar.id}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <LabView modelUrl={selectedCar.modelUrl} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* HUD & Action Button */}
      <div className="absolute bottom-10 right-10 z-20 text-right">
        <motion.div
          key={`data-${selectedCar.id}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h2 className="text-7xl font-black italic uppercase tracking-tighter leading-none mb-6">{selectedCar.name}</h2>
          
          <div className="flex flex-col items-end gap-6">
            <div className="flex justify-end gap-10 bg-black/60 backdrop-blur-md p-6 border-r-4 border-blue-600">
              <div className="text-right">
                <span className="text-blue-500 text-[10px] font-bold uppercase tracking-widest flex items-center justify-end gap-2">
                  <Zap size={12}/> Power
                </span>
                <p className="text-2xl font-black italic">{selectedCar.stats.power}</p>
              </div>
              <div className="text-right">
                <span className="text-blue-500 text-[10px] font-bold uppercase tracking-widest flex items-center justify-end gap-2">
                  <Gauge size={12}/> Engine
                </span>
                <p className="text-2xl font-black italic">{selectedCar.stats.engine}</p>
              </div>
            </div>

            {/* The Action Button */}
            <Link href={`/products/${selectedCar.id}`} className="pointer-events-auto">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 bg-blue-700 text-white px-10 py-4 font-black italic uppercase tracking-widest skew-x-[-15deg] shadow-[0_0_20px_rgba(37,99,235,0.4)]"
              >
                <span className="skew-x-[15deg]">Inspect Unit</span>
                <ArrowUpRight className="skew-x-[15deg]" size={20} />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Grid Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
    </main>
  );
}