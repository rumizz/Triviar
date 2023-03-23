import { Phase } from "src/server/types/Phase";
import { proxyClient } from "../util/proxyClient";
export default function Commands() {
  return (
    <div className="fixed top-0 left-0 z-10 flex flex-col p-2 gap-2">
      {Object.values(Phase).map((state) => (
        <button
          key={state}
          className={"bg-gray-200 text-black py-2 px-4 rounded-md"}
          onClick={() => proxyClient.game.setPhase.query(state)}
        >
          {state}
        </button>
      ))}
    </div>
  );
}
