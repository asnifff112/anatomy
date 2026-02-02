"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const partsData = [
  {
    id: "01",
    title: "Chassis & Aerodynamics",
    description: "Lightweight carbon fiber chassis designed for maximum downforce and high-speed stability.",
    video: "/videos/chassis.mp4", 
  },
  {
    id: "02",
    title: "V8 Twin-Turbo Engine",
    description: "A masterpiece of engineering, delivering 600+ HP with precision cooling systems.",
    video: "/videos/engine.mp4",
  },
  {
    id: "03",
    title: "Matrix LED Lighting",
    description: "Advanced laser technology that adapts to the road conditions in real-time.",
    video: "/videos/lights.mp4",
  }
];

export default function ProductFeatures() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ഓരോ ഫീച്ചർ ബോക്സിനും ആനിമേഷൻ നൽകുന്നു
      gsap.utils.toArray(".feature-row").forEach((row: any) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: row,
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 bg-background text-foreground overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-black uppercase italic mb-20 tracking-tighter border-l-4 border-midnight pl-6">
          Technical Specifications
        </h2>

        {partsData.map((part, index) => (
          <div 
            key={part.id} 
            className={`feature-row flex flex-col md:flex-row items-center gap-12 mb-32 ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* 🎥 Video Section */}
            <div className="w-full md:w-3/5 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-midnight to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative aspect-video rounded-xl overflow-hidden border border-border bg-black">
                <video
                  src={part.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <span className="absolute -top-6 -left-6 text-8xl font-black text-midnight/10 z-0">
                {part.id}
              </span>
            </div>

            {/* 📝 Text Content Section */}
            <div className="w-full md:w-2/5 space-y-6">
              <h3 className="text-3xl font-bold uppercase tracking-tight text-midnight">
                {part.title}
              </h3>
              <p className="text-lg text-foreground/70 font-light leading-relaxed">
                {part.description}
              </p>
              <div className="h-1 w-20 bg-midnight"></div>
              <button className="text-xs uppercase tracking-[0.3em] font-bold hover:text-blue-500 transition-colors">
                Explore Tech →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}