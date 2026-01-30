"use client";
import { motion } from 'framer-motion';
// Font Awesome icons import cheyyunnu
import { FaInstagram, FaTwitter, FaDiscord, FaGithub } from 'react-icons/fa';

const socialLinks = [
  { id: 1, icon: <FaInstagram size={20} />, href: "#", label: "Instagram" },
  { id: 2, icon: <FaTwitter size={20} />, href: "#", label: "Twitter" },
  { id: 3, icon: <FaDiscord size={20} />, href: "#", label: "Discord" },
  { id: 4, icon: <FaGithub size={20} />, href: "#", label: "Github" },
];

export default function Footer() {
  return (
    <footer className="w-full py-16 px-10 border-t border-white/5 bg-black text-white flex flex-col items-center gap-10">
      
      {/* Brand Section */}
      <div className="text-center">
        <div className="text-2xl font-black tracking-tighter italic uppercase">ANATOMY.</div>
        <p className="text-[10px] tracking-[0.5em] opacity-40 uppercase mt-2">
          Deconstructing the future of tech.
        </p>
      </div>

      {/* Social Dock with React Icons */}
      <div className="flex items-center gap-3 p-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
        {socialLinks.map((link) => (
          <motion.a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ 
              scale: 1.2, 
              y: -8, 
              backgroundColor: "rgba(255,255,255,0.15)",
              color: "#fff"
            }}
            className="p-4 rounded-xl text-white/40 transition-all duration-300"
            title={link.label}
          >
            {link.icon}
          </motion.a>
        ))}
      </div>

      {/* Bottom Text */}
      <div className="text-[9px] tracking-[0.4em] opacity-20 uppercase border-t border-white/5 pt-8 w-full text-center">
        © 2026 ANATOMY — ENGINEERED FOR THE FUTURE
      </div>
    </footer>
  );
}