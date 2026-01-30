"use client";
import { motion } from 'framer-motion';

export default function InsideAnatomy() {
  const features = [
    { title: "Precision", desc: "Every bolt and circuit is rendered with 1:1 accuracy." },
    { title: "Transparency", desc: "Understand the engineering that powers your daily life." },
    { title: "Interaction", desc: "Don't just look—explore, rotate, and deconstruct." }
  ];

  return (
    <main className="min-h-screen bg-black pt-32 pb-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h2 className="text-[10vw] font-black tracking-tighter italic leading-none opacity-10 absolute -top-10 left-0">VISION</h2>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 relative z-10">
            WE STRIP TECH <br /> <span className="text-white/40 italic font-light font-serif">TO ITS CORE.</span>
          </h1>
          <p className="max-w-2xl text-gray-400 text-lg leading-relaxed">
            Anatomy is a digital laboratory where hardware meets high-art. We believe that true beauty 
            lies in the complexity of internal engineering. Our mission is to provide an immersive 
            experience that physical retail stores simply cannot offer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="p-10 border border-white/5 bg-gradient-to-br from-white/5 to-transparent rounded-3xl hover:border-white/20 transition-all group"
            >
              <span className="text-[10px] tracking-[0.4em] text-white/30 font-bold uppercase">0{i+1}</span>
              <h3 className="text-xl font-bold mt-4 mb-2 group-hover:italic transition-all">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}