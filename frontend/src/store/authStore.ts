import { create } from "zustand";

type AuthStore = {
  accessToken: string | null;
  user: {
    id: string;
    email: string;
    fullName: string;
    profilePic?: string;
  } | null;
  setAuthData: (data: {
    accessToken: string;
      user: { id: string; email: string; fullName: string; profilePic?: string };
    message?: string
  }| null) => void;
};

export const authStore = create<AuthStore>((set) => ({
  accessToken: null,
  user: null,
  setAuthData: (data) =>
    set({ accessToken: data?.accessToken || null , user: data?.user || null }),
}));
