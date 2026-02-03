"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import Link from "next/link";

const DB_URL = "http://localhost:5000/users";

export default function SignupPage() {
  const router = useRouter();
  const formRef = useRef(null);
  const leftPanelRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    callsign: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // GSAP Animation
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(leftPanelRef.current, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power4.out" })
      .fromTo(".animate-input", { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "back.out(1.7)" }, "-=0.5");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const checkRes = await fetch(`${DB_URL}?email=${form.email}`);
      const existing = await checkRes.json();

      if (existing.length > 0) {
        setError("Email already exists");
        setLoading(false);
        gsap.to(formRef.current, { x: 10, duration: 0.1, repeat: 3, yoyo: true });
        return;
      }

      await fetch(DB_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      router.push("/login");
    } catch (err) {
      setError("Signup failed. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-4 pt-28">
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-zinc-950 border border-white/10 rounded-[40px] overflow-hidden shadow-2xl relative z-10">
        
        {/* Left Side: Brand Identity */}
        <div ref={leftPanelRef} className="p-12 bg-gradient-to-br from-blue-900/30 to-black flex flex-col justify-between border-r border-white/5">
          <div>
            <div className="w-14 h-14 bg-white rounded-2xl rotate-45 flex items-center justify-center mb-12 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              <span className="text-black font-black text-2xl -rotate-45 italic">V.</span>
            </div>
            <h1 className="text-6xl font-black italic uppercase leading-none tracking-tighter mb-6">
              Build Your <br/><span className="text-blue-500">Legacy.</span>
            </h1>
            <p className="text-zinc-500 font-mono text-xs tracking-widest leading-relaxed max-w-xs">
              Join the elite league of pilots. Register your profile to start collecting and customizing your fleet.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-[2px] w-12 bg-blue-600"></div>
            <span className="text-[10px] font-bold tracking-[0.5em] text-blue-500 uppercase">Velocity Phase 01</span>
          </div>
        </div>

        {/* Right Side: Signup Form */}
        <div className="p-10 md:p-16 bg-zinc-950/50 backdrop-blur-md">
          <form ref={formRef} onSubmit={handleSignup} className="space-y-5">
            <h2 className="text-xl font-bold uppercase italic tracking-widest mb-8 animate-input">Pilot Registration</h2>
            
            <div className="space-y-4">
              <div className="animate-input">
                <label className="text-[10px] uppercase font-bold text-zinc-500 ml-1">Full Name</label>
                <input name="name" required placeholder="Dominic Toretto" onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-blue-500 outline-none transition-all font-mono text-sm mt-1" />
              </div>

              <div className="animate-input">
                <label className="text-[10px] uppercase font-bold text-zinc-500 ml-1">Callsign (Handle)</label>
                <input name="callsign" placeholder="E.g. SPEED_KING" onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-blue-500 outline-none transition-all font-mono text-sm mt-1" />
              </div>

              <div className="animate-input">
                <label className="text-[10px] uppercase font-bold text-zinc-500 ml-1">Email Address</label>
                <input name="email" type="email" required placeholder="pilot@velocity.com" onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-blue-500 outline-none transition-all font-mono text-sm mt-1" />
              </div>

              <div className="animate-input">
                <label className="text-[10px] uppercase font-bold text-zinc-500 ml-1">Access Key</label>
                <input name="password" type="password" required placeholder="••••••••" onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-blue-500 outline-none transition-all font-mono text-sm mt-1" />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 p-3 rounded-xl animate-input">
                <p className="text-red-500 text-[10px] font-bold uppercase text-center tracking-widest">{error}</p>
              </div>
            )}

            <button disabled={loading} className="animate-input w-full bg-white text-black font-black uppercase italic p-5 rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-500 active:scale-95 disabled:opacity-50">
              {loading ? "Initializing..." : "Create Account"}
            </button>
            
            <p className="text-center text-[10px] text-zinc-500 uppercase tracking-widest mt-6 animate-input">
              Member already? <Link href="/login" className="text-white hover:text-blue-500 font-bold ml-1 underline underline-offset-4 decoration-blue-500/30">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}