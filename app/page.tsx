"use client";
import { useState } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation'; 
import EncryptedText from '@/components/ui/EncryptedText';
import InteractiveHoverButton from '@/components/ui/InteractiveHoverButton';
import View from '@/components/canvas/view';

export default function Home() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  
const handleEnter = () => {
  setIsExiting(true);
  setTimeout(() => {
    router.push('/lab'); 
  }, 1500); 
};

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden font-sans">
      
      
      <AnimatePresence>
        {isExiting && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
          >
            <motion.div 
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="text-blue-500 font-mono text-xs tracking-[0.5em] uppercase"
            >
              Initializing Laboratory...
            </motion.div>
            {/* ഒരു ലളിതമായ ലോഡിംഗ് ബാർ */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="h-[1px] bg-blue-500 mt-4"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* LAYER 1: 3D Background */}
      <div className="absolute inset-0 z-0 opacity-70 pointer-events-none flex items-center justify-center">
        <View modelUrl="/car.glb" />
      </div>

      {/* LAYER 2: Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-[1] pointer-events-none" />

      {/* LAYER 3: Main Content */}
      <motion.div 
        animate={isExiting ? { opacity: 0, scale: 0.9, filter: "blur(10px)" } : { opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full flex flex-col items-center"
      >
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

        {/* ബട്ടൺ ക്ലിക്ക് ചെയ്യുമ്പോൾ handleEnter വർക്ക് ആകും */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.5, duration: 1 }}
           onClick={handleEnter} 
           className="cursor-none"
        >
          <InteractiveHoverButton text="Enter Laboratory" />
        </motion.div>
      </motion.div>

      {/* Lab UI Elements */}
      <div className="absolute bottom-10 left-10 z-10 opacity-30 font-mono text-[8px] tracking-[0.2em] uppercase">
        V12 Valor Chassis // Active Mode
      </div>
    </main>
  );
}