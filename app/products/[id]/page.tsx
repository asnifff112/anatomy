"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductFeatures from "@/components/ProductFeatures"; 


export default function ProductDetailsPage() {
  const { id } = useParams();
  const [car, setCar] = useState<any>(null);

  useEffect(() => {
   
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        const selectedCar = data.cars.find((c: any) => c.id === id);
        setCar(selectedCar);
      });
  }, [id]);

  if (!car) return <div className="h-screen bg-black flex items-center justify-center text-white">Loading Laboratory...</div>;

  return (
    <main className="bg-black">
    
      <section className="h-screen relative flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0">
           
        </div>
        
        <div className="relative z-10 text-center space-y-4">
          <h1 className="text-8xl font-black uppercase italic tracking-tighter text-white">
            {car.name}
          </h1>
          <div className="flex gap-8 justify-center text-blue-500 font-mono">
             <p>ENGINE: {car.stats.engine}</p>
             <p>POWER: {car.stats.power}</p>
          </div>
        </div>
      </section>

      {/* 🛠️ Video Features Section (GSAP) */}
      <ProductFeatures features={car.features} />

      {/* 📦 Parts List Section (Optional) */}
      <section className="py-20 bg-zinc-950">
         <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-white mb-10 uppercase">Available Upgrade Parts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {car.parts.map((part: any) => (
                 <div key={part.id} className="p-6 bg-black border border-white/5 rounded-lg flex justify-between items-center">
                    <div>
                       <h4 className="text-white font-bold">{part.name}</h4>
                       <p className="text-gray-500 text-sm">{part.description}</p>
                    </div>
                    <span className="text-blue-500 font-mono">{part.price}</span>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </main>
  );
}