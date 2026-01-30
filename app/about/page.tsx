"use client";
import { motion } from 'framer-motion';
import { TextGenerateEffect } from '@/components/ui/TextGenerateEffect';

export default function InsideAnatomy() {
  const words = `Anatomy is a digital laboratory where hardware meets high-art. We believe that true beauty lies in the complexity of internal engineering. Our mission is to provide an immersive experience that physical retail stores simply cannot offer.`;

  return (
    <main className="min-h-screen bg-black pt-32 pb-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            WE STRIP TECH <br /> 
            <span className="text-white/40 italic font-light font-serif text-4xl">TO ITS CORE.</span>
          </h1>
          
          {/* Animated Text Effect Ivide Add Cheyyunnu */}
          <div className="max-w-2xl">
            <TextGenerateEffect words={words} />
          </div>
        </motion.div>

        {/* Baki features grid ivide thudarunnu... */}
      </div>
    </main>
  );
}