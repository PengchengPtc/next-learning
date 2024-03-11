'use client'

import { AuthContext } from "@/Provider/AuthProvider";
import { useContext } from "react";

export function useAuth() {
  return useContext(AuthContext);
}
