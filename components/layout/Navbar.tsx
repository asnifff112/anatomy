"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  // Scroll cheyyumbozh navbar-inte blur and border koodan vendi
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 w-full z-[100] px-6 py-8 transition-all duration-500">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`max-w-5xl mx-auto flex justify-between items-center px-8 py-4 rounded-full transition-all duration-500 ${
          scrolled 
          ? "bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]" 
          : "bg-transparent border border-transparent"
        }`}
      >
        {/* Logo Section */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="w-6 h-6 bg-white flex items-center justify-center rounded-sm group-hover:rotate-[180deg] transition-transform duration-500">
             <span className="text-black font-black text-[10px]">A</span>
          </div>
          <span className="text-lg font-black tracking-tighter italic uppercase">Anatomy</span>
        </Link>

        {/* Links Section - About and Lab Included */}
        <div className="hidden md:flex items-center gap-10">
          {[
            { name: 'Home', path: '/' },
            { name: 'Inside', path: '/about' },
            { name: 'The Lab', path: '/lab' }
          ].map((item) => (
            <Link 
              key={item.name} 
              href={item.path}
              className="relative text-[10px] uppercase tracking-[0.3em] font-semibold text-white/50 hover:text-white transition-colors group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <Link href="/products/headphone-01">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-gray-200 transition-all"
          >
            Explore
          </motion.button>
        </Link>
      </motion.nav>
    </header>
  );
}