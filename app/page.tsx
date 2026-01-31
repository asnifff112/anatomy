"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import EncryptedText from '@/components/ui/EncryptedText';
import InteractiveHoverButton from '@/components/ui/InteractiveHoverButton';
import View from '@/components/canvas/view';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden font-sans">
      
      {/* LAYER 1: 3D Background - Button-num Text-inum pinnil */}
      <div className="absolute inset-0 z-0 opacity-70 pointer-events-none flex items-center justify-center">
        <View modelUrl="/car.glb" />
      </div>

      {/* LAYER 2: Overlays (Depth tharan) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-[1] pointer-events-none" />

      {/* LAYER 3: Main Content (Text and Button munnil) */}
      <div className="relative z-10 w-full flex flex-col items-center">
        
        {/* Title Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-[13vw] font-black tracking-[-0.04em] leading-none select-none text-white mix-blend-screen drop-shadow-2xl">
            ANATOMY
          </h1>

          <div className="text-[10px] md:text-xs tracking-[0.7em] uppercase opacity-40 -mt-2 mb-20 font-mono">
            <EncryptedText text="Structural Engineering Lab" />
          </div>
        </motion.div>

        {/* Button - Ippo ithu car-inte munnilaanu (z-10) */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.5, duration: 1 }}
        >
          <Link href="/products/car-01" className="relative cursor-none">
            <InteractiveHoverButton text="Enter Laboratory" />
          </Link>
        </motion.div>
      </div>

      {/* Lab UI Elements */}
      <div className="absolute bottom-10 left-10 z-10 opacity-30 font-mono text-[8px] tracking-[0.2em] uppercase">
        V12 Valor Chassis // Active Mode
      </div>
    </main>
  );
}