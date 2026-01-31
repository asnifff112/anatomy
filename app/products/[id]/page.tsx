"use client";
import { useState, useEffect, useRef } from "react";
import View from "@/components/canvas/view";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image"; // ✨ 1. Import Next.js Image

gsap.registerPlugin(ScrollTrigger);

export default function ProductDetails() {
  const params = useParams();
  const [isExploded, setIsExploded] = useState(false);
  const [carData, setCarData] = useState<any>(null);
  const containerRef = useRef(null);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        const foundCar = data.cars.find((c: any) => c.id === params.id);
        setCarData(foundCar);
      });
  }, [params.id]);

  useEffect(() => {
    if (!carData) return;

    // GSAP Context create cheyyunnu (Cleaner cleanup)
    let ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".part-section");
      
      sections.forEach((section: any, index: number) => {
        const isEven = index % 2 === 0;
        const imageContainer = section.querySelector(".anim-image-container"); 
        const text = section.querySelector(".part-text");

        // ✨ Optimized GSAP Animation
        gsap.fromTo(imageContainer, 
          { x: isEven ? -100 : 100, opacity: 0 }, // Distance kurachu (Less pixel movement = less lag)
          { 
            x: 0, opacity: 1, 
            duration: 1,
            ease: "power2.out", // Smooth easing
            scrollTrigger: {
              trigger: section,
              start: "top 85%", // Trigger point kurachu koodi thazhe aakki
              end: "top 40%",
              scrub: 1, // Smooth scrub
            }
          }
        );

        gsap.fromTo(text, 
          { x: isEven ? 50 : -50, opacity: 0 },
          { 
            x: 0, opacity: 1, 
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              end: "top 40%",
              scrub: 1,
            }
          }
        );
      });
    }, containerRef); // Scope to container

    return () => ctx.revert(); // Proper cleanup
  }, [carData]);

  if (!carData) return (
    <div className="bg-black h-screen flex items-center justify-center text-white font-mono uppercase tracking-widest text-xs">
      Initializing Laboratory...
    </div>
  );

  return (
    <main ref={containerRef} className="relative bg-black text-white overflow-x-hidden">
      
      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen flex flex-col md:flex-row border-b border-white/5">
        <div className="w-full md:w-2/3 h-[60vh] md:h-screen sticky top-0 md:relative">
          {/* 3D Model Heavy aanenkil athine onnu 'memo' cheyyunnath nallathanu */}
          <View modelUrl={carData.modelUrl} isExploded={isExploded} scale={0.5} />
        </div>
        <div className="w-full md:w-1/3 p-10 flex flex-col justify-center bg-zinc-950/80 backdrop-blur-xl z-10">
          <p className="text-blue-500 font-mono text-[10px] tracking-[0.4em] mb-4 uppercase">Subject_Ref: {carData.id}</p>
          <h1 className="text-5xl font-black italic uppercase mb-8 leading-none tracking-tighter">
            {carData.name.split(' ').map((word: string, i: number) => (
              <span key={i}>{word} <br/></span>
            ))}
          </h1>
          <button 
            onClick={() => setIsExploded(!isExploded)}
            className="px-8 py-4 bg-white text-black font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 hover:text-white transition-all w-full"
          >
            {isExploded ? "Assemble Anatomy" : "Deconstruct Anatomy"}
          </button>
        </div>
      </section>

      {/* SECTION 2: PARTS */}
      <div className="py-20 bg-zinc-950/20">
        {carData.parts.map((part: any, index: number) => (
          <section key={part.id} className="part-section min-h-[80vh] flex items-center justify-center px-6 md:px-20 mb-20">
            <div className={`flex flex-col md:flex-row items-center justify-between w-full max-w-7xl gap-10 ${index % 2 === 0 ? "" : "md:flex-row-reverse"}`}>
              
              {/* ✨ PERFORMANCE FIX: 'will-change-transform' tells browser to use GPU */}
              <div className="anim-image-container w-full md:w-1/2 flex justify-center opacity-0 will-change-transform">
                
                {/* Floating Animation Wrapper */}
                <motion.div
                   animate={{ y: [0, -15, 0] }}
                   transition={{ 
                     duration: 5, // Slower animation consumes less resources
                     repeat: Infinity, 
                     ease: "easeInOut",
                     delay: index * 0.2
                   }}
                   className="relative w-full max-w-[400px] aspect-square" // Aspect Ratio defined
                >
                    {/* ✨ NEXT/IMAGE: Highly Optimized Image Rendering */}
                    <Image 
                       src={part.image || `/parts/${part.id}.png`} 
                       alt={part.name}
                       width={600} // Rendering size kodukkuka
                       height={600}
                       priority={index < 2} // Aadyathe 2 images pettannu load aavan
                       className="object-contain drop-shadow-[0_20px_60px_rgba(59,130,246,0.3)]"
                    />
                </motion.div>
                
                {/* Glow Effect (Static Div is better than animated blur) */}
                <div className="absolute w-[300px] h-[300px] bg-blue-500/5 blur-[80px] rounded-full -z-10" />
              </div>

              {/* Text Section */}
              <div className="part-text w-full md:w-1/2 opacity-0 will-change-transform">
                <div className={`max-w-md ${index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"}`}>
                   <span className="text-blue-500 font-mono text-[10px] font-bold tracking-[0.3em]">UNIT_TYPE_0{index + 1}</span>
                   <h2 className="text-4xl md:text-6xl font-black uppercase italic mt-2 mb-6 leading-none">{part.name}</h2>
                   <p className="text-zinc-400 font-mono text-sm leading-relaxed mb-8">{part.description}</p>
                   <p className="text-3xl font-bold text-green-400 font-mono">{part.price}</p>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <footer className="py-20 text-center opacity-10 font-mono text-[10px] uppercase tracking-[2em]">System Terminal Closed</footer>
    </main>
  );
}