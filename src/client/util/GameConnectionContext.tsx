import React, { createContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { proxyClient } from "./proxyClient";

export type GameConnection = {
  id: string;
  leave: () => void;
};

export const GameConnectionContext = createContext<GameConnection>(
  {} as GameConnection
);

export default function GameConnectionContextProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const { gameId } = useParams();
  const navigate = useNavigate();

  const leave = () => {
    proxyClient.game.leave.query();
    navigate("/");
  };
  return (
    <GameConnectionContext.Provider value={{ id: gameId ?? "", leave }}>
      {children}
    </GameConnectionContext.Provider>
  );
}
