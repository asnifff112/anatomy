"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { gsap } from "gsap";

export default function GaragePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [wishlistCars, setWishlistCars] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  // 1. Fetch Garage Data
  const fetchGarageData = async () => {
    // 💡 user.id എറർ ഒഴിവാക്കാൻ ഇവിടെ check ചെയ്യുന്നു
    if (!user?.id) return;

    try {
      setIsFetching(true);
      // Fetch User Data
      const userRes = await fetch(`http://localhost:5000/users/${user.id}`);
      const currentUser = await userRes.json();
      setUserData(currentUser);

      // Fetch All Cars to filter wishlist
      const carsRes = await fetch(`http://localhost:5000/cars`);
      const allCars = await carsRes.json();

      if (currentUser.wishlist) {
        // വിഷ്‌ലിസ്റ്റിലുള്ള ഐഡികൾ മാത്രം ഫിൽട്ടർ ചെയ്യുന്നു
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

  // 2. Remove from Hangar Function
  const removeFromHangar = async (carId: string) => {
    if (!user?.id || !userData) return;

    // ഐഡി ലിസ്റ്റിൽ നിന്ന് ഒഴിവാക്കുന്നു
    const updatedWishlist = userData.wishlist.filter((id: string) => id !== carId);

    try {
      const res = await fetch(`http://localhost:5000/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wishlist: updatedWishlist }),
      });

      if (res.ok) {
        // UI ഉടൻ അപ്ഡേറ്റ് ചെയ്യാൻ സ്റ്റേറ്റ് മാറ്റുന്നു
        setUserData({ ...userData, wishlist: updatedWishlist });
        setWishlistCars((prev) => prev.filter((car) => car.id !== carId));
        
        // ചെറിയൊരു അനിമേഷൻ
        gsap.to(`.car-card-${carId}`, { opacity: 0, x: -20, duration: 0.3 });
      }
    } catch (err) {
      console.error("Removal failed:", err);
    }
  };

  if (loading || isFetching) {
    return (
      <div className="h-screen bg-black flex items-center justify-center text-white font-mono uppercase tracking-[0.5em]">
        Accessing_Hangar...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black pt-24 px-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black italic text-white mb-10 tracking-tighter uppercase">
          Hangar_Bays <span className="text-blue-500 text-sm">[{wishlistCars.length}]</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlistCars.length > 0 ? (
            wishlistCars.map((car) => (
              <div
                key={car.id}
                className={`car-card-${car.id} bg-zinc-900/30 border border-white/5 p-6 rounded-3xl group hover:border-blue-500/50 transition-all duration-500`}
              >
                {/* Car Image Area */}
                <div className="relative h-48 mb-6 bg-zinc-950/50 rounded-2xl flex items-center justify-center overflow-hidden">
                  {/* 💡 ഇമേജ് കാണാൻ modelUrl തന്നെ ഉപയോഗിക്കുക */}
                  {car.modelurl || car.image ? (
                    <img
                      src={car.modelurl || car.image}
                      alt={car.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="text-[10px] font-mono text-zinc-700 uppercase tracking-[0.5em]">
                      No_Visual_Data
                    </div>
                  )}
                </div>

                {/* Car Info */}
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest mb-1">
                        {car.stats?.engine || "Twin-Turbo"}
                      </p>
                      <h2 className="text-2xl font-black italic text-white leading-tight uppercase">
                        {car.name}
                      </h2>
                    </div>
                    <span className="text-[10px] text-zinc-600 font-mono tracking-tighter">
                      GRADE_S
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <button 
                      onClick={() => router.push(`/product/${car.id}`)}
                      className="text-[10px] uppercase tracking-widest text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      Enter Laboratory
                    </button>

                    {/* 🗑️ റിമൂവ് ചെയ്യാനുള്ള ബട്ടൺ */}
                    <button
                      onClick={() => removeFromHangar(car.id)}
                      className="text-[10px] uppercase tracking-widest text-red-500/40 hover:text-red-500 transition-colors font-bold"
                    >
                      [ Remove_Unit ]
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center border border-dashed border-zinc-800 rounded-3xl">
              <p className="text-zinc-500 font-mono uppercase tracking-[0.3em]">Hangar_is_empty</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}