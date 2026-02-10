"use client";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductFeatures from "@/components/ProductFeatures";
import CarView from "@/components/canvas/carview";

gsap.registerPlugin(ScrollTrigger);

const DB_URL = "http://localhost:5000/cars";
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
  const priceCardRef = useRef(null);
  const statItems = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    fetch(`${DB_URL}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCar(data);
        
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.fromTo(titleRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 0.1, duration: 1.5 })
          .fromTo(carRef.current, { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 2 }, "-=1.2")
          .fromTo(priceCardRef.current, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, "-=1");

        gsap.fromTo(statItems.current, 
          { y: 60, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1, 
            stagger: 0.2, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
            }
          }
        );
      });
  }, [id]);

  if (!car) return <div className="h-screen bg-black flex items-center justify-center text-blue-500 font-mono tracking-[0.5em] animate-pulse">LOADING_ENGINE...</div>;

  const carStats = [
    { label: "0-100 KM/H", value: car.stats?.acceleration || "2.8S" },
    { label: "Top Speed", value: car.stats?.topSpeed || "325KM/H" },
    { label: "Peak Power", value: car.stats?.power || "710HP" },
    { label: "Curb Weight", value: "1,420KG" },
  ];

  return (
    <main className="bg-black text-white min-h-screen overflow-x-hidden font-sans">
      
      {/* SECTION 1: HERO VIEW */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* BG LARGE TEXT */}
        <div ref={titleRef} className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <h1 className="text-[22vw] font-black uppercase italic leading-none tracking-tighter opacity-10 select-none">
            {car.name}
          </h1>
        </div>

        {/* 3D MODEL */}
        <div ref={carRef} className="relative z-10 w-full h-[70vh] flex items-center justify-center transform translate-y-10">
            <CarView modelUrl={car.modelUrl} selectedColor={selectedColor} />
        </div>

        {/* PREMIUM PRICE CARD */}
        <div ref={priceCardRef} className="absolute bottom-12 left-8 md:left-20 z-20">
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 rounded-tr-[40px] rounded-bl-[40px] shadow-2xl">
              <p className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-2">Ex-Showroom Price</p>
              <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-6">
                <span className="text-2xl font-light not-italic mr-2">$</span>
                {car.price?.toLocaleString()}
              </h2>
              
            </div>
        </div>

        {/* ENHANCED COLOR PICKER */}
        <div className="absolute bottom-12 right-8 md:right-20 z-30 flex flex-col items-end gap-5">
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-400 italic">Custom Paintwork</p>
          <div className="flex gap-6 p-4 px-8 rounded-full bg-zinc-900/40 backdrop-blur-2xl border border-white/10 shadow-xl">
            {COLOR_OPTIONS.map((c) => (
              <button
                key={c.hex}
                onClick={() => setSelectedColor(c.hex)}
                className={`w-7 h-7 rounded-full transition-all duration-500 hover:scale-125 ${
                  selectedColor === c.hex 
                    ? "ring-[3px] ring-blue-500 ring-offset-[6px] ring-offset-black scale-125 shadow-[0_0_20px_rgba(59,130,246,0.5)]" 
                    : "opacity-40"
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: GSAP STATS STRIP WITH HEADER */}
      <section ref={statsRef} className="relative bg-[#050505] py-40 border-y border-white/5 overflow-hidden">
        {/* Subtle Section Header to fill the blank feel */}
        <div className="max-w-7xl mx-auto px-10 mb-20">
            <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-12 bg-blue-600" />
                <span className="text-blue-500 font-mono text-xs tracking-[0.4em] uppercase">Performance Metrics</span>
            </div>
            <h3 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase">Technical Superiority.</h3>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/5 blur-[150px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {carStats.map((stat, i) => (
                <div 
                  key={i} 
                  ref={(el) => { if (el) statItems.current[i] = el; }}
                  className="group relative flex flex-col gap-3 p-10 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all duration-700"
                >
                    <div className="absolute top-0 left-0 h-[2px] w-0 bg-blue-600 transition-all duration-700 group-hover:w-full" />
                    <span className="text-zinc-500 font-mono text-[10px] font-bold uppercase tracking-[0.4em] group-hover:text-blue-500 transition-colors">{stat.label}</span>
                    <span className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter">{stat.value}</span>
                    <div className="mt-4 h-[1px] w-8 bg-zinc-800 transition-all duration-500 group-hover:w-16 group-hover:bg-blue-600" />
                </div>
            ))}
        </div>
      </section>

      <ProductFeatures features={car.features} />
    </main>
  );
}