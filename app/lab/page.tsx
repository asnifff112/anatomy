"use client";
import { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TheLab() {
  const [cars, setCars] = useState<any[]>([]);

  useEffect(() => {
    // db.json-il ninnu car details fetch cheyyunnu
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => setCars(data.cars));
  }, []);

  return (
    <main className="min-h-screen bg-black pt-32 pb-20 px-6 md:px-20">
      
      {/* HEADER SECTION */}
      <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-6xl font-black tracking-tighter italic uppercase leading-none">The Lab.</h1>
          <p className="text-[10px] tracking-[0.5em] text-blue-500 font-bold uppercase mt-4">
            Authorized Personnel Only // Database_v2.0
          </p>
        </motion.div>
        
        <div className="text-right hidden md:block opacity-30 font-mono">
          <span className="text-[10px] text-white tracking-widest uppercase">System Status: Operational</span>
        </div>
      </div>

      {/* CAR CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <Link href={`/products/${car.id}`} key={car.id}>
            <motion.div 
              whileHover={{ scale: 0.98, borderColor: 'rgba(59,130,246,0.5)' }}
              className="relative p-8 h-[450px] border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col justify-between bg-zinc-950 transition-all group"
            >
              {/* TOP INFO */}
              <div className="flex justify-between items-start z-10">
                <span className="text-[10px] tracking-widest uppercase py-1.5 px-4 bg-white/5 border border-white/10 rounded-full font-mono text-gray-400">
                  {car.id}
                </span>
                <span className="text-[9px] font-black tracking-[0.2em] uppercase text-green-500 flex items-center gap-2">
                   <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                   Active_Subject
                </span>
              </div>

              {/* 🏎️ CAR IMAGE (Centered in Card) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-6">
                <motion.img 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.6, scale: 1 }}
                  whileHover={{ opacity: 1, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  // db.json-il car image path illenkil manually kodukkam
                  // eg: /thumbs/valor-01.png
                  src={`/thumbs/${car.id}.png`} 
                  alt={car.name}
                  className="w-full h-auto object-contain drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] z-0 transition-all duration-500 group-hover:drop-shadow-[0_0_40px_rgba(59,130,246,0.2)]"
                />
              </div>

              {/* BOTTOM DETAILS */}
              <div className="z-10 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent pt-10">
                <h3 className="text-4xl font-black tracking-tighter uppercase italic leading-none mb-2">
                  {car.name}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] tracking-widest text-blue-500 font-bold uppercase">
                    Scan Anatomy →
                  </p>
                  <p className="text-[10px] font-mono text-gray-600 uppercase">
                    {car.stats.power}
                  </p>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </main>
  );
}