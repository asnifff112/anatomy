"use client";
import { useState } from "react";
import LabView from "@/components/canvas/labview";

export default function LabPage() {
  const [isExploded, setIsExploded] = useState(false);

  return (
    <main className="relative w-full h-screen bg-[#050505]">
      <div className="absolute top-10 left-10 z-20 text-white">
        <h1 className="text-4xl font-bold tracking-tighter uppercase italic">Lab_Session_01</h1>
      </div>

      <LabView modelUrl="/car.glb" isExploded={isExploded} />

      <div className="absolute bottom-10 right-10 z-20">
        <button 
          onClick={() => setIsExploded(!isExploded)}
          className="px-10 py-4 bg-blue-600 text-white font-bold uppercase tracking-widest hover:bg-blue-700 transition-all shadow-[0_0_20px_rgba(37,99,235,0.5)]"
        >
          {isExploded ? "Reset Model" : "Initialize Scan"}
        </button>
      </div>
    </main>
  );
}