import React, { createContext, useState, useEffect, useContext } from "react";
import { GameState } from "src/server/types/Game";
import { Phase } from "src/server/types/Phase";
import { usePlayerStore } from "../store/playerStore";
import { proxyClient, token } from "./proxyClient";
import { GameConnectionContext } from "./GameConnectionContext";

export const GameStateContext = createContext<GameState>({} as GameState);

export default function GameStateContextProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [state, setState] = useState<GameState>({} as GameState);

  const { clear } = usePlayerStore();
  const { leave } = useContext(GameConnectionContext);

  useEffect(() => {
    if (state.phase === Phase.question) {
      clear();
    }
  }, [state.phase, clear]);

  useEffect(() => {
    const subscription = proxyClient.game.state.subscribe(token, {
      onStarted() {
        console.log("connected");
      },
      onData(data: GameState) {
        console.log("received game state", data);
        setState((prev) => ({ ...prev, ...data }));
      },
      onError(err) {
        console.error("game state error", err);
        console.warn("The game has probably ended");
        leave();
      },
    });
    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <GameStateContext.Provider value={state}>
      {children}
    </GameStateContext.Provider>
  );
}
