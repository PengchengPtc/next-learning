"use client";

import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface UserInfo {
  id: number;
  avatar?: string;
  nickname: string;
}

export const AuthContext = createContext<{
  user: UserInfo | null;
  setUser: React.Dispatch<React.SetStateAction<UserInfo | null>>;
}>({
  user: null,
  setUser: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const cookieUser = Cookies.get("user");

    if (cookieUser) {
      setUser(JSON.parse(cookieUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
