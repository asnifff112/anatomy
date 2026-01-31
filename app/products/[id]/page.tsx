"use client";
import { useState, useEffect, useRef } from "react";
import View from "@/components/canvas/view";
import { CAR_DATABASE } from "@/lib/db";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProductDetails() {
  const [isExploded, setIsExploded] = useState(false);
  const carData = CAR_DATABASE[0];
  const containerRef = useRef(null);

  useEffect(() => {
    const sections = gsap.utils.toArray(".part-section");
    
    sections.forEach((section: any, index: number) => {
      const isEven = index % 2 === 0;
      const image = section.querySelector(".part-image");
      const text = section.querySelector(".part-text");

      // GSAP Timeline for each section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%", // Section screen-inte 80%-il ethumpol animation thudangum
          end: "top 20%",
          scrub: 1, // Scroll-inu anusarichu animation munnottum pinnottum pokum
        }
      });

      // Image slide-in
      tl.fromTo(image, 
        { x: isEven ? -100 : 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 }
      );

      // Text slide-in (pathiye after image)
      tl.fromTo(text, 
        { x: isEven ? 100 : -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 },
        "<" // Image-inte koode thudangaan
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <main ref={containerRef} className="relative bg-black text-white overflow-x-hidden">
      
      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen flex flex-col md:flex-row">
        <div className="w-full md:w-2/3 h-[60vh] md:h-screen">
          <View modelUrl={carData.modelUrl} isExploded={isExploded} scale={0.5} />
        </div>
        <div className="w-full md:w-1/3 p-10 flex flex-col justify-center bg-zinc-950/50 backdrop-blur-md">
          <h1 className="text-5xl font-black italic uppercase mb-8 leading-none tracking-tighter">
            Anatomy <br/> Analysis
          </h1>
          <button 
            onClick={() => setIsExploded(!isExploded)}
            className="px-8 py-4 bg-white text-black font-black uppercase text-[10px] tracking-widest hover:invert transition-all"
          >
            {isExploded ? "Assemble Anatomy" : "Deconstruct Anatomy"}
          </button>
        </div>
      </section>

      {/* SECTION 2: PARTS (Animated with ScrollTrigger) */}
      <div className="py-20">
        {carData.parts.map((part, index) => (
          <section 
            key={part.id} 
            className="part-section min-h-[80vh] flex items-center justify-center px-6 md:px-20 mb-20"
          >
            <div className={`flex flex-col md:flex-row items-center justify-between w-full max-w-7xl gap-10 ${
                index % 2 === 0 ? "" : "md:flex-row-reverse"
              }`}
            >
              {/* Image Container */}
              <div className="part-image w-full md:w-1/2 flex justify-center opacity-0">
                <img 
                  src={`/parts/${part.id}.png`} 
                  alt={part.name}
                  className="w-full max-w-[400px] h-auto object-contain drop-shadow-[0_20px_50px_rgba(59,130,246,0.3)]"
                />
              </div>

              {/* Text Container */}
              <div className="part-text w-full md:w-1/2 opacity-0">
                <div className={`max-w-md ${index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"}`}>
                   <span className="text-blue-500 font-mono text-[10px] font-bold tracking-[0.3em]">COMPONENT_V{index + 1}</span>
                   <h2 className="text-4xl md:text-6xl font-black uppercase italic mt-2 mb-6 leading-none">
                     {part.name}
                   </h2>
                   <p className="text-gray-400 font-mono text-sm leading-relaxed mb-8">
                     {part.description}
                   </p>
                   <p className="text-2xl font-bold text-green-400 font-mono">{part.price}</p>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <footer className="py-20 text-center opacity-20 font-mono text-xs uppercase tracking-[1em]">
        Diagnostic Complete
      </footer>
    </main>
  );
}