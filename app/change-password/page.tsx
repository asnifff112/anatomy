"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { toast } from "react-hot-toast";
import { gsap } from "gsap";

export default function ChangePassword() {
  const { user } = useAuth();
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const showToast = (message: string, type: "success" | "error") => {
    toast(message, {
      style: {
        background: "#0a0a0a",
        color: "#fff",
        border: type === "success" ? "1px solid #2563eb" : "1px solid #ef4444",
        borderRadius: "0px",
        padding: "16px",
        fontSize: "10px",
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: "0.2em",
        fontFamily: "monospace",
      },
      icon: type === "success" ? "🔵" : "🚫",
    });
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      
      const res = await fetch(`http://localhost:5000/users/${user.id}`);
      const userData = await res.json();

      if (userData.password !== currentPassword) {
        showToast("Access Denied: Current Security Key Mismatch", "error");
        setLoading(false);
        return;
      }

     
      const updateRes = await fetch(`http://localhost:5000/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword }),
      });

      if (updateRes.ok) {
        showToast("Security Key Re-encoded Successfully", "success");
        setTimeout(() => router.push("/garage"), 2000);
      } else {
        throw new Error();
      }
    } catch (err) {
      showToast("System Error: Update Failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-[400px] bg-zinc-950 border border-white/10 p-8 rounded-[30px] shadow-2xl">
        <div className="mb-8">
          <p className="text-blue-500 font-mono text-[9px] tracking-[0.3em] uppercase mb-2">Protocol: Security_Update</p>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white">Modify_Key</h1>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-6">
          <div className="group">
            <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest block mb-2">Current Key</label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-blue-600 transition-all font-mono text-sm"
              placeholder="••••••••"
            />
          </div>

          <div className="group">
            <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest block mb-2">New Security Key</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-blue-600 transition-all font-mono text-sm"
              placeholder="••••••••"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-white text-black font-black uppercase italic p-4 rounded-xl hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50"
          >
            {loading ? "Re-encoding..." : "Update Security Key"}
          </button>
          
          <button 
            type="button"
            onClick={() => router.back()}
            className="w-full text-zinc-500 font-bold text-[10px] uppercase tracking-widest hover:text-white transition-colors"
          >
            [ Cancel_Action ]
          </button>
        </form>
      </div>
    </main>
  );
}