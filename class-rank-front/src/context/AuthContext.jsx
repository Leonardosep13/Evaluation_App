import React, { createContext, useEffect, useState } from "react";
import { getMeApi} from "../api/user";

export const AuthContext = createContext({
  user: null,
  login: () => null,
  logout: () => {},
  isLoading: true,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async () => {
    const me = await getMeApi();
    setUser(me);
  };

  const logout = async () => {
    await fetch("http://127.0.0.1:8000/api/auth/logout/", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        setIsLoading(true);
        const me = await getMeApi();
        setUser(me);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkSession();
  }, []);

  const value = { user, login, logout, isLoading };

  if (isLoading) return <p>Cargando sesión...</p>;

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
