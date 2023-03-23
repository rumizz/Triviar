import React, { createContext, useState, useEffect } from "react";
import { GameState } from "src/server/types/Game";
import { proxyClient } from "./proxyClient";

export const GameStateContext = createContext<GameState>({} as GameState);

export default function GameStateContextProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [state, setState] = useState<GameState>({} as GameState);

  useEffect(() => {
    const subscription = proxyClient.game.state.subscribe(undefined, {
      onStarted() {
        console.log("connected");
      },
      onData(data: GameState) {
        console.log("received", data);
        setState(prev => ({ ...prev, ...data }));
      },
      onError(err) {
        console.error("error", err);
      },
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return (
    <GameStateContext.Provider value={state}>{children}</GameStateContext.Provider>
  );
}