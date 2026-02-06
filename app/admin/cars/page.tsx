"use client";
import { useEffect, useState } from "react";
import { Plus, Trash2, Box } from "lucide-react";

export default function CarDetails() {
  const [cars, setCars] = useState([]);
  const [name, setName] = useState("");

  const fetchCars = () => {
    fetch("http://localhost:5000/cars").then(res => res.json()).then(setCars);
  };

  useEffect(() => { fetchCars(); }, []);

  const handleAdd = async () => {
    const newCar = { name, url: `/models/${name.toLowerCase()}.glb`, status: "Live" };
    await fetch("http://localhost:5000/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCar)
    });
    setName("");
    fetchCars(); 
  };

  const handleDelete = async (id: any) => {
    await fetch(`http://localhost:5000/cars/${id}`, { method: "DELETE" });
    fetchCars(); 
  };

  return (
    <div className="p-8 space-y-8 bg-[#0a0a0c] min-h-screen text-white">
      <div className="flex gap-4 bg-[#141417] p-6 rounded-2xl border border-white/5">
        <input 
          className="flex-1 bg-[#1c1c21] p-3 rounded-xl border border-white/5 outline-none focus:border-blue-500" 
          placeholder="New Car Name..." 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleAdd} className="bg-blue-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2">
          <Plus size={18}/> Add Car
        </button>
      </div>

      <div className="bg-[#141417] rounded-2xl border border-white/5 overflow-hidden">
        {cars.map((car: any) => (
          <div key={car.id} className="p-5 border-t border-white/5 flex justify-between items-center group hover:bg-white/5">
            <div className="flex items-center gap-3"><Box size={16} className="text-blue-500"/> {car.name}</div>
            <button onClick={() => handleDelete(car.id)} className="text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Trash2 size={18}/>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}