import React, { createContext, useState, useEffect, useContext } from "react";
import { PlayerState } from "src/server/types/Player";
import { usePlayerStore } from "../store/playerStore";
import { proxyClient } from "./proxyClient";
import { GameConnectionContext } from "./GameConnectionContext";
import { useLoginStore } from "../store/loginStore";

export const PlayerStateContext = createContext<PlayerState>({} as PlayerState);

export default function PlayerStateContextProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [state, setState] = useState<PlayerState>({} as PlayerState);

  const { names, setName } = usePlayerStore();
  const { id } = useContext(GameConnectionContext);

  const { token } = useLoginStore();

  useEffect(() => {
    const subscription = proxyClient.game.playerState.subscribe(token, {
      onStarted() {
        console.log("connected");
      },
      onData(data: PlayerState) {
        console.log("received player state", JSON.stringify(data));

        if (data.name) {
          // if the server has a name for us, use it
          setName(data.name, id);
        } else if (names[id]) {
          // if the server does not have a name for us, but we do, send it to the server
          proxyClient.game.setName.query(names[id]);
          data.name = names[id];
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
