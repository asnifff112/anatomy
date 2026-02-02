"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";

export default function SignupPage() {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <main className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      {/* Grid Pattern Background */}
      <div 
  className="absolute inset-0 opacity-[0.03] pointer-events-none" 
  style={{ 
    backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
    backgroundSize: '50px 50px' 
  }} 
/>
      <div ref={cardRef} className="relative z-10 w-full max-w-[450px] p-12 bg-zinc-950/60 backdrop-blur-2xl border border-white/10 rounded-[48px] shadow-2xl mx-4">
        <div className="mb-12">
          <h1 className="text-5xl font-black uppercase italic tracking-tighter leading-none">Generate ID</h1>
          <p className="text-[10px] font-mono text-red-500 uppercase tracking-[0.4em] mt-3">Registering New Chassis Control</p>
        </div>

        <form className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[9px] uppercase font-bold text-zinc-500 tracking-widest ml-1">Callsign</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-red-500/50 transition-all text-sm font-mono" placeholder="PILOT_X" />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase font-bold text-zinc-500 tracking-widest ml-1">Fleet Unit</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-red-500/50 transition-all text-sm font-mono" placeholder="01" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] uppercase font-bold text-zinc-500 tracking-widest ml-1">Comm Channel (Email)</label>
            <input type="email" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-red-500/50 transition-all text-sm font-mono" placeholder="pilot@velocity.vpx" />
          </div>

          <div className="space-y-2">
            <label className="text-[9px] uppercase font-bold text-zinc-500 tracking-widest ml-1">Access Key (Password)</label>
            <input type="password" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-red-500/50 transition-all text-sm font-mono" placeholder="••••••••" />
          </div>

          <button className="w-full bg-red-600 text-white font-black uppercase italic p-5 rounded-2xl hover:bg-white hover:text-black transition-all duration-500 mt-6 shadow-lg shadow-red-600/20">
            Establish Identity
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-medium">
            Already in Fleet? <Link href="/login" className="text-white hover:text-red-500 transition-colors font-bold ml-1">Enter Garage</Link>
          </p>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 text-white/5 font-mono text-[10px] uppercase tracking-[1em]">System: Ready</div>
      <div className="absolute bottom-10 right-10 text-white/5 font-mono text-[10px] uppercase tracking-[1em]">Version: 2.0.4</div>
    </main>
  );
}