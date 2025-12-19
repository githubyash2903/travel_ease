import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser, logoutUser } from "@/api/auth";

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  signup: (payload: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  /* ---------------- LOAD USER FROM STORAGE ---------------- */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  /* ---------------- LOGIN ---------------- */
  const login = async (email: string, password: string) => {
    const userData = await loginUser({ email, password });
    setUser(userData);
  };

  /* ---------------- SIGNUP ---------------- */
  const signup = async (payload: any) => {
    const userData = await registerUser(payload);
    setUser(userData);
  };

  /* ---------------- LOGOUT ---------------- */
  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
