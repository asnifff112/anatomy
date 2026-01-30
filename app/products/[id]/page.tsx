"use client";
import { motion } from 'framer-motion';

export default function ProductDetail() {
  return (
    <main className="relative min-h-[200vh] bg-[#050505]">
      {/* 3D Canvas will be fixed here in the next step */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-transparent to-black/50 pointer-events-none" />
      
      {/* Product UI Overlay */}
      <section className="relative z-10 h-screen flex items-end p-10">
        <div className="w-full flex justify-between items-end">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md"
          >
            <span className="text-[10px] tracking-[0.4em] uppercase text-blue-500 font-bold">New Release</span>
            <h1 className="text-6xl font-black mt-2 mb-4 tracking-tighter uppercase italic">Sonic 01</h1>
            <p className="text-gray-400 text-sm">Experience sound like never before with 40mm drivers and active noise cancellation.</p>
          </motion.div>

          <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 min-w-[300px]">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-400 uppercase text-[10px] tracking-widest">Price</span>
              <span className="text-2xl font-bold">$299.00</span>
            </div>
            <button className="w-full py-4 bg-white text-black font-bold uppercase text-xs tracking-widest rounded-xl hover:bg-blue-500 hover:text-white transition-all">
              Add to Cart
            </button>
          </div>
        </div>
      </section>

      {/* This section is for scrolling and triggering the GSAP Explode */}
      <section className="h-screen flex flex-col justify-center px-10">
         <div className="max-w-xs space-y-20">
            <div className="opacity-50 hover:opacity-100 transition-opacity">
               <h4 className="text-xs uppercase tracking-widest font-bold">01. Drivers</h4>
               <p className="text-xs text-gray-500 mt-2">Precision engineered 40mm acoustic drivers.</p>
            </div>
            <div className="opacity-50 hover:opacity-100 transition-opacity">
               <h4 className="text-xs uppercase tracking-widest font-bold">02. Battery</h4>
               <p className="text-xs text-gray-500 mt-2">Up to 40 hours of uninterrupted playback.</p>
            </div>
         </div>
      </section>
    </main>
  );
}