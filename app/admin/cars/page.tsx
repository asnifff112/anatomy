"use client";
import React, { useState, useEffect } from "react";
import { Trash2, Plus, UploadCloud, FileCode, Edit3, Video, Image as ImageIcon, Settings, Fingerprint, Hash, Zap } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

interface Feature { id: string; title: string; description: string; video: string; }
interface Part { id: string; name: string; description: string; price: string; image: string; }
interface CarType {
  id: string;
  name: string;
  price: string;
  modelUrl: string;
  labScale: number;
  cardScale: number;
  stats: { engine: string; power: string; torque: string; topSpeed: string; acceleration: string; weight: string; };
  features: Feature[];
  parts: Part[];
}

const INITIAL_FORM: CarType = {
  id: "", name: "", price: "", modelUrl: "", labScale: 1.0, cardScale: 1.0,
  stats: { engine: "", power: "", torque: "", topSpeed: "", acceleration: "", weight: "" },
  features: [], parts: []
};

export default function CarsInventory() {
  const [cars, setCars] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<CarType>(INITIAL_FORM);

  useEffect(() => { fetchCars(); }, []);

  const fetchCars = async () => {
    try {
      const res = await fetch("http://localhost:5000/cars");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setCars(data);
    } catch (err) { toast.error("Database sync failed. Is the server running?"); }
  };

  const handleFileSelect = (type: "model" | "feature" | "part", index?: number) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = type === "model" ? ".glb,.gltf" : type === "feature" ? ".mp4,.webm" : ".png,.jpg,.jpeg,.webp";
    
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (!file) return;

     
const path = type === 'model' 
  ? `/models/${file.name}`   
  : `/${type === 'feature' ? 'videos' : 'parts'}/${file.name}`;
      if (type === "model") {
        setFormData(prev => ({ ...prev, modelUrl: path }));
      } else if (type === "feature" && index !== undefined) {
        const updatedFeatures = [...formData.features];
        updatedFeatures[index].video = path;
        setFormData(prev => ({ ...prev, features: updatedFeatures }));
      } else if (type === "part" && index !== undefined) {
        const updatedParts = [...formData.parts];
        updatedParts[index].image = path;
        setFormData(prev => ({ ...prev, parts: updatedParts }));
      }
      toast.success(`${file.name} linked`);
    };
    input.click();
  };

  const handleUpdate = async () => {
    if (!formData.id || !formData.name) return toast.error("ID and Name are mandatory");
    
    setLoading(true);
    try {
      const isNew = !editingId;
      const url = isNew ? "http://localhost:5000/cars" : `http://localhost:5000/cars/${editingId}`;
      
      const res = await fetch(url, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        toast.success(isNew ? "New Unit Registered" : "Cloud Data Synchronized");
        setFormData(INITIAL_FORM);
        setEditingId(null);
        fetchCars();
      } else {
        toast.error("Server rejected the update");
      }
    } catch (error) {
      toast.error("Connection lost");
    } finally {
      setLoading(false);
    }
  };

  const deleteCar = async (id: string) => {
    if (!confirm("Are you sure? This action is permanent.")) return;
    try {
      await fetch(`http://localhost:5000/cars/${id}`, { method: 'DELETE' });
      toast.success("Unit Decommissioned");
      fetchCars();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-8 bg-[#060608] min-h-screen text-white font-sans selection:bg-blue-500/30">
      <Toaster position="top-right" reverseOrder={false} />
      
      {/* HEADER */}
      <header className="flex justify-between items-center border-b border-white/5 pb-8 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20">
            <Settings className="text-blue-500" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black uppercase italic tracking-tighter">Inventory Console</h1>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Fleet Management System v2.0</p>
          </div>
        </div>
        {editingId && (
          <button onClick={() => {setEditingId(null); setFormData(INITIAL_FORM);}} className="text-red-500 text-[10px] font-bold uppercase border border-red-500/20 px-6 py-2 rounded-full hover:bg-red-500 hover:text-white transition-all">
            Exit Edit Mode
          </button>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* LEFT COLUMN: IDENTITY & SPECS */}
        <div className="space-y-6">
          <section className="bg-[#0c0c0e] p-8 rounded-[40px] border border-white/5 space-y-4 shadow-2xl">
            <h3 className="text-blue-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2"><Fingerprint size={14}/> Core Identity</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-500 uppercase ml-2">Unique Identifier (ID)</label>
                <input className="admin-input" placeholder="e.g. nissan-gtr-r34" value={formData.id} disabled={!!editingId} onChange={e => setFormData({...formData, id: e.target.value.toLowerCase().replace(/\s+/g, '-')})} />
              </div>
              
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-500 uppercase ml-2">Display Name</label>
                <input className="admin-input" placeholder="Full Model Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-500 uppercase ml-2">Market Price</label>
                  <input className="admin-input" placeholder="$ 0.00" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-500 uppercase ml-2">3D Asset Path</label>
                  <div className="relative group cursor-pointer" onClick={() => handleFileSelect("model")}>
                    <input readOnly className="admin-input pl-12 cursor-pointer border-blue-500/20 hover:border-blue-500/50 truncate" placeholder="Select GLB" value={formData.modelUrl} />
                    <FileCode className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={18} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-[9px] text-zinc-500 uppercase ml-2 mb-1 block">Lab Scale (Scene)</label>
                  <input className="admin-input" type="number" step="0.1" value={formData.labScale} onChange={e => setFormData({...formData, labScale: parseFloat(e.target.value) || 0})} />
                </div>
                <div>
                  <label className="text-[9px] text-zinc-500 uppercase ml-2 mb-1 block">Card Scale (UI)</label>
                  <input className="admin-input" type="number" step="0.1" value={formData.cardScale} onChange={e => setFormData({...formData, cardScale: parseFloat(e.target.value) || 0})} />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-[#0c0c0e] p-8 rounded-[40px] border border-white/5 space-y-4">
            <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2"><Zap size={14}/> Technical Performance</h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.keys(formData.stats).map((key) => (
                <div key={key} className="space-y-1">
                  <input 
                    className="admin-input text-xs" 
                    placeholder={key.toUpperCase()} 
                    value={(formData.stats as any)[key]} 
                    onChange={e => setFormData({...formData, stats: {...formData.stats, [key]: e.target.value}})} 
                  />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: INTERACTIVES */}
        <div className="space-y-8 overflow-y-auto max-h-[75vh] pr-4 custom-scrollbar">
          
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-orange-500 text-[10px] font-black uppercase tracking-widest ml-4">Feature Modules</h3>
              <button onClick={() => setFormData({...formData, features: [...formData.features, {id: "", title: "", description: "", video: ""}]})} className="bg-orange-500/10 text-orange-500 p-2 rounded-xl hover:bg-orange-500 hover:text-white transition-all"><Plus size={18}/></button>
            </div>
            {formData.features.map((f, i) => (
              <div key={i} className="bg-white/5 p-6 rounded-[2.5rem] space-y-3 relative border border-white/[0.03] group animate-in fade-in slide-in-from-right-4">
                <div className="flex gap-3">
                  <div className="w-1/3 relative">
                     <Hash size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500/50" />
                     <input className="admin-input bg-black/40 text-[10px] pl-8" placeholder="ID" value={f.id} onChange={e => {
                       const updated = [...formData.features]; updated[i].id = e.target.value.toLowerCase().replace(/\s+/g, '-'); setFormData({...formData, features: updated});
                     }} />
                  </div>
                  <input className="admin-input bg-black/40 text-xs font-bold flex-1" placeholder="Title" value={f.title} onChange={e => {
                    const updated = [...formData.features]; updated[i].title = e.target.value; setFormData({...formData, features: updated});
                  }} />
                </div>
                <textarea className="admin-input bg-black/40 text-[11px] h-16 resize-none" placeholder="Description" value={f.description} onChange={e => {
                  const updated = [...formData.features]; updated[i].description = e.target.value; setFormData({...formData, features: updated});
                }} />
                <div className="relative cursor-pointer" onClick={() => handleFileSelect("feature", i)}>
                  <input readOnly className="admin-input bg-black/40 text-[10px] pl-10 cursor-pointer truncate" placeholder="Select Video" value={f.video} />
                  <Video size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" />
                </div>
                <button onClick={() => setFormData({...formData, features: formData.features.filter((_, idx) => idx !== i)})} className="absolute -top-2 -right-2 bg-red-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:scale-110"><Trash2 size={12}/></button>
              </div>
            ))}
          </section>

          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-emerald-500 text-[10px] font-black uppercase tracking-widest ml-4">Upgrade Schematics</h3>
              <button onClick={() => setFormData({...formData, parts: [...formData.parts, {id: "", name: "", description: "", price: "", image: ""}]})} className="bg-emerald-500/10 text-emerald-500 p-2 rounded-xl hover:bg-emerald-500 hover:text-white transition-all"><Plus size={18}/></button>
            </div>
            {formData.parts.map((p, i) => (
              <div key={i} className="bg-white/5 p-6 rounded-[2.5rem] space-y-3 relative border border-white/[0.03] group animate-in fade-in slide-in-from-right-4">
                <div className="flex gap-3">
                   <div className="w-1/3 relative">
                     <Hash size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500/50" />
                     <input className="admin-input bg-black/40 text-[10px] pl-8" placeholder="ID" value={p.id} onChange={e => {
                       const updated = [...formData.parts]; updated[i].id = e.target.value.toLowerCase().replace(/\s+/g, '-'); setFormData({...formData, parts: updated});
                     }} />
                   </div>
                   <input className="admin-input bg-black/40 text-xs font-bold flex-1" placeholder="Part Name" value={p.name} onChange={e => {
                     const updated = [...formData.parts]; updated[i].name = e.target.value; setFormData({...formData, parts: updated});
                   }} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input className="admin-input bg-black/40 text-xs" placeholder="Price" value={p.price} onChange={e => {
                    const updated = [...formData.parts]; updated[i].price = e.target.value; setFormData({...formData, parts: updated});
                  }} />
                  <div className="relative cursor-pointer" onClick={() => handleFileSelect("part", i)}>
                    <input readOnly className="admin-input bg-black/40 text-[10px] pl-10 cursor-pointer truncate" placeholder="Part Image" value={p.image} />
                    <ImageIcon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" />
                  </div>
                </div>
                <button onClick={() => setFormData({...formData, parts: formData.parts.filter((_, idx) => idx !== i)})} className="absolute -top-2 -right-2 bg-red-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:scale-110"><Trash2 size={12}/></button>
              </div>
            ))}
          </section>
        </div>
      </div>

      <button onClick={handleUpdate} disabled={loading} className="w-full mt-8 py-6 rounded-[2.5rem] bg-blue-600 hover:bg-blue-500 font-black uppercase italic tracking-[0.4em] transition-all shadow-xl shadow-blue-900/40 disabled:opacity-50 flex items-center justify-center gap-3">
        {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : <><UploadCloud size={20}/> {editingId ? "Update Data" : "Save New Unit"}</>}
      </button>

      {/* FOOTER MINI LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-12 pt-12 border-t border-white/5">
        {cars.map(car => (
          <div key={car.id} className="bg-[#0c0c0e] p-4 rounded-3xl border border-white/5 flex flex-col gap-3 group hover:border-blue-500/30 transition-all">
            <div className="flex flex-col truncate">
              <span className="text-[8px] text-zinc-500 font-bold uppercase">{car.id}</span>
              <span className="text-[11px] font-black uppercase italic tracking-tighter truncate">{car.name}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => {setEditingId(car.id); setFormData(car); window.scrollTo({top:0, behavior:'smooth'});}} className="flex-1 py-2 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all flex justify-center"><Edit3 size={14}/></button>
              <button onClick={() => deleteCar(car.id)} className="flex-1 py-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all flex justify-center"><Trash2 size={14}/></button>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .admin-input { width: 100%; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); padding: 0.9rem 1.2rem; border-radius: 1.2rem; outline: none; color: white; transition: 0.3s; }
        .admin-input:focus { border-color: #3b82f6; background: rgba(59, 130, 246, 0.05); }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #27272a; border-radius: 10px; }
      `}</style>
    </div>
  );
}