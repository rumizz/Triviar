import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useLoginStore = create(
  persist<{
    username: string;
    token: string;
    isLoggedIn: boolean;
    setToken: (token: string) => void;
    setLoggedIn: (isLoggedIn: boolean) => void;
    setUsername: (username: string) => void;
    logout: () => void;
  }>(
    (set) => ({
      username: "",
      token: "",
      isLoggedIn: false,
      setToken: (token: string) => set({ token }),
      setLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
      setUsername: (username: string) => set({ username }),
      logout: () => set({ token: "", isLoggedIn: false, username: "" }),
    }),
    {
      name: "login-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
