"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Inside', path: '/about' },
    { name: 'Lab', path: '/lab' }
  ];

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100]">
      <motion.nav 
        initial={{ y: -100, width: "100px", opacity: 0 }}
        animate={{ y: 0, width: "auto", opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 15,
          delay: 0.2
        }}
        className="flex items-center gap-1 p-2 bg-[#1a1a1a]/90 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
      >
        {/* Brand Icon (Left Side) */}
        <Link href="/" className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-2 hover:scale-90 transition-transform">
          <span className="text-black font-black text-xs">A.</span>
        </Link>

        {/* Links (Center) */}
        <div className="flex items-center bg-black/40 rounded-full px-2 py-1">
          {links.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link key={link.name} href={link.path}>
                <div className={`relative px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                  isActive ? 'text-black' : 'text-white/60 hover:text-white'
                }`}>
                  {/* Active Background Pill - Fixed Color Logic */}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white rounded-full" 
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {/* Text needs high z-index to sit on top of the pill */}
                  <span className="relative z-10">{link.name}</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Action Button (Right Side) */}
        <Link href="/products/headphone-01" className="ml-2">
           <div className="w-10 h-10 bg-[#2a2a2a] rounded-full flex items-center justify-center border border-white/5 hover:bg-blue-600 hover:border-blue-500 transition-all group">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:scale-110 transition-transform">
               <path d="M5 12h14M12 5l7 7-7 7"/>
             </svg>
           </div>
        </Link>

      </motion.nav>
    </div>
  );
}