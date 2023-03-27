import { AnswerSymbol } from "src/server/types/AnswerOption";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const usePlayerStore = create(
  persist<{
    myAnswer: AnswerSymbol | null;
    setMyAnswer: (myAnswer: AnswerSymbol) => void;
    clear: () => void;
    name: string;
    setName: (name: string) => void;
  }>(
    (set) => ({
      myAnswer: null,
      setMyAnswer: (myAnswer: AnswerSymbol) => set({ myAnswer }),
      clear: () => set({ myAnswer: null }),
      name: "",
      setName: (name: string) => set({ name }),
    }),
    {
      name: "player-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
