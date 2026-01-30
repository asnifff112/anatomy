"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';

const products = [
  { id: 'headphone-01', name: 'Sonic-01', type: 'Audio', status: 'Active' },
  { id: 'watch-01', name: 'Chronos', type: 'Wearable', status: 'Incoming' },
  { id: 'shoe-01', name: 'Aero-Max', type: 'Footwear', status: 'Locked' },
];

export default function TheLab() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-20 px-6 md:px-20">
      <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-10">
        <div>
          <h1 className="text-5xl font-black tracking-tighter italic uppercase">The Lab.</h1>
          <p className="text-[10px] tracking-[0.5em] text-gray-500 uppercase mt-2">Active Experiments & Prototypes</p>
        </div>
        <div className="text-right hidden md:block">
          <span className="text-[10px] text-white/20 tracking-widest uppercase">Location: Neo-Tokyo / 2026</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((item) => (
          <Link href={item.status === 'Active' ? `/products/${item.id}` : '#'} key={item.id}>
            <motion.div 
              whileHover={item.status === 'Active' ? { y: -10, borderColor: 'rgba(255,255,255,0.3)' } : {}}
              className={`relative p-8 h-[400px] border border-white/5 rounded-[2rem] overflow-hidden flex flex-col justify-between transition-colors
                ${item.status === 'Active' ? 'bg-white/5 cursor-pointer' : 'bg-transparent opacity-40 cursor-not-allowed'}
              `}
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] tracking-widest uppercase py-1 px-3 border border-white/10 rounded-full">{item.type}</span>
                <span className={`text-[9px] font-bold tracking-widest uppercase ${item.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                   ● {item.status}
                </span>
              </div>

              {/* Placeholder for Product Visual */}
              <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none text-[80px] font-black italic">
                {item.name[0]}
              </div>

              <div>
                <h3 className="text-3xl font-bold tracking-tighter uppercase leading-tight">{item.name}</h3>
                <p className="text-[10px] tracking-widest text-gray-500 mt-2 uppercase">View Internal Structure →</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </main>
  );
}