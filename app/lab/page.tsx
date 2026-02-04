"use client";
import { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import Link from 'next/link';
import View from "@/components/canvas/view"; 

const DB_URL = "http://localhost:5000/cars";

// Interface for TypeScript to understand car object
interface Car {
  id: string;
  name: string;
  modelUrl: string;
}

export default function TheLab() {
  const [cars, setCars] = useState<Car[]>([]); // Typed as Car array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(DB_URL)
      .then((res) => res.json())
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
          <h1 className="text-6xl font-black tracking-tighter italic uppercase leading-none text-white">The Lab.</h1>
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
          {cars.map((car) => (
            <Link href={`/products/${car.id}`} key={car.id}>
              <motion.div 
                whileHover={{ borderColor: 'rgba(59,130,246,0.5)' }}
                className="relative p-8 h-[450px] border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col justify-between bg-zinc-950 group"
              >
                {/* ID Tag */}
                <div className="flex justify-between items-start z-10">
                  <span className="text-[10px] tracking-widest uppercase py-1.5 px-4 bg-white/5 border border-white/10 rounded-full font-mono text-gray-400">
                    {car.id}
                  </span>
                  <span className="text-[9px] font-black tracking-[0.2em] uppercase text-green-500 flex items-center gap-2">
                     <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                     LIVE_PREVIEW
                  </span>
                </div>

                {/* 🏎️ 3D View - Normalized and Centered */}
                <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none group-hover:pointer-events-auto">
                   <div className="w-full h-full">
                      <View 
                        modelUrl={car.modelUrl} 
                        isExploded={false} 
                        scale={1.2} // Normalized ആയതുകൊണ്ട് എല്ലാ കാറും 1.2 സൈസിൽ വരും
                      />
                   </div>
                </div>

                {/* Title and Button */}
                <div className="z-10 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent pt-20">
                  <h3 className="text-4xl font-black tracking-tighter uppercase italic leading-none mb-2 text-white">
                    {car.name}
                  </h3>
                  <p className="text-[10px] tracking-widest text-blue-500 font-bold uppercase">
                    Initialize Scan →
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}