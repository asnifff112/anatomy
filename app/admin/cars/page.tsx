"use client";
import { useEffect, useState, useRef } from "react";
import { Plus, Trash2, Box, Gauge, Zap, Activity, CarFront, UploadCloud, FastForward, Edit3, X } from "lucide-react";
import { toast } from "react-hot-toast";

export default function CarDetails() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null); // എഡിറ്റ് ചെയ്യുന്ന ഐഡി ട്രാക്ക് ചെയ്യാൻ
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    modelUrl: "",
    engine: "",
    power: "",
    topSpeed: "",
    acceleration: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.name.endsWith(".glb")) {
        setFormData({ ...formData, modelUrl: `/${file.name}` });
        toast.success(`Unit Selected: ${file.name}`);
      } else {
        toast.error("Please select a valid .glb file");
      }
    }
  };

  const fetchCars = () => {
    fetch("http://localhost:5000/cars")
      .then((res) => res.json())
      .then(setCars)
      .catch(() => toast.error("Database Connection Lost"));
  };

  useEffect(() => { fetchCars(); }, []);

  // എഡിറ്റ് മോഡിലേക്ക് മാറാൻ
  const startEdit = (car: any) => {
    setEditingId(car.id);
    setFormData({
      name: car.name,
      price: car.price.replace('$', '').replace(',', ''), // $ ചിഹ്നം ഒഴിവാക്കി നമ്പറാക്കുന്നു
      modelUrl: car.modelUrl,
      engine: car.stats.engine,
      power: car.stats.power,
      topSpeed: car.stats.topSpeed,
      acceleration: car.stats.acceleration,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' }); // ഫോമിലേക്ക് സ്ക്രോൾ ചെയ്യുന്നു
  };

  // എഡിറ്റ് ക്യാൻസൽ ചെയ്യാൻ
  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", price: "", modelUrl: "", engine: "", power: "", topSpeed: "", acceleration: "" });
  };

  const handleAddOrUpdate = async () => {
    if (!formData.name || !formData.price || !formData.modelUrl) {
      toast.error("Required fields (Name, Price, GLB) are missing!");
      return;
    }

    setLoading(true);
    const carData = {
      id: editingId || formData.name.toLowerCase().replace(/\s+/g, '-'),
      name: formData.name,
      price: `$${Number(formData.price).toLocaleString()}`,
      modelUrl: formData.modelUrl,
      labScale: 1.2,
      cardScale: 0.8,
      stats: {
        engine: formData.engine || "N/A",
        power: formData.power || "N/A",
        topSpeed: formData.topSpeed || "N/A",
        acceleration: formData.acceleration || "N/A",
      },
      features: [],
      parts: []
    };

    try {
      const url = editingId 
        ? `http://localhost:5000/cars/${editingId}` 
        : "http://localhost:5000/cars";
      
      const method = editingId ? "PUT" : "POST";

      await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(carData)
      });

      toast.success(editingId ? "Unit Updated" : `${formData.name} integrated`);
      cancelEdit();
      fetchCars();
    } catch (err) {
      toast.error("Operation Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if(!confirm("Are you sure you want to decommission this unit?")) return;
    await fetch(`http://localhost:5000/cars/${id}`, { method: "DELETE" });
    toast.error("Unit Scrapped");
    fetchCars();
  };

  return (
    <div className="p-8 space-y-10 bg-[#060608] min-h-screen text-white font-sans selection:bg-blue-500/30">
      
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black uppercase italic tracking-tighter flex items-center gap-3">
          <CarFront className="text-blue-500" strokeWidth={3} /> Fleet Management
        </h1>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em]">Deploy and monitor 3D assets</p>
      </div>

      {/* --- ADD / EDIT FORM --- */}
      <div className={`bg-gradient-to-br from-[#101014] to-[#0a0a0c] p-8 rounded-[32px] border transition-all duration-500 ${editingId ? 'border-blue-500/50 shadow-blue-500/10' : 'border-white/5 shadow-2xl'}`}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className={`h-2 w-2 rounded-full animate-pulse ${editingId ? 'bg-orange-500' : 'bg-blue-500'}`} />
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">
              {editingId ? "Modify Existing Unit" : "Initialize New Unit"}
            </h2>
          </div>
          {editingId && (
            <button onClick={cancelEdit} className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white flex items-center gap-1">
              <X size={14}/> Cancel Edit
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <label className="input-label">Core Identity</label>
            <input className="admin-input" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <input className="admin-input" placeholder="Price (USD)" type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
            
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".glb" className="hidden" />
            
            <div onClick={() => fileInputRef.current?.click()} className="admin-input border-dashed border-zinc-700 hover:border-blue-500 flex flex-col items-center justify-center py-6 cursor-pointer group transition-all">
                <UploadCloud size={20} className="mb-2 text-zinc-500 group-hover:text-blue-500 transition-colors" />
                <span className="text-[10px] font-bold uppercase tracking-tight text-zinc-400 group-hover:text-blue-300 text-center px-2">
                    {formData.modelUrl ? formData.modelUrl : "Choose .glb from manager"}
                </span>
            </div>
          </div>

          <div className="space-y-4 md:col-span-2">
            <label className="input-label">Performance Specs</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative"><Gauge className="input-icon" size={14}/><input className="admin-input pl-10" placeholder="Engine" value={formData.engine} onChange={e => setFormData({...formData, engine: e.target.value})} /></div>
              <div className="relative"><Zap className="input-icon" size={14}/><input className="admin-input pl-10" placeholder="Power (HP)" value={formData.power} onChange={e => setFormData({...formData, power: e.target.value})} /></div>
              <div className="relative"><FastForward className="input-icon" size={14}/><input className="admin-input pl-10" placeholder="Top Speed" value={formData.topSpeed} onChange={e => setFormData({...formData, topSpeed: e.target.value})} /></div>
              <div className="relative"><Activity className="input-icon" size={14}/><input className="admin-input pl-10" placeholder="0-100 km/h" value={formData.acceleration} onChange={e => setFormData({...formData, acceleration: e.target.value})} /></div>
            </div>
          </div>
        </div>

        <button 
          onClick={handleAddOrUpdate}
          disabled={loading}
          className={`mt-8 w-full ${editingId ? 'bg-orange-600 hover:bg-orange-500' : 'bg-blue-600 hover:bg-blue-500'} text-white p-5 rounded-2xl font-black uppercase italic tracking-widest transition-all active:scale-[0.98] shadow-lg flex justify-center items-center gap-3`}
        >
          {loading ? <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 
          <>{editingId ? <Edit3 size={20}/> : <Plus size={20}/>} {editingId ? "Update Production Unit" : "Initialize Production"}</>}
        </button>
      </div>

      {/* --- FLEET LIST --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.length === 0 && !loading && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-[32px]">
                <Box className="mx-auto text-zinc-800 mb-4" size={48} />
                <p className="text-zinc-500 font-bold uppercase text-xs tracking-widest">Hangar is Empty</p>
            </div>
        )}
        
        {cars.map((car: any) => (
          <div key={car.id} className="group relative bg-[#101014] border border-white/5 p-7 rounded-[32px] hover:border-blue-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-black italic tracking-tighter uppercase leading-none mb-2 group-hover:text-blue-500 transition-colors">{car.name}</h3>
                <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border border-blue-500/20">
                    {car.price}
                </span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(car)} className="bg-zinc-800/50 hover:bg-blue-500/20 text-zinc-500 hover:text-blue-500 p-3 rounded-2xl transition-all">
                  <Edit3 size={18}/>
                </button>
                <button onClick={() => handleDelete(car.id)} className="bg-zinc-800/50 hover:bg-red-500/20 text-zinc-500 hover:text-red-500 p-3 rounded-2xl transition-all">
                  <Trash2 size={18}/>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/5 group-hover:bg-blue-500/[0.02] transition-colors">
                <p className="text-[8px] font-bold text-zinc-500 uppercase mb-1 tracking-widest">Top Speed</p>
                <p className="text-xs font-mono font-bold text-zinc-200">{car.stats.topSpeed}</p>
              </div>
              <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/5 group-hover:bg-blue-500/[0.02] transition-colors">
                <p className="text-[8px] font-bold text-zinc-500 uppercase mb-1 tracking-widest">Power</p>
                <p className="text-xs font-mono font-bold text-zinc-200">{car.stats.power}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
               <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-600 italic">
                  <Box size={12} /> {car.modelUrl}
               </div>
               <div className="h-2 w-2 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]" title="System Live" />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .admin-input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 1rem 1.25rem;
          border-radius: 1.25rem;
          outline: none;
          font-size: 0.85rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .admin-input:focus {
          border-color: rgba(59, 130, 246, 0.5);
          background: rgba(59, 130, 246, 0.05);
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.1);
        }
        .input-label {
          display: block;
          text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1;
        }
        .input-icon {
          position: absolute;
          left: 1rem;
          top: 1.15rem;
          color: #52525b;
        }
      `}</style>
    </div>
  );
}