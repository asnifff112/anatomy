"use client";
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function GaragePage() {
  const { user, logout } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // തൽക്കാലം db.json-ൽ നിന്ന് കുറച്ച് ഫേവറിറ്റ് ഡാറ്റ കാണിക്കാൻ
    fetch('/db.json')
      .then(res => res.json())
      .then(data => setFavorites(data.cars.slice(0, 2))); // ആദ്യത്തെ 2 എണ്ണം മാത്രം കാണിക്കുന്നു
  }, []);

  if (!user) return <div className="h-screen bg-black flex items-center justify-center text-white font-mono">ACCESS DENIED. PLEASE LOGIN.</div>;

  return (
    <main className="min-h-screen bg-black text-white pt-32 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Profile Header */}
        <section className="relative p-10 bg-zinc-900/30 border border-white/10 rounded-[40px] overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 font-black text-6xl italic uppercase">PILOT_01</div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full border-4 border-white/10 p-1">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" className="rounded-full" />
            </div>
            
            <div className="text-center md:text-left">
              <h2 className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.5em] mb-2">Authenticated User</h2>
              <h1 className="text-4xl font-black uppercase italic">{user.name}</h1>
              <p className="text-zinc-500 text-sm font-mono mt-1">{user.email}</p>
              
              <button onClick={logout} className="mt-6 text-[10px] text-red-500 font-black uppercase border border-red-500/30 px-4 py-2 rounded-full hover:bg-red-500 hover:text-white transition-all">
                Terminate Session
              </button>
            </div>
          </div>
        </section>

        {/* Favorite Cars Section */}
        <section className="mt-16">
          <h3 className="text-xl font-black uppercase italic tracking-tighter mb-8 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-blue-500" /> My Fleet
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {favorites.map((car: any) => (
              <motion.div 
                whileHover={{ y: -10 }}
                key={car.id} 
                className="group relative bg-zinc-900/40 border border-white/5 p-6 rounded-[30px] overflow-hidden"
              >
                <div className="aspect-video relative mb-4">
                  <img src={car.image} alt={car.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h4 className="text-2xl font-black uppercase italic">{car.name}</h4>
                  <p className="text-[10px] font-mono text-zinc-500 mt-1 uppercase tracking-widest">{car.stats.engine} | {car.stats.power}</p>
                </div>
                <button className="absolute top-6 right-6 text-red-500 text-xl">♥</button>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}