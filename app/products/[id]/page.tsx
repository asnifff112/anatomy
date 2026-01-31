"use client";
import { useState, useEffect, useRef } from "react";
import View from "@/components/canvas/view";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useParams } from "next/navigation"; // URL id edukkan ithu venam

gsap.registerPlugin(ScrollTrigger);

export default function ProductDetails() {
  const params = useParams(); // URL-il ulla id (eg: bmw-02) ivide kittum
  const [isExploded, setIsExploded] = useState(false);
  const [carData, setCarData] = useState<any>(null);
  const containerRef = useRef(null);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        // URL-ile ID-yum DB-yile ID-yum match cheyyunnu
        const foundCar = data.cars.find((c: any) => c.id === params.id);
        setCarData(foundCar);
      });
  }, [params.id]); // ID maarumpol fetch update aakum

  useEffect(() => {
    if (!carData) return;

    const sections = gsap.utils.toArray(".part-section");
    
    sections.forEach((section: any, index: number) => {
      const isEven = index % 2 === 0;
      const image = section.querySelector(".part-image");
      const text = section.querySelector(".part-text");

      gsap.fromTo(image, 
        { x: isEven ? -150 : 150, opacity: 0 },
        { 
          x: 0, opacity: 1, 
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          }
        }
      );

      gsap.fromTo(text, 
        { x: isEven ? 150 : -150, opacity: 0 },
        { 
          x: 0, opacity: 1, 
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          }
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
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
          <View modelUrl={carData.modelUrl} isExploded={isExploded} scale={0.5} />
        </div>
        <div className="w-full md:w-1/3 p-10 flex flex-col justify-center bg-zinc-950/80 backdrop-blur-xl z-10">
          <p className="text-blue-500 font-mono text-[10px] tracking-[0.4em] mb-4 uppercase">Subject_Ref: {carData.id}</p>
          <h1 className="text-5xl font-black italic uppercase mb-8 leading-none tracking-tighter">
            {carData.name.split(' ').map((word: string, i: number) => (
              <span key={i}>{word} <br/></span>
            ))}
          </h1>
          
          <div className="space-y-4 mb-10 border-t border-white/10 pt-6 font-mono text-xs">
             <div className="flex justify-between"><span className="opacity-40">Core</span><span>{carData.stats.engine}</span></div>
             <div className="flex justify-between"><span className="opacity-40">Output</span><span>{carData.stats.power}</span></div>
          </div>

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
              <div className="part-image w-full md:w-1/2 flex justify-center opacity-0">
                <img src={`/parts/${part.id}.png`} alt={part.name} className="w-full max-w-[400px] h-auto object-contain drop-shadow-[0_20px_60px_rgba(59,130,246,0.3)]" />
              </div>
              <div className="part-text w-full md:w-1/2 opacity-0">
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