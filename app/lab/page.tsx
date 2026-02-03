"use client";
import { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import Link from 'next/link';
import View from "@/components/canvas/view"; 

// 🚨 പ്രധാനപ്പെട്ട മാറ്റം: JSON Server-ന്റെ കൃത്യമായ URL ഇവിടെ നൽകണം
const DB_URL = "http://localhost:5000/cars";

export default function TheLab() {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // നേരിട്ട് localhost:5000-ൽ നിന്ന് ഡാറ്റ എടുക്കുന്നു
    fetch(DB_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch cars");
        return res.json();
      })
      .then((data) => {
        setCars(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-black pt-32 pb-20 px-6 md:px-20">
      <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-10">
        <div>
          <h1 className="text-6xl font-black tracking-tighter italic uppercase leading-none">The Lab.</h1>
          <p className="text-[10px] tracking-[0.5em] text-blue-500 font-bold uppercase mt-4">
            Live 3D Prototypes // Database_v2.0
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-white font-mono text-sm animate-pulse italic tracking-[0.3em]">INITIALIZING SCAN...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.length > 0 ? (
            cars.map((car) => (
              <Link href={`/products/${car.id}`} key={car.id}>
                <motion.div 
                  whileHover={{ borderColor: 'rgba(59,130,246,0.5)' }}
                  className="relative p-8 h-[450px] border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col justify-between bg-zinc-950 group"
                >
                  <div className="flex justify-between items-start z-10">
                    <span className="text-[10px] tracking-widest uppercase py-1.5 px-4 bg-white/5 border border-white/10 rounded-full font-mono text-gray-400">
                      {car.id}
                    </span>
                    <span className="text-[9px] font-black tracking-[0.2em] uppercase text-green-500 flex items-center gap-2">
                       <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                       LIVE_PREVIEW
                    </span>
                  </div>

                  {/* 🏎️ 3D MODEL VIEW */}
                  <div className="absolute inset-0 z-0 pointer-events-none group-hover:pointer-events-auto">
                    <View 
                      modelUrl={car.modelUrl} 
                      isExploded={false} 
                      scale={0.35} 
                    />
                  </div>

                  <div className="z-10 bg-gradient-to-t from-zinc-950 via-transparent to-transparent pt-20">
                    <h3 className="text-4xl font-black tracking-tighter uppercase italic leading-none mb-2">
                      {car.name}
                    </h3>
                    <p className="text-[10px] tracking-widest text-blue-500 font-bold uppercase">
                      Initialize Scan →
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center p-20 border border-dashed border-white/10 rounded-[2.5rem]">
              <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">No Prototypes Found in Hangar.</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}