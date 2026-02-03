"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { gsap } from "gsap";

export default function GaragePage() {
  const { user, loading, logout } = useAuth(); // Logout ഇവിടെ നിന്ന് എടുക്കുന്നു
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [wishlistCars, setWishlistCars] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  // 1. Fetch Garage & User Data
  const fetchGarageData = async () => {
    if (!user?.id) return;

    try {
      setIsFetching(true);
      const userRes = await fetch(`http://localhost:5000/users/${user.id}`);
      const currentUser = await userRes.json();
      setUserData(currentUser);

      const carsRes = await fetch(`http://localhost:5000/cars`);
      const allCars = await carsRes.json();

      if (currentUser.wishlist) {
        const saved = allCars.filter((car: any) =>
          currentUser.wishlist.includes(car.id.toString())
        );
        setWishlistCars(saved);
      }
    } catch (err) {
      console.error("Garage Sync Error:", err);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }
    if (user) {
      fetchGarageData();
    }
  }, [user, loading, router]);

  // 2. Remove from Hangar Logic
  const removeFromHangar = async (carId: string) => {
    if (!user?.id || !userData) return;

    const updatedWishlist = userData.wishlist.filter((id: string) => id !== carId);

    try {
      const res = await fetch(`http://localhost:5000/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wishlist: updatedWishlist }),
      });

      if (res.ok) {
        setUserData({ ...userData, wishlist: updatedWishlist });
        setWishlistCars((prev) => prev.filter((car) => car.id !== carId));
        gsap.to(`.car-card-${carId}`, { opacity: 0, scale: 0.9, duration: 0.3 });
      }
    } catch (err) {
      console.error("Removal failed:", err);
    }
  };

  // 3. Logout Handler
  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  if (loading || isFetching) {
    return (
      <div className="h-screen bg-black flex items-center justify-center text-white font-mono uppercase tracking-[0.5em]">
        Accessing_Hangar...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black pt-24 pb-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header & Profile Section (Logout/Change Password) --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6 border-b border-white/5 pb-10">
          <div>
            <p className="text-blue-500 font-mono text-[10px] tracking-[0.4em] uppercase mb-2">Authenticated_User</p>
            <h1 className="text-4xl md:text-6xl font-black italic text-white tracking-tighter uppercase">
              {user?.name || "Pilot"}_Garage
            </h1>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => router.push("/change-password")}
              className="px-6 py-2 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white hover:border-white/30 transition-all"
            >
              Change_Password
            </button>
            <button 
              onClick={handleLogout}
              className="px-6 py-2 bg-red-600/10 border border-red-500/20 text-[10px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-600 hover:text-white transition-all"
            >
              Logout_Session
            </button>
          </div>
        </div>

        {/* --- Hangar Bays Grid --- */}
        <div className="mb-8 flex items-center gap-4">
          <h2 className="text-xl font-bold text-white uppercase tracking-widest">Hangar_Bays</h2>
          <div className="h-[1px] flex-1 bg-white/5"></div>
          <span className="text-blue-500 font-mono text-sm">[{wishlistCars.length}/10]</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlistCars.length > 0 ? (
            wishlistCars.map((car) => (
              <div
                key={car.id}
                className={`car-card-${car.id} bg-zinc-900/20 border border-white/5 p-6 rounded-3xl group hover:border-blue-500/40 transition-all duration-500`}
              >
             

<div className="relative h-48 mb-6 bg-zinc-950/50 rounded-2xl flex items-center justify-center overflow-hidden border border-white/5">
  
  {car.modelUrl ? (
    <div className="text-center">
      
      <p className="text-[10px] text-blue-500 font-mono animate-pulse">
        LOAD_MODEL: {car.modelUrl}
      </p>
      
    
     
    </div>
  ) : (
    <div className="text-[10px] font-mono text-zinc-700 uppercase tracking-[0.5em]">
      NO_VISUAL_DATA
    </div>
  )}
</div>



                {/* Specs & Actions */}
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[9px] text-blue-500 font-bold uppercase tracking-[0.2em] mb-1">{car.stats?.engine || "V8_Twin_Turbo"}</p>
                      <h3 className="text-2xl font-black italic text-white uppercase">{car.name}</h3>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <button 
                      onClick={() => router.push(`/product/${car.id}`)}
                      className="text-[10px] uppercase tracking-widest text-zinc-400 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:animate-ping" />
                      Laboratory
                    </button>

                    <button
                      onClick={() => removeFromHangar(car.id)}
                      className="text-[10px] uppercase tracking-widest text-red-500/40 hover:text-red-500 transition-colors font-bold"
                    >
                      [ Remove ]
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-32 text-center border border-dashed border-zinc-800 rounded-[40px] bg-zinc-900/10">
              <p className="text-zinc-600 font-mono uppercase tracking-[0.5em] mb-4 text-xs">Hangar_is_currently_empty</p>
              <button 
                onClick={() => router.push("/")}
                className="text-[10px] text-blue-500 font-bold uppercase tracking-widest hover:underline"
              >
                Explore_Fleet
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}