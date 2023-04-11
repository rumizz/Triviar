import { useContext } from "react";
import { PlayerStateContext } from "src/client/util/PlayerStateContext";

export default function PlayerLobbyPage() {
  const { name } = useContext(PlayerStateContext);
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-b text-white font-bold text-xl">
      Get ready, {name}
    </div>
  );
}
