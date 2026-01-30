"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import EncryptedText from '@/components/ui/EncryptedText';
import InteractiveHoverButton from '@/components/ui/InteractiveHoverButton';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center z-10"
      >
        <h1 className="text-[15vw] font-black tracking-tighter leading-tight select-none">
          ANATOMY
        </h1>

        <div className="text-[12px] md:text-sm tracking-[0.6em] uppercase opacity-50 -mt-4 mb-20">
          <EncryptedText text="See beyond the surface" />
        </div>
        
        {/* Premium Interactive Button Added Here */}
        <Link href="/products/headphone-01">
          <InteractiveHoverButton text="Explore Now" />
        </Link>
      </motion.div>
    </main>
  );
}