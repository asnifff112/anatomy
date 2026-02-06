"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { LayoutDashboard, CarFront, Users, LogOut, Box } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const sidebarRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
   
      gsap.from(sidebarRef.current, { 
        x: -100, 
        opacity: 0, 
        duration: 1, 
        ease: "power3.out" 
      });
      gsap.from(contentRef.current, { 
        opacity: 0, 
        y: 20, 
        duration: 0.8, 
        delay: 0.3 
      });
    });
    return () => ctx.revert();
  }, [pathname]); 

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Car Details", path: "/admin/cars", icon: <CarFront size={20} /> },
    { name: "User Control", path: "/admin/users", icon: <Users size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#0a0a0c] text-white">
      <aside 
        ref={sidebarRef}
        className="w-64 border-r border-white/5 bg-[#0d0d0f] flex flex-col sticky top-0 h-screen z-20"
      >
        <div className="p-8">
          <h2 className="text-2xl font-black tracking-tighter italic text-blue-500">
            ANATOMY <span className="text-xs block text-gray-500 not-italic tracking-widest">ADMIN PANEL</span>
          </h2>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  isActive 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                    : "text-gray-500 hover:bg-white/5 hover:text-gray-200"
                }`}
              >
                <span className={`${isActive ? "text-white" : "text-gray-600 group-hover:text-blue-400"} transition-colors`}>
                  {item.icon}
                </span>
                <span className="font-bold text-sm tracking-tight">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/5">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-all font-bold text-sm">
            <LogOut size={20} />
            Exit Admin
          </Link>
        </div>
      </aside>

      <main 
        ref={contentRef}
        className="flex-1 overflow-y-auto"
      >
        <header className="h-16 border-b border-white/5 bg-[#0a0a0c]/50 backdrop-blur-md flex items-center justify-end px-8 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs font-bold text-gray-200">Admin Asnif</p>
              <p className="text-[10px] text-green-500 font-bold uppercase">System Online</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center font-black">
              A
            </div>
          </div>
        </header>

        <div className="p-4">
          {children}
        </div>
      </main>
    </div>
  );
}