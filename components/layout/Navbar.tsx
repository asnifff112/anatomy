"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-[100] flex justify-between items-center px-8 py-6 mix-blend-difference text-white"
    >
      <Link href="/" className="text-xl font-black tracking-tighter">ANATOMY</Link>
      
      <div className="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.3em] font-medium">
        <Link href="/" className="hover:opacity-50 transition">Home</Link>
        <Link href="/about" className="hover:opacity-50 transition">Inside</Link>
        <Link href="/lab" className="hover:opacity-50 transition">The Lab</Link>
      </div>

      <div className="text-[10px] uppercase tracking-widest border border-white/20 px-4 py-2 rounded-full cursor-pointer hover:bg-white hover:text-black transition">
        Buy Now
      </div>
    </motion.nav>
  );
}