"use client";
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function GaragePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); 
    }
  }, [user, loading, router]);

  if (loading) return <div className="h-screen bg-black flex items-center justify-center text-white font-mono uppercase tracking-[0.5em]">Scanning Identity...</div>;
  if (!user) return null;

  return (
    <main className="min-h-screen bg-black text-white pt-32 px-10">
      <h1 className="text-6xl font-black uppercase italic">Welcome to your Hangar, {user.name}</h1>
      <p className="text-blue-500 font-mono mt-4">PILOT CALLSIGN: {user.callsign}</p>
     
    </main>
  );
}