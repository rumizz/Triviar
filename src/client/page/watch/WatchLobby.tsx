import { useContext } from "react";
import NextButton from "src/client/component/NextButton";
import { GameStateContext } from "src/client/util/GameStateContext";
import { proxyClient } from "src/client/util/proxyClient";

export default function WatchLobbyPage() {
  const { players, joinCode } = useContext(GameStateContext);

  return (
    <div className="flex flex-row bg-b absolute inset-0">
      <div className="w-1/2 flex flex-col p-8 gap-8 font-bold text-3xl h-full">
        <div className="flex flex-row gap-8 items-center">
          <div className="grow bg-white p-4 rounded-md">Join with code</div>
          <div className="bg-white p-4 rounded-md">{joinCode}</div>
        </div>
        <div className="bg-white rounded-md w-full grow p-4">Or scan QR</div>
      </div>
      <div className="w-1/2 h-full flex flex-col p-8 gap-8">
        <div className="flex flex-row">
          <p className="font-bold text-3xl drop-shadow-md text-white opacity-80 grow">
            Joined - {players.length}
          </p>
          <NextButton
            onClick={() => proxyClient.game.nextQuestion.query()}
            text="start"
          />
        </div>
        <div className="grow flex flex-row flex-wrap gap-4 items-start justify-start content-start">
          {Object.values(players)
            .filter((player) => player.name)
            .map((player) => (
              <div className="bg-white rounded-full opacity-80 w-fit py-2 px-6">
                {player.name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
