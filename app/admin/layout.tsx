"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { 
  LayoutDashboard, 
  CarFront, 
  Users, 
  LogOut, 
  Settings, 
  Database, 
  History 
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const sidebarRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Sidebar Entrance
      gsap.from(sidebarRef.current, { 
        x: -100, 
        opacity: 0, 
        duration: 1, 
        ease: "power3.out" 
      });
      // Main Content Entrance
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
    { name: "Add New Car", path: "/admin/cars", icon: <Plus size={20} className="text-emerald-500" /> }, // Car form
    { name: "Fleet Inventory", path: "/admin/FleetInventory", icon: <Database size={20} /> }, // Your new component
    { name: "User Control", path: "/admin/users", icon: <Users size={20} /> },
    { name: "Settings", path: "/admin/settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#0a0a0c] text-white overflow-hidden">
      {/* SIDEBAR */}
      <aside 
        ref={sidebarRef}
        className="w-64 border-r border-white/5 bg-[#0d0d0f] flex flex-col sticky top-0 h-screen z-20"
      >
        <div className="p-8">
          <h2 className="text-2xl font-black tracking-tighter italic text-blue-500">
            ANATOMY <span className="text-xs block text-gray-500 not-italic tracking-widest">ADMIN PANEL</span>
          </h2>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto custom-scrollbar">
          <p className="px-4 text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-4">Main Menu</p>
          
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
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* FOOTER ACTION */}
        <div className="p-6 border-t border-white/5 space-y-4">
          <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/5">
            <p className="text-[10px] font-bold text-zinc-500 uppercase mb-2">System Status</p>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-ping" />
              <span className="text-[10px] font-mono text-zinc-400">Server: 127.0.0.1:5000</span>
            </div>
          </div>
          
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-all font-bold text-sm">
            <LogOut size={20} />
            Exit Admin
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main 
        ref={contentRef}
        className="flex-1 flex flex-col h-screen overflow-hidden"
      >
        {/* TOP NAVBAR */}
        <header className="h-20 border-b border-white/5 bg-[#0a0a0c]/50 backdrop-blur-md flex items-center justify-between px-8 z-10">
          <div>
            <h3 className="text-sm font-bold text-zinc-400">Welcome Back,</h3>
            <p className="text-xs text-zinc-600">Managing your high-performance fleet.</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <p className="text-xs font-bold text-gray-200 uppercase tracking-tighter">Admin Asnif</p>
              <p className="text-[9px] text-blue-500 font-black uppercase tracking-widest px-2 py-0.5 bg-blue-500/10 rounded-full border border-blue-500/20">
                Super User
              </p>
            </div>
            <div className="relative group">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-[1px]">
                <div className="h-full w-full bg-[#0a0a0c] rounded-2xl flex items-center justify-center font-black group-hover:bg-transparent transition-all duration-500">
                  A
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-4 border-[#0a0a0c] rounded-full" />
            </div>
          </div>
        </header>

        {/* DYNAMIC CONTENT WRAPPER */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </div>
  );
}

// Helper icon for emerald plus
function Plus({ size, className }: { size: number, className: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M5 12h14"/><path d="M12 5v14"/>
    </svg>
  );
}