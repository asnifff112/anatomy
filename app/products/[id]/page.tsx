"use client";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductFeatures from "@/components/ProductFeatures";
import CarView from "@/components/canvas/carview";

gsap.registerPlugin(ScrollTrigger);

const COLOR_OPTIONS = [
  { name: "Pure White", hex: "#ffffff" },
  { name: "Electric Blue", hex: "#0033ff" },
  { name: "Rosso Corsa", hex: "#cc0000" },
  { name: "Obsidian Black", hex: "#0a0a0a" },
];

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [car, setCar] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0].hex);
  
  const titleRef = useRef(null);
  const carRef = useRef(null);
  const statsRef = useRef(null);
  const statItems = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    fetch(`http://localhost:5000/cars/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCar(data);
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.fromTo(titleRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 0.1, duration: 1.5 })
          .fromTo(carRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 2 }, "-=1");

        gsap.fromTo(statItems.current, 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.2, scrollTrigger: { trigger: statsRef.current, start: "top 80%" } }
        );
      });
  }, [id]);

  if (!car) return <div className="h-screen bg-black flex items-center justify-center text-blue-500 font-mono tracking-[0.5em] animate-pulse">LOADING_DATA...</div>;

  const carStats = [
    { label: "Acceleration", value: car.stats?.acceleration || "2.8S" },
    { label: "Max Speed", value: car.stats?.topSpeed || "325KM/H" },
    { label: "Horsepower", value: car.stats?.power || "710HP" },
    { label: "Engine Type", value: car.stats?.engine || "V12" },
  ];

  return (
    <main className="bg-black text-white min-h-screen font-sans">
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div ref={titleRef} className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <h1 className="text-[20vw] font-black uppercase italic opacity-10">{car.name}</h1>
        </div>

        <div ref={carRef} className="relative z-10 w-full h-[60vh]">
            <CarView modelUrl={car.modelUrl} selectedColor={selectedColor} />
        </div>

        <div className="absolute bottom-12 left-12 z-20">
          <p className="text-blue-500 font-mono text-[10px] tracking-widest uppercase mb-2">Base Configuration</p>
          <h2 className="text-6xl font-black italic tracking-tighter">{car.price}</h2>
        </div>

        <div className="absolute bottom-12 right-12 z-20 flex flex-col items-end gap-4">
          <p className="text-[10px] uppercase font-bold text-zinc-500 italic">Select Finish</p>
          <div className="flex gap-4 p-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full">
            {COLOR_OPTIONS.map((c) => (
              <button 
                key={c.hex} 
                onClick={() => setSelectedColor(c.hex)}
                className={`w-6 h-6 rounded-full border-2 ${selectedColor === c.hex ? "border-blue-500 scale-125" : "border-transparent opacity-50"}`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>
      </section>

      <section ref={statsRef} className="py-32 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-4 gap-8">
            {carStats.map((stat, i) => (
                <div key={i} ref={(el) => { if (el) statItems.current[i] = el; }} className="p-10 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-blue-500/50 transition-all">
                    <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest block mb-4">{stat.label}</span>
                    <span className="text-5xl font-black italic tracking-tighter">{stat.value}</span>
                </div>
            ))}
        </div>
      </section>
      
      {car.features && <ProductFeatures features={car.features} />}
    </main>
  );
}