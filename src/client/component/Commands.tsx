import clsx from "clsx";
import { useContext } from "react";
import { Phase } from "src/server/types/Phase";
import { GameStateContext } from "../util/GameStateContext";
import { proxyClient } from "../util/proxyClient";

export default function Commands() {
  const state = useContext(GameStateContext);

  return (
    <div className="fixed top-0 left-0 z-10 flex flex-col p-2 gap-2">
      {Object.values(Phase).map((phase) => (
        <button
          key={phase}
          className={clsx("bg-gray-200 text-black py-2 px-4 rounded-md", {
            "bg-gray-300": phase === state.phase,
          })}
          onClick={() => proxyClient.game.setPhase.query(phase)}
        >
          {phase}
        </button>
      ))}
    </div>
  );
}
