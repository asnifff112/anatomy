"use client";
import { useEffect, useRef } from "react";
import { motion } from 'framer-motion';
import { TextGenerateEffect } from '@/components/ui/TextGenerateEffect';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function InsideAnatomy() {
  const containerRef = useRef(null);
  const words = `Anatomy is a digital laboratory where hardware meets high-art. We believe that true beauty lies in the complexity of internal engineering. Our mission is to provide an immersive experience that physical retail stores simply cannot offer.`;

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Feature cards scroll trigger
      gsap.from(".feature-card", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        }
      });

      // Background lines movement
      gsap.to(".bg-line", {
        height: "100%",
        duration: 2,
        ease: "power4.out",
        stagger: 0.2
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative min-h-screen bg-black pt-32 pb-20 px-6 md:px-20 overflow-hidden">
      
      {/* Background Aesthetic Lines */}
      <div className="absolute inset-0 flex justify-around pointer-events-none opacity-10">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-line w-[1px] h-0 bg-white" />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <p className="text-blue-500 font-mono text-[10px] tracking-[0.5em] mb-4 uppercase">System_Manifesto.v2</p>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
            WE STRIP TECH <br /> 
            <span className="text-white/20 italic font-light font-serif">TO ITS CORE.</span>
          </h1>
          
          <div className="max-w-2xl border-l border-blue-500/30 pl-8 mt-12">
            <TextGenerateEffect words={words} />
          </div>
        </motion.div>

        {/* Features Grid with GSAP Animation */}
        <div className="features-grid grid grid-cols-1 md:grid-cols-3 gap-10 mt-32">
          {[
            { title: "Precision", desc: "Every bolt, every gear, rendered in ultra-high fidelity." },
            { title: "Transparency", desc: "No hidden layers. We show you the engineering others hide." },
            { title: "Immersion", desc: "A retail experience designed for the digital age." }
          ].map((feature, i) => (
            <div key={i} className="feature-card group border border-white/5 p-10 bg-zinc-950/50 backdrop-blur-sm hover:border-blue-500/50 transition-colors">
              <span className="text-blue-500 font-mono text-xs">0{i + 1} //</span>
              <h3 className="text-2xl font-bold uppercase mt-4 mb-4 italic group-hover:text-blue-400 transition-colors">{feature.title}</h3>
              <p className="text-zinc-500 font-mono text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Decoration */}
      <div className="mt-40 pt-10 border-t border-white/5 flex justify-between items-center opacity-20 font-mono text-[10px] tracking-widest uppercase">
        <span>Anatomy Lab © 2024</span>
        <span>Secure Access Only</span>
      </div>
    </main>
  );
}