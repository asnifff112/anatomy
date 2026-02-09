"use client";
import { useEffect, useRef } from "react";
import HeroView from "@/components/canvas/heroview";
import { gsap } from "gsap";

export default function HomePage() {
  const containerRef = useRef(null);
  const brandRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 1. വലിയ ബാക്ക്ഡ്രോപ്പ് ബ്രാൻഡ് നെയിം
      tl.fromTo(brandRef.current, 
        { opacity: 0, scale: 0.8, y: 50 }, 
        { opacity: 1, scale: 1, y: 0, duration: 2, delay: 0.5 }
      );

      // 2. മെയിൻ ഹെഡിംഗ് ആനിമേഷൻ
      tl.fromTo(".char", 
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.05, duration: 1 }, "-=1"
      );

      // 3. സൈഡ് ബാർ ടെക്സ്റ്റ് ആനിമേഷൻ
      tl.fromTo(".sidebar-char", 
        { opacity: 0, x: 20 }, 
        { opacity: 1, x: 0, stagger: 0.1, duration: 1, ease: "back.out(2)" }, "-=0.5"
      );

      // 4. ബട്ടണും വിവരണവും
      tl.fromTo(contentRef.current, 
        { opacity: 0, x: -50 }, 
        { opacity: 1, x: 0, duration: 1 }, "-=0.5"
      );

      // ബാക്ക്ഗ്രൗണ്ട് ഗ്ലോ പൾസിംഗ്
      gsap.to(".bg-glow", {
        opacity: 0.4,
        scale: 1.2,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden">
      
      {/* Background Glow */}
      <div className="bg-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Backdrop Name */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <h1 ref={brandRef} className="text-[25vw] font-black text-white/[0.01] uppercase tracking-tighter leading-none">
          ANATOMY
        </h1>
      </div>

      {/* 3D Model Canvas - Position adjusted to the right */}
      <div className="absolute inset-0 z-0 translate-x-[20%] md:translate-x-[9%]">
        <HeroView 
          modelUrl="/car.glb" 
          onReady={() => console.log("Model Loaded")} 
        />
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between p-12 pointer-events-none">
        
        {/* Header */}
        <div className="flex justify-end items-start pointer-events-auto">
          <div className="hidden md:block text-white/40 text-[10px] tracking-[0.4em] uppercase">
            Designed for the future / 2026
          </div>
        </div>

        {/* Bottom Heading & Button */}
        <div className="max-w-4xl pointer-events-auto">
          <h2 className="text-white text-7xl md:text-9xl font-black italic leading-[0.85] tracking-tighter uppercase">
            <span className="char inline-block">REDEF</span>
            <span 
              className="char inline-block text-transparent" 
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}
            >
              INING
            </span>
            <br />
            <span className="text-blue-600 char inline-block">STRUC</span>
            <span 
              className="char inline-block text-transparent" 
              style={{ WebkitTextStroke: "1px #2563eb" }}
            >
              TURE
            </span>
          </h2>
          
          <div ref={contentRef} className="mt-8">
            <p className="text-gray-400 text-sm tracking-widest uppercase max-w-sm leading-relaxed mb-10">
              Unveiling the core engineering of next-generation performance electric vehicles.
            </p>
            
            <a 
              href="/lab" 
              className="cursor-target group relative px-12 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs transition-all hover:bg-blue-600 hover:text-white inline-block"
            >
              ENTER LABORATORY
              <span className="absolute -bottom-2 -right-2 w-full h-full border border-white/20 group-hover:border-blue-600 transition-all"></span>
            </a>
          </div>
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="absolute right-8 top-0 h-full flex flex-col justify-center items-center z-20 pointer-events-none">
        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent to-blue-600/50 mb-6"></div>
        <div className="flex flex-col items-center">
          {"ANATOMY".split("").map((char, i) => (
            <span key={i} className="sidebar-char text-white/10 font-black text-3xl md:text-5xl leading-[0.8] uppercase select-none">
              {char}
            </span>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center gap-2">
            <div className="w-1 h-1 bg-blue-600 rounded-full animate-ping"></div>
            <span className="rotate-90 text-white/20 text-[8px] tracking-[0.5em] uppercase whitespace-nowrap mt-10">
                Process 01
            </span>
        </div>
        <div className="w-[1px] h-20 bg-gradient-to-t from-transparent to-blue-600/50 mt-6"></div>
      </div>

    </main>
  );
}