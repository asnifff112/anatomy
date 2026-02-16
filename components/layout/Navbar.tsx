"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext'; 

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth(); 
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Inside', path: '/about' },
    { name: 'Lab', path: '/lab' },
    { name: 'Garage', path: '/garage' },
  ];

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-fit">
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative flex items-center gap-4 px-6 py-2 bg-[#0a0a0a]/80 backdrop-blur-3xl border-x border-t border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        style={{
          clipPath: "polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)",
          borderRadius: "20px"
        }}
      >
        {/* 🏮 Left Headlight */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-4 bg-blue-500 rounded-full blur-[4px] opacity-50" />

        {/* Brand Icon */}
        <Link href="/" className="relative z-10 w-8 h-8 bg-gradient-to-br from-white to-zinc-400 rounded-md rotate-45 flex items-center justify-center hover:scale-110 transition-transform">
          <span className="text-black font-black text-[10px] -rotate-45 italic">A.</span>
        </Link>

        {/* Links Container */}
        <div className="flex items-center gap-1 bg-white/5 rounded-full px-2 py-1 border border-white/5">
          {links.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link key={link.name} href={link.path}>
                <div className={`relative px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                  isActive ? 'text-black' : 'text-white/50 hover:text-white'
                }`}>
                  {isActive && (
                    <motion.div 
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white" 
                      style={{ borderRadius: "inherit" }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </div>
              </Link>
            );
          })}
        </div>

        {user ? (
          <div className="flex items-center gap-7">
             <span className="text-[9px] font-mono text-blue-500 uppercase tracking-tighter">
                ID: {user.callsign || user.name.split(' ')[0]}
             </span>
            
          </div>
        ) : (
          <Link href="/signup">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-[9px] font-black uppercase tracking-tighter italic rounded-sm transition-colors shadow-[4px_0_15px_rgba(220,38,38,0.3)]"
              style={{ clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0% 100%)" }}
            >
              Generate ID
            </motion.button>
          </Link>
        )}

        {/* 🏮 Right Taillight */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1 h-4 bg-red-500 rounded-full blur-[4px] opacity-50" />
      </motion.nav>

      {/* Aero Line Underneath */}
      <div className="w-[80%] h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mx-auto mt-1 opacity-40" />
    </div>
  );
}