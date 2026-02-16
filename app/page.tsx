"use client";
import { useEffect, useRef } from "react";
import HeroView from "@/components/canvas/heroview";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const containerRef = useRef(null);
  const brandRef = useRef(null);
  const contentRef = useRef(null);
  const carWrapperRef = useRef(null); // കാറിന്റെ പൊസിഷൻ മാറ്റാൻ

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Initial Entrance Animation
      tl.fromTo(brandRef.current, 
        { opacity: 0, scale: 0.8, y: 50 }, 
        { opacity: 1, scale: 1, y: 0, duration: 2, delay: 0.5 }
      );

      tl.fromTo(".char", 
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.05, duration: 1 }, "-=1"
      );

      // --- SCROLL TRIGGER ANIMATION ---
      // സ്ക്രോൾ ചെയ്യുമ്പോൾ കാർ സെന്ററിലേക്ക് വരികയും വലുതാവുകയും ചെയ്യുന്നു
      gsap.to(carWrapperRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 1, // സ്മൂത്ത് ആയി സ്ക്രോളിന് അനുസരിച്ച് നീങ്ങാൻ
        },
        x: "0%", // കാർ ലെഫ്റ്റിലേക്ക് നീങ്ങുന്നു
        scale: 1.2,
        opacity: 0.5,
      });

      // സെക്ഷൻ 2 ടെക്സ്റ്റ് ആനിമേഷൻ
      gsap.from(".section-2-text", {
        scrollTrigger: {
          trigger: ".section-2",
          start: "top 80%",
          scrub: true,
        },
        y: 100,
        opacity: 0,
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-[#050505] text-white">
      
      {/* SECTION 1: HERO */}
      <section className="relative w-full h-screen overflow-hidden">
        <div className="bg-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1 ref={brandRef} className="text-[25vw] font-black text-white/[0.01] uppercase tracking-tighter">
            ANATOMY
          </h1>
        </div>

        {/* 3D CAR WRAPPER */}
        <div ref={carWrapperRef} className="absolute inset-0 z-0 translate-x-[20%] md:translate-x-[9%] transition-transform">
          <HeroView modelUrl="/car.glb" />
        </div>

        {/* HERO CONTENT */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-12 md:p-24">
          <div className="max-w-4xl">
            <h2 className="text-7xl md:text-9xl font-black italic uppercase leading-none tracking-tighter">
              <span className="char inline-block">REDEF</span>
              <span className="char inline-block text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}>INING</span>
            </h2>
            <div ref={contentRef} className="mt-8">
              <a href="/lab" className="px-12 py-4 bg-blue-600 font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all inline-block">
                EXPLORE CORE
              </a>
            </div>
          </div>
        </div>
      </section>

      
      <section className="section-2 h-screen w-full flex items-center justify-center relative bg-[#080808] border-t border-white/5">
        <div className="container px-12 grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="section-2-text">
            <h3 className="text-5xl font-black uppercase mb-6 text-blue-500">Aerodynamics</h3>
            <p className="text-gray-500 max-w-md leading-relaxed">
              Every curve is a result of calculated precision, designed to cut through resistance and redefine the limits of electric speed.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
             {["Power", "Speed", "Torque", "Range"].map((stat) => (
               <div key={stat} className="p-8 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all">
                  <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest">{stat}</p>
                  <p className="text-2xl font-bold mt-2">---</p>
               </div>
             ))}
          </div>
        </div>
      </section>

    </main>
  );
}