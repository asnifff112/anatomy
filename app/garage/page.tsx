"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { toast } from "react-hot-toast";

export default function GaragePage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [wishlistCars, setWishlistCars] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  // പ്രീമിയം കാർ ടോസ്റ്റ് സ്റ്റൈൽ
  const showToast = (message: string, type: "success" | "error" | "warning") => {
    toast(message, {
      duration: 3000,
      position: "top-right",
      style: {
        background: "#0a0a0a",
        color: "#fff",
        border: type === "success" ? "1px solid #2563eb" : type === "error" ? "1px solid #ef4444" : "1px solid #f59e0b",
        borderRadius: "0px",
        padding: "16px",
        fontSize: "10px",
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: "0.2em",
        fontFamily: "monospace",
      },
      icon: type === "success" ? "🔵" : type === "error" ? "🚫" : "⚠️",
    });
  };

  useEffect(() => {
    import("@google/model-viewer");
  }, []);

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
    if (user) fetchGarageData();
  }, [user, loading, router]);

  const removeFromHangar = async (carId: string, carName: string) => {
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
        gsap.to(`.car-card-${carId}`, { opacity: 0, scale: 0.8, duration: 0.4 });
        
        showToast(`${carName} Released from Hangar`, "warning");
      }
    } catch (err) {
      showToast("Sync Error: Removal Failed", "error");
      console.error("Removal failed:", err);
    }
  };

  const handleLogout = async () => {
    showToast("Terminating Session... Safe Journey", "success");
    setTimeout(async () => {
      await logout();
      router.push("/login");
    }, 1000);
  };

  if (loading || isFetching) {
    return <div className="h-screen bg-black flex items-center justify-center text-white font-mono uppercase tracking-[0.5em]">Syncing_Systems...</div>;
  }

  return (
    <main className="min-h-screen bg-black pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 border-b border-white/5 pb-10">
          <div>
            <p className="text-blue-500 font-mono text-[10px] tracking-[0.4em] uppercase mb-2">Access_Granted</p>
            <h1 className="text-4xl font-black italic text-white tracking-tighter uppercase">{user?.name}_Hangar</h1>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => {
                showToast("Redirecting to Key Update Protocol", "success");
                router.push("/change-password");
              }} 
              className="px-5 py-2 border border-white/10 text-[10px] font-bold uppercase text-zinc-400 hover:text-white transition-all"
            >
              Change_Key
            </button>
            <button 
              onClick={handleLogout} 
              className="px-5 py-2 bg-red-600/10 border border-red-500/20 text-[10px] font-bold uppercase text-red-500 hover:bg-red-600 hover:text-white transition-all"
            >
              Terminate_Session
            </button>
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlistCars.map((car) => (
            <div
              key={car.id}
              onClick={() => router.push(`/products/${car.id}`)}
              className={`car-card-${car.id} cursor-pointer bg-zinc-900/30 border border-white/5 p-4 rounded-[2rem] group hover:border-blue-500/50 transition-all duration-500 hover:bg-zinc-900/50`}
            >
              <div className="relative h-56 mb-6 bg-black rounded-2xl overflow-hidden border border-white/5 shadow-inner pointer-events-none">
                {/* @ts-ignore */}
                <model-viewer
                  src={car.modelUrl}
                  alt={car.name}
                  auto-rotate
                  rotation-per-second="30deg"
                  shadow-intensity="2"
                  environment-image="neutral"
                  exposure="1"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>

              <div className="px-2">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <p className="text-[9px] text-blue-500 font-bold uppercase tracking-widest">{car.stats?.engine}</p>
                    <h3 className="text-xl font-black italic text-white uppercase">{car.name}</h3>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 group-hover:text-blue-500 transition-colors">
                    ● View_Details
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation(); 
                      removeFromHangar(car.id, car.name);
                    }}
                    className="z-10 text-[9px] uppercase tracking-[0.2em] text-red-500/50 hover:text-red-500 font-bold transition-colors"
                  >
                    [ Remove_Unit ]
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {wishlistCars.length === 0 && (
          <div className="py-40 text-center border border-dashed border-zinc-800 rounded-[3rem]">
            <p className="text-zinc-600 font-mono text-xs uppercase tracking-[0.5em]">Hangar_Bays_Empty</p>
          </div>
        )}
      </div>
    </main>
  );
}