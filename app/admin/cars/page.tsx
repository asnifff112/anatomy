"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Plus, Trash2, Edit2, Box } from "lucide-react";

export default function CarDetails() {
  const root = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".car-row", { opacity: 0, x: -20, stagger: 0.1, duration: 0.8 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="p-8 space-y-8 bg-[#0a0a0c] min-h-screen text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black uppercase tracking-tighter text-blue-500">Car Inventory</h1>
        <button className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-full flex items-center gap-2 text-sm font-bold transition-all active:scale-95">
          <Plus size={18}/> Add New Model
        </button>
      </div>

      <div className="bg-[#141417] rounded-2xl border border-white/5 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-[10px] uppercase font-bold text-gray-500 tracking-widest">
            <tr>
              <th className="p-5">Model Name</th>
              <th className="p-5">File Path</th>
              <th className="p-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {["Porsche 911 GT3", "BMW M4 Competition", "Tesla Model S"].map((car, i) => (
              <tr key={i} className="car-row border-t border-white/5 hover:bg-white/5 transition-colors group">
                <td className="p-5 font-bold flex items-center gap-3">
                  <Box size={16} className="text-blue-500"/> {car}
                </td>
                <td className="p-5 text-gray-500 font-mono text-xs">/models/{car.toLowerCase().replace(/ /g, "_")}.glb</td>
                <td className="p-5 text-right flex justify-end gap-4">
                  <button className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg"><Edit2 size={16}/></button>
                  <button className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"><Trash2 size={16}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}