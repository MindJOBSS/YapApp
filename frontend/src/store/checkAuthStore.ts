import { create } from "zustand";


type CheckAuthStore = {
    isAuthenticated: boolean;
    setIsAuthenticated: (status: boolean) => void;
}

export const checkAuthStore = create<CheckAuthStore>((set) => ({
    isAuthenticated: false,
    setIsAuthenticated: (status) => set({ isAuthenticated: status })
}))