import { AnswerSymbol } from "src/server/types/AnswerOption";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const usePlayerStore = create(
  persist<{
    myAnswer: AnswerSymbol | null;
    setMyAnswer: (myAnswer: AnswerSymbol) => void;
    clear: () => void;
    names: { [key in string]: string };
    setName: (name: string, gameId: string) => void;
  }>(
    (set) => ({
      myAnswer: null,
      setMyAnswer: (myAnswer: AnswerSymbol) => set({ myAnswer }),
      clear: () => set({ myAnswer: null }),
      names: {} as { [key in string]: string },
      setName: (name: string, gameId: string) =>
        set((prev) => ({ names: { ...prev.names, [gameId]: name } })),
    }),
    {
      name: "player-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
