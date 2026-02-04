"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  id: string;
  title: string;
  description: string;
  video: string;
}

export default function ProductFeatures({ features }: { features: Feature[] }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!features) return;
    
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".feature-row").forEach((row: any) => {
        gsap.fromTo(row,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 1,
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
  }, [features]);

  return (
    <section ref={containerRef} className="py-24 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-20 border-l-4 border-blue-600 pl-4">
          Technical Analysis
        </h2>

        {features?.map((feature, index) => (
          <div 
            key={feature.id} 
            className={`feature-row flex flex-col md:flex-row items-center gap-16 mb-40 ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="w-full md:w-3/5 relative group">
              <div className="absolute -inset-1 bg-blue-600/20 rounded-2xl blur-xl group-hover:opacity-100 transition duration-700 opacity-0"></div>
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                <video
                  src={feature.video}
                  autoPlay loop muted playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="w-full md:w-2/5 space-y-6">
              <span className="text-blue-500 font-mono text-sm tracking-widest uppercase">Component_{feature.id}</span>
              <h3 className="text-3xl font-bold uppercase italic tracking-tight italic">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-lg font-light leading-relaxed">
                {feature.description}
              </p>
              <div className="h-[1px] w-full bg-gradient-to-r from-blue-600 to-transparent"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}