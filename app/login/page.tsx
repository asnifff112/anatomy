"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";

export default function LoginPage() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current, 
        { y: 100, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "expo.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px]" />
      </div>

      <div ref={cardRef} className="relative z-10 w-full max-w-[420px] p-10 bg-zinc-950/50 backdrop-blur-3xl border border-white/10 rounded-[40px] shadow-2xl mx-4">
        <div className="mb-10">
          <h1 className="text-4xl font-black uppercase italic tracking-tighter italic leading-none">Enter Garage</h1>
          <p className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.3em] mt-3">Identity Verification Required</p>
        </div>

        <form className="space-y-6">
          <div className="group">
            <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest ml-1 mb-2 block group-focus-within:text-blue-500 transition-colors">Pilot Email</label>
            <input 
              type="email" 
              className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-600/50 focus:bg-white/10 transition-all font-mono text-sm"
              placeholder="pilot@velocity.vpx"
            />
          </div>

          <div className="group">
            <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest ml-1 mb-2 block group-focus-within:text-blue-500 transition-colors">Security Key</label>
            <input 
              type="password" 
              className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-600/50 focus:bg-white/10 transition-all font-mono text-sm"
              placeholder="••••••••"
            />
          </div>

          <button className="w-full bg-white text-black font-black uppercase italic p-5 rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-500 transform active:scale-95 shadow-xl shadow-white/5">
            Initialize Access
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
          <p className="text-zinc-500 text-[10px] uppercase tracking-widest">
            New Pilot? <Link href="/signup" className="text-white hover:text-blue-500 transition-colors font-bold ml-1">Generate ID</Link>
          </p>
        </div>
      </div>

      {/* Side Label */}
      <div className="absolute right-[-50px] top-1/2 -rotate-90 opacity-10 pointer-events-none">
        <p className="text-[120px] font-black uppercase italic tracking-tighter leading-none">Velocity</p>
      </div>
    </main>
  );
}