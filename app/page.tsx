"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center z-10"
      >
        <h1 className="text-[15vw] font-black tracking-tighter leading-tight select-none">
          ANATOMY
        </h1>
        <p className="text-[12px] md:text-sm tracking-[0.6em] uppercase opacity-50 -mt-4">
          See beyond the surface
        </p>
        
        <div className="mt-20">
          <Link href="/products/headphone-01">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 border border-white/20 rounded-full text-[10px] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all"
            >
              Explore Product
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}