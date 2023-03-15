import { GameState } from "src/server/types/GameState";
import { proxyClient } from "../util/proxyClient";

export default function Commands() {
  return (
    <div className="flex flex-row p-2 gap-2">
      {Object.values(GameState).map((state) => (
        <button key={state} className={'bg-gray-200 text-black py-2 px-4 rounded-md'} onClick={() => proxyClient.game.set.query(state)}>{state}</button>
      ))}
    </div>
  );
}
