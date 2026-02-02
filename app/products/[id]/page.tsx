"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductFeatures from "@/components/ProductFeatures";
import CarView from "@/components/canvas/carview";

// നമുക്ക് ഇഷ്ടമുള്ള കളറുകൾ ഇവിടെ സെറ്റ് ചെയ്യാം
const COLOR_OPTIONS = [
  { name: "Titanium White", hex: "#ffffff" },
  { name: "Electric Blue", hex: "#0033ff" },
  { name: "Crimson Red", hex: "#bc0000" },
  { name: "Matte Black", hex: "#111111" },
  { name: "British Green", hex: "#004225" },
];

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [car, setCar] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0].hex);

  useEffect(() => {
    // db.json-ൽ നിന്ന് ഡാറ്റ ഫെച്ച് ചെയ്യുന്നു
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        const selectedCar = data.cars.find((c: any) => c.id === id);
        setCar(selectedCar);
      })
      .catch((err) => console.error("Error loading car data:", err));
  }, [id]);

  if (!car) {
    return (
      <div className="h-screen bg-black flex items-center justify-center text-white font-mono tracking-[0.5em] animate-pulse">
        INITIALIZING LABORATORY...
      </div>
    );
  }

  return (
    <main className="bg-black text-white selection:bg-blue-500">
      {/* 🏎️ HERO SECTION: 3D Model & Titles */}
      <section className="min-h-screen relative flex flex-col items-center justify-start pt-16">
        
        {/* Title Background Layer */}
        <div className="relative z-10 text-center space-y-2 px-6">
          <span className="text-blue-500 font-mono tracking-[0.3em] uppercase text-xs">
            Prototype_{car.id}
          </span>
          <h1 className="text-6xl md:text-[130px] font-black uppercase italic tracking-tighter leading-[0.85] drop-shadow-2xl">
            {car.name}
          </h1>
          
          <div className="flex gap-6 justify-center mt-4">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full">
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Engine</p>
              <p className="font-mono text-blue-400">{car.stats.engine}</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full">
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Output</p>
              <p className="font-mono text-blue-400">{car.stats.power}</p>
            </div>
          </div>
        </div>

        {/* 3D Model Display */}
        <div className="w-full h-[55vh] md:h-[65vh] mt-[-20px] relative">
           <CarView modelUrl={car.modelUrl} selectedColor={selectedColor} />
           
           {/* Color Picker Overlay - കാറിന് തൊട്ടടുത്ത് വരാൻ വേണ്ടി */}
           <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-30">
              <p className="text-[10px] uppercase tracking-widest text-white/40">Select Exterior Finish</p>
              <div className="flex gap-4 p-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full">
                {COLOR_OPTIONS.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColor(color.hex)}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-300 hover:scale-110 ${
                      selectedColor === color.hex ? "border-white scale-125 shadow-[0_0_15px_rgba(255,255,255,0.3)]" : "border-transparent opacity-50"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
           </div>
        </div>
      </section>

      {/* 🛠️ TECHNICAL FEATURES: GSAP Video Section */}
      <div className="relative z-10 shadow-[0_-50px_100px_rgba(0,0,0,0.9)]">
        <ProductFeatures features={car.features} />
      </div>

      {/* 📦 UPGRADE INVENTORY: Parts List */}
      <section className="py-32 bg-zinc-950 border-t border-white/5">
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
               <div>
                  <h2 className="text-4xl font-black uppercase italic tracking-tighter">Upgrade Inventory</h2>
                  <p className="text-gray-500 font-mono text-sm mt-2">Precision components for {car.name}</p>
               </div>
               <div className="h-[2px] flex-grow bg-gradient-to-r from-transparent via-white/10 to-transparent mx-8 hidden md:block"></div>
               <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-sm font-black uppercase text-xs tracking-widest transition-all">
                  Export Specs
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {car.parts.map((part: any) => (
                 <div key={part.id} className="group p-8 bg-zinc-900/20 border border-white/5 rounded-2xl flex justify-between items-center hover:border-blue-500/30 transition-all duration-500">
                    <div className="space-y-2">
                       <h4 className="text-xl font-bold uppercase tracking-tight group-hover:text-blue-400 transition-colors">{part.name}</h4>
                       <p className="text-gray-500 text-sm max-w-xs leading-relaxed">{part.description}</p>
                    </div>
                    <div className="text-right">
                       <span className="block text-blue-500 font-mono font-bold text-xl">{part.price}</span>
                       <div className="mt-2 w-full h-[1px] bg-white/5 group-hover:bg-blue-500/50 transition-all"></div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Footer Space */}
      <footer className="py-20 text-center border-t border-white/5 opacity-20">
         <p className="font-mono text-[10px] tracking-[1em] uppercase">Laboratory Access Restricted</p>
      </footer>
    </main>
  );
}