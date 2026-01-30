"use client";
import { motion } from 'framer-motion';
import { Instagram, Twitter, MessageSquare, Github } from 'lucide-react';

const socialLinks = [
  { id: 1, icon: <Instagram size={18} />, href: "#", label: "Instagram" },
  { id: 2, icon: <Twitter size={18} />, href: "#", label: "Twitter" },
  { id: 3, icon: <MessageSquare size={18} />, href: "#", label: "Discord" },
  { id: 4, icon: <Github size={18} />, href: "#", label: "Github" },
];

export default function Footer() {
  return (
    <footer className="w-full py-16 px-10 border-t border-white/5 bg-black text-white flex flex-col items-center gap-10">
      
      {/* Brand Section */}
      <div className="text-center">
        <div className="text-2xl font-black tracking-tighter italic">ANATOMY.</div>
        <p className="text-[10px] tracking-[0.5em] opacity-40 uppercase mt-2">
          Deconstructing the future of tech.
        </p>
      </div>

      {/* Social Dock Integration */}
      <div className="flex items-center gap-2 p-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
        {socialLinks.map((link) => (
          <motion.a
            key={link.id}
            href={link.href}
            whileHover={{ 
              scale: 1.2, 
              y: -5, 
              backgroundColor: "rgba(255,255,255,0.1)" 
            }}
            className="p-3 rounded-xl text-white/50 hover:text-white transition-colors"
            title={link.label}
          >
            {link.icon}
          </motion.a>
        ))}
      </div>

      {/* Copyright */}
      <div className="text-[9px] tracking-[0.3em] opacity-20 uppercase border-t border-white/5 pt-8 w-full text-center">
        © 2026 ANATOMY — ARCHITECTED FOR THE VIRTUAL RETAIL
      </div>
    </footer>
  );
}