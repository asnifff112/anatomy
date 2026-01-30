export default function Footer() {
  return (
    <footer className="w-full py-12 px-8 border-t border-white/10 bg-black text-white flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex flex-col gap-2">
        <div className="text-lg font-bold tracking-tighter">ANATOMY.</div>
        <p className="text-[10px] tracking-widest opacity-40 uppercase">Deconstructing the future of tech.</p>
      </div>
      
      <div className="flex gap-8 text-[10px] uppercase tracking-widest opacity-60">
        <a href="#" className="hover:text-white transition">Instagram</a>
        <a href="#" className="hover:text-white transition">Twitter</a>
        <a href="#" className="hover:text-white transition">Discord</a>
      </div>

      <div className="text-[10px] tracking-widest opacity-30 uppercase">
        © 2026 ANATOMY — DESIGNED FOR WEB
      </div>
    </footer>
  );
}