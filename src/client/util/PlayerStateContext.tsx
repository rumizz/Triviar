import React, { createContext, useState, useEffect } from "react";
import { PlayerState } from "src/server/types/Player";
import { usePlayerStore } from "../store/playerStore";
import { proxyClient, token } from "./proxyClient";

export const PlayerStateContext = createContext<PlayerState>({} as PlayerState);

export default function PlayerStateContextProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [state, setState] = useState<PlayerState>({} as PlayerState);

  const { name, setName } = usePlayerStore();

  useEffect(() => {
    const subscription = proxyClient.game.playerState.subscribe(token, {
      onStarted() {
        console.log("connected");
      },
      onData(data: PlayerState) {
        console.log("received player state", data);

        if (data.name) {
          // if the server has a name for us, use it
          setName(data.name);
        } else if (name) {
          // if the server does not have a name for us, but we do, send it to the server
          proxyClient.game.setName.query(name);
        }

        setState((prev) => ({ ...prev, ...data }));
      },
      onError(err) {
        console.error("error", err);
      },
    });
    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PlayerStateContext.Provider value={state}>
      {children}
    </PlayerStateContext.Provider>
  );
}
