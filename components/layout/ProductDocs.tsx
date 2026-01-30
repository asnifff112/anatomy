"use client";
import { motion } from 'framer-motion';
import { Github, HardDrive, MessageCircle, Info } from 'lucide-react';

const icons = [
  { id: 1, icon: <Github size={20} />, label: "Github" },
  { id: 2, icon: <HardDrive size={20} />, label: "Drive" },
  { id: 3, icon: <MessageCircle size={20} />, label: "Chat" },
  { id: 4, icon: <Info size={20} />, label: "Docs" }
];

export default function ProductDock() {
  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-2 p-3 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl"
      >
        {icons.map((item, index) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.2, y: -5, backgroundColor: "rgba(255,255,255,0.1)" }}
            className="p-3 cursor-pointer rounded-xl transition-colors text-white/70 hover:text-white"
          >
            {item.icon}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}