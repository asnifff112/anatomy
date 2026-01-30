"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden relative">
      {/* Visual background element */}
      <div className="absolute w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center z-10"
      >
        <h1 className="text-[12vw] font-black tracking-tighter leading-none mb-4 italic">
          ANATOMY
        </h1>
        <p className="text-[10px] tracking-[0.8em] uppercase opacity-40 mb-12">
          Deconstructing the Future
        </p>

        <Link href="/products/headphone-01">
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "white", color: "black" }}
            className="px-8 py-3 border border-white/20 rounded-full text-[10px] tracking-widest uppercase transition-all"
          >
            Explore Product
          </motion.button>
        </Link>
      </motion.div>
    </main>
  );
}