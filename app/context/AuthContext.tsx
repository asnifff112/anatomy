"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";


interface User {
  name: string;
  email: string;
  callsign?: string;
  garage: any[];
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("velocity_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // ലോഗിൻ ഫംഗ്ഷൻ
  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("velocity_user", JSON.stringify(userData));
  };

  // ലോഗൗട്ട് ഫംഗ്ഷൻ
  const logout = () => {
    setUser(null);
    localStorage.removeItem("velocity_user");
    window.location.href = "/login"; // ലോഗൗട്ട് ചെയ്താൽ ലോഗിൻ പേജിലേക്ക് വിടുന്നു
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// കസ്റ്റം ഹുക്ക് - മറ്റ് കംപോണന്റുകളിൽ എളുപ്പത്തിൽ ഉപയോഗിക്കാൻ
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};