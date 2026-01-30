"use client";
import { motion } from 'framer-motion';

export default function About() {
  return (
    <main className="min-h-screen bg-black pt-40 px-10">
      <div className="max-w-4xl">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="text-5xl font-bold mb-10 tracking-tight"
        >
          INSIDE ANATOMY.
        </motion.h2>
        
        <p className="text-xl text-gray-400 leading-relaxed mb-8">
          We don't just build tech; we reveal it. Anatomy is a digital showcase 
          focused on the intricate engineering hidden beneath the surface of 
          everyday products.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20">
          <div className="p-8 border border-white/10 rounded-2xl bg-white/5">
            <h3 className="text-white font-bold mb-4 italic uppercase tracking-wider">Precision</h3>
            <p className="text-sm text-gray-500">Every component is modeled with absolute accuracy to the original design.</p>
          </div>
          <div className="p-8 border border-white/10 rounded-2xl bg-white/5">
            <h3 className="text-white font-bold mb-4 italic uppercase tracking-wider">Interactive</h3>
            <p className="text-sm text-gray-500">Engage with products in a way that physical retail can't provide.</p>
          </div>
        </div>
      </div>
    </main>
  );
}