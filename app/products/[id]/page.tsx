"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { useAuth } from "@/app/context/AuthContext";
import ProductFeatures from "@/components/ProductFeatures";
import CarView from "@/components/canvas/carview";

const DB_URL = "http://localhost:5000/cars";
const USER_URL = "http://localhost:5000/users";

const COLOR_OPTIONS = [
  { name: "White", hex: "#ffffff" },
  { name: "Blue", hex: "#0011ff" },
  { name: "Red", hex: "#cc0000" },
  { name: "Black", hex: "#0a0a0a" },
  { name: "Green", hex: "#003311" },
];

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth(); 
  const [car, setCar] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0].hex);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const titleRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    fetch(`${DB_URL}/${id}`)
      .then((res) => res.json())
      .then((data) => setCar(data))
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (user?.id) {
        try {
          const res = await fetch(`${USER_URL}/${user.id}`);
          const data = await res.json();
          setUserData(data);
          if (data.wishlist?.includes(id)) {
            setIsSaved(true);
          }
        } catch (err) {
          console.error("User fetch error:", err);
        }
      }
    };
    checkWishlistStatus();
  }, [id, user]);

  const toggleHangar = async () => {
    if (!user?.id) {
      alert("Please login to access the Hangar!");
      router.push("/login");
      return;
    }
    
    setIsSaving(true);
    gsap.to(btnRef.current, { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1 });

    try {
      const userRes = await fetch(`${USER_URL}/${user.id}`);
      const currentData = await userRes.json();
      
      let updatedWishlist = currentData.wishlist || [];
      const isInWishlist = updatedWishlist.includes(id);

      if (isInWishlist) {
       
        updatedWishlist = updatedWishlist.filter((itemId: string) => itemId !== id);
      } else {
        
        updatedWishlist = [...updatedWishlist, id];
      }

      const patchRes = await fetch(`${USER_URL}/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wishlist: updatedWishlist }),
      });

      if (patchRes.ok) {
        setIsSaved(!isInWishlist);
        setUserData({ ...currentData, wishlist: updatedWishlist });
        
        gsap.to(btnRef.current, { 
          backgroundColor: !isInWishlist ? "#2563eb" : "transparent", 
          duration: 0.5 
        });
      }
    } catch (err) {
      console.error("Docking update failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  if (!car) return <div className="h-screen bg-black flex items-center justify-center text-white font-mono uppercase tracking-[0.5em]">Syncing_Data...</div>;

  return (
    <main className="bg-black text-white min-h-screen">
      <section className="relative h-screen flex flex-col items-center justify-start pt-12 overflow-hidden">
        
        <div ref={titleRef} className="absolute top-10 w-full text-center pointer-events-none z-0 opacity-10">
          <h1 className="text-[15vw] font-black uppercase italic leading-none tracking-tighter">{car.name}</h1>
        </div>

        <div className="relative z-10 w-full h-[75vh] mt-4">
          <CarView modelUrl={car.modelUrl} selectedColor={selectedColor} />
          
          {/* Right Side Control Panel */}
          <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-20">
             <div className="flex flex-col items-end">
                <p className="text-[8px] font-black text-blue-500 tracking-[0.3em] mb-2 uppercase">Protocol_09</p>
                <button 
                  ref={btnRef}
                  onClick={toggleHangar}
                  disabled={isSaving}
                  className={`group relative overflow-hidden px-8 py-4 border transition-all duration-500 ${
                    isSaved ? "border-blue-500 bg-blue-600/20 text-blue-400" : "border-white/20 hover:border-blue-500 text-white"
                  }`}
                >
                  <div className="relative z-10 flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${isSaved ? "bg-blue-500 shadow-[0_0_10px_#2563eb]" : "bg-zinc-500 animate-pulse"}`} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                      {isSaving ? "SYNCING..." : isSaved ? "UNIT DOCKED" : "ADD TO HANGAR"}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-0 opacity-10" />
                </button>
             </div>
          </div>

          {/* Paint Selector UI */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
            <p className="text-[8px] uppercase tracking-[0.4em] font-bold text-zinc-500">Body Finish</p>
            <div className="bg-zinc-900/50 backdrop-blur-3xl border border-white/10 p-3 px-6 rounded-2xl flex gap-5">
              {COLOR_OPTIONS.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setSelectedColor(c.hex)}
                  className={`w-6 h-6 rounded-full transition-all duration-500 ${
                    selectedColor === c.hex ? "ring-2 ring-blue-500 ring-offset-4 ring-offset-black scale-125 shadow-lg shadow-blue-500/20" : "opacity-40 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 📊 Specs Grid */}
        <div className="relative z-10 grid grid-cols-2 gap-8 md:gap-16 border-t border-white/5 pt-10 w-full max-w-3xl px-6 mt-4">
            <div className="flex flex-col items-center border-r border-white/5">
              <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mb-2 italic">Powertrain</p>
              <p className="font-mono text-white text-2xl md:text-3xl uppercase italic font-black tracking-tighter">
                {car.stats?.engine || "V8_TT"}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mb-2 italic">Max Output</p>
              <p className="font-mono text-white text-2xl md:text-3xl uppercase italic font-black tracking-tighter">
                {car.stats?.power || "740 HP"}
              </p>
            </div>
        </div>
      </section>

      <ProductFeatures features={car.features} />
    </main>
  );
}