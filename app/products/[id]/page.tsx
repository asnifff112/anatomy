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

  if (!car) return <div className="h-screen bg-black flex items-center justify-center text-white font-mono uppercase">Syncing...</div>;

  return (
    <main className="bg-black text-white min-h-screen">
      <section className="relative h-screen flex flex-col items-center justify-start pt-12 overflow-hidden">
        
        {/* BG Title */}
        <div className="absolute top-10 w-full text-center pointer-events-none z-0 opacity-10">
          <h1 className="text-[10vw] font-black uppercase italic leading-none tracking-tighter">{car.name}</h1>
        </div>

        {/* Car Display Area */}
        <div className="relative z-10 w-full h-[60vh] mt-4">
          <CarView modelUrl={car.modelUrl} selectedColor={selectedColor} />
          
          {/* Paint Selector */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-3 px-6 rounded-full flex gap-5 shadow-2xl">
              {COLOR_OPTIONS.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setSelectedColor(c.hex)}
                  className={`w-6 h-6 rounded-full transition-all duration-500 ${
                    selectedColor === c.hex ? "ring-2 ring-white ring-offset-4 ring-offset-black scale-125 shadow-lg shadow-white/10" : "opacity-30 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Specs */}
        <div className="relative z-10 grid grid-cols-2 gap-16 border-t border-white/10 pt-6 w-full max-w-2xl px-6 mt-4">
            <div className="text-center">
              <p className="text-gray-600 text-[9px] uppercase font-bold tracking-widest mb-1">Engine</p>
              <p className="font-mono text-blue-500 text-xl uppercase italic">{car.stats.engine}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-[9px] uppercase font-bold tracking-widest mb-1">Output</p>
              <p className="font-mono text-blue-500 text-xl uppercase italic">{car.stats.power}</p>
            </div>
        </div>
      </section>

      <ProductFeatures features={car.features} />
    </main>
  );
}