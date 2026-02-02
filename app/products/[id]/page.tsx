"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductFeatures from "@/components/ProductFeatures";
import CarView from "@/components/canvas/carview";

const COLOR_OPTIONS = [
  { name: "White", hex: "#ffffff" },
  { name: "Blue", hex: "#0011ff" },
  { name: "Red", hex: "#cc0000" },
  { name: "Black", hex: "#0a0a0a" },
  { name: "Green", hex: "#003311" },
];

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [car, setCar] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0].hex);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        const selectedCar = data.cars.find((c: any) => c.id === id);
        setCar(selectedCar);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!car) return <div className="h-screen bg-black flex items-center justify-center text-white">LOADING...</div>;

  return (
    <main className="bg-black text-white min-h-screen">
      
      {/* 🏎️ HERO SECTION - Fixed Height and Layout */}
      <section className="relative h-[110vh] flex flex-col items-center justify-start pt-16 overflow-hidden">
        
        {/* Giant Background Title */}
        <div className="absolute top-10 w-full text-center pointer-events-none z-0 opacity-20">
          <h1 className="text-[12vw] font-black uppercase italic leading-none tracking-tighter">
            {car.name}
          </h1>
        </div>

        {/* 3D Model Area - Increased Height */}
        <div className="relative z-10 w-full h-[75vh] mt-10">
          <CarView modelUrl={car.modelUrl} selectedColor={selectedColor} />
          
          {/* UI Color Picker */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-3 px-6 rounded-full flex gap-5 shadow-2xl">
              {COLOR_OPTIONS.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setSelectedColor(c.hex)}
                  className={`w-7 h-7 rounded-full transition-all duration-500 ${
                    selectedColor === c.hex ? "ring-2 ring-white ring-offset-4 ring-offset-black scale-125" : "opacity-40 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
            <p className="text-[9px] font-mono tracking-[0.4em] uppercase text-gray-400">Paint Finish Selection</p>
          </div>
        </div>

        {/* Specs Bar */}
        <div className="relative z-10 grid grid-cols-2 gap-24 border-t border-white/10 pt-8 w-full max-w-3xl px-6">
            <div className="text-center">
              <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">Engine</p>
              <p className="font-mono text-blue-500 text-2xl uppercase italic">{car.stats.engine}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">Performance</p>
              <p className="font-mono text-blue-500 text-2xl uppercase italic">{car.stats.power}</p>
            </div>
        </div>
      </section>

      {/* Features & Parts */}
      <ProductFeatures features={car.features} />

      <section className="py-20 bg-zinc-950 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {car.parts.map((part: any) => (
            <div key={part.id} className="p-8 bg-black border border-white/5 rounded-2xl flex justify-between items-center group hover:border-blue-500 transition-all">
              <div>
                <h4 className="text-xl font-bold uppercase">{part.name}</h4>
                <p className="text-gray-500 text-sm">{part.description}</p>
              </div>
              <span className="text-blue-500 font-mono font-bold">{part.price}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}