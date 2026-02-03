"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { gsap } from "gsap";
import Link from "next/link";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const formRef = useRef(null);
  const containerRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // GSAP Entry Animation
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 1 })
      .fromTo(formRef.current, 
        { y: 60, opacity: 0, scale: 0.9 }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power4.out" }, "-=0.5");
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    
    const success = await login(email, password);

    if (success) {
      router.push("/home");
    } else {
      setError("Invalid email or password");
    
      gsap.to(formRef.current, { x: 10, duration: 0.1, repeat: 3, yoyo: true });
    }
    setLoading(false);
  };

  return (
    <main ref={containerRef} className="min-h-screen bg-black text-white flex items-center justify-center p-6 pt-32 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div ref={formRef} className="w-full max-w-[450px] bg-zinc-950 border border-white/10 p-10 rounded-[40px] shadow-2xl relative z-10 backdrop-blur-xl">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-block px-3 py-1 border border-blue-500/30 rounded-full mb-4">
             <span className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.3em]">Identity Check</span>
          </div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">Pilot Ignition</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <div className="group">
            <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest ml-1 mb-2 block group-focus-within:text-blue-500 transition-colors">Access ID</label>
            <input
              type="email"
              placeholder="pilot@velocity.vpx"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-600 focus:bg-white/10 transition-all font-mono text-sm"
            />
          </div>

          {/* Password Input */}
          <div className="group">
            <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest ml-1 mb-2 block group-focus-within:text-blue-500 transition-colors">Security Key</label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-600 focus:bg-white/10 transition-all font-mono text-sm"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 p-3 rounded-xl">
               <p className="text-red-500 text-[11px] font-bold uppercase text-center tracking-tighter">{error}</p>
            </div>
          )}

          {/* Login Button */}
          <button 
            disabled={loading}
            className="w-full bg-white text-black font-black uppercase italic p-5 rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-500 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
          >
            <span className="relative z-10">{loading ? "Verifying..." : "Initialize Access"}</span>
            <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-zinc-500 text-[10px] uppercase tracking-widest">
            New Pilot? <Link href="/signup" className="text-white hover:text-blue-500 transition-colors font-bold ml-1 underline underline-offset-4 decoration-blue-500/30">Generate ID</Link>
          </p>
        </div>
      </div>
    </main>
  );
}