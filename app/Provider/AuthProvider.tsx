"use client";

import { createContext, useMemo, useState } from "react";

interface UserInfo {
  userId:number,
  avatar?: string,
  nickname:string
}

export const AuthContext = createContext<{
    user: UserInfo | null; 
    login: (userData: UserInfo) => void; 
    logout: () => void;
  }>({
    user: null,
    login: (userData) => {},
    logout: () => {},
  });
  
  export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserInfo | null>(() => {
      if (typeof window !== "undefined") {
        const userData = window.localStorage.getItem("user");
        return userData ? JSON.parse(userData) : null;
      }
      return null;
    });
  
    // 登录：保存用户至state，并存入localStorage
    const login = (userData: UserInfo) => {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    };
  
    // 退出：从state中删除用户，并在localStorage中删除用户
    const logout = () => {
      setUser(null);
      localStorage.removeItem("user");
    };
  
    return (
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  }