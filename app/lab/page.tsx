"use client";
import { useState, useEffect } from "react";
import LabView from "@/components/canvas/labview";

export default function LabPage() {
  const [isExploded, setIsExploded] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // ഡിജിറ്റൽ ക്ലോക്കിന് വേണ്ടി
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.getHours() + ":" + now.getMinutes().toString().padStart(2, '0') + ":" + now.getSeconds().toString().padStart(2, '0'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="relative w-full h-screen bg-[#020202] overflow-hidden font-mono selection:bg-blue-500/30">
      
      {/* --- ഹെഡർ സെക്ഷൻ --- */}
      <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-start z-20 pointer-events-none">
        <div>
          <h1 className="text-5xl font-black tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-400 to-blue-800 animate-pulse">
            LAB_SESSION_01
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
            <p className="text-blue-500 text-xs tracking-[0.3em] uppercase font-bold">System Active: Scanning for anomalies</p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-white text-2xl font-light tracking-widest">{currentTime}</p>
          <p className="text-blue-500/50 text-[10px] uppercase tracking-tighter">Diagnostic Link: Connected</p>
        </div>
      </div>

      {/* --- ഹൈ-ടെക് സൈഡ് ഡാറ്റ പാനലുകൾ --- */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-20 opacity-60">
        {[ "Engine_RPM: 0.0", "Pressure: 1.2bar", "Temp: 24°C", "Core: Stable" ].map((data, i) => (
          <div key={i} className="border-l-2 border-blue-600 pl-4 py-1">
            <p className="text-white text-[10px] tracking-tighter uppercase mb-1 opacity-50">Data_Point_0{i+1}</p>
            <p className="text-blue-400 font-bold text-sm tracking-widest">{data}</p>
          </div>
        ))}
      </div>

      {/* --- 3D മോഡൽ വ്യൂവർ --- */}
      <div className="w-full h-full z-10 cursor-crosshair">
        <LabView modelUrl="/car.glb" isExploded={isExploded} />
      </div>

      {/* --- ബട്ടൺ സെക്ഷൻ വിത്ത് ലേസർ ലൈൻ --- */}
      <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end z-20">
        <div className="w-1/3 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />
        
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2">
            <div className={`h-1 w-8 transition-all duration-500 ${isExploded ? 'bg-blue-600 shadow-[0_0_10px_#2563eb]' : 'bg-zinc-800'}`} />
            <div className={`h-1 w-8 transition-all duration-500 ${isExploded ? 'bg-blue-600 shadow-[0_0_10px_#2563eb]' : 'bg-zinc-800'}`} />
            <div className={`h-1 w-8 transition-all duration-500 ${isExploded ? 'bg-blue-600 shadow-[0_0_10px_#2563eb]' : 'bg-zinc-800'}`} />
          </div>

          <button 
            onClick={() => setIsExploded(!isExploded)}
            className="group relative px-12 py-5 bg-transparent overflow-hidden border border-blue-500/30"
          >
            {/* ബട്ടൺ ബാക്ക്ഗ്രൗണ്ട് ആനിമേഷൻ */}
            <div className="absolute inset-0 bg-blue-600 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
            
            <span className="relative z-10 text-white font-black uppercase tracking-[0.4em] text-sm group-hover:text-black transition-colors duration-500">
              {isExploded ? "Reset_Core" : "Initialize_Scan"}
            </span>

            {/* കോർണർ ഡീറ്റൈൽസ് */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-500" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-500" />
          </button>
        </div>

        <div className="w-1/3 h-[1px] bg-gradient-to-l from-transparent via-blue-500 to-transparent opacity-30" />
      </div>

      {/* ബാഗ്രൗണ്ട് ഗ്രിഡ് ലൈനുകൾ */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%]" />
    </main>
  );
}