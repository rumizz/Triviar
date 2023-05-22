import { useContext } from "react";
import { FaPlay } from "react-icons/fa";
import QRCode from "react-qr-code";
import NextButton from "src/client/component/NextButton";
import { GameConnectionContext } from "src/client/util/GameConnectionContext";
import { GameStateContext } from "src/client/util/GameStateContext";
import { proxyClient } from "src/client/util/proxyClient";

export default function WatchLobbyPage() {
  const { players, joinCode } = useContext(GameStateContext);
  const { id } = useContext(GameConnectionContext);

  const url = new URL(`game/${id}`, window.location.origin).toString();

  return (
    <div className="flex flex-row bg-b absolute inset-0">
      <div className="w-1/2 flex flex-col p-8 gap-8 font-bold text-3xl h-full">
        <div className="flex flex-row gap-8 items-center">
          <div className="grow bg-white p-4 rounded-md">Join with code</div>
          <div className="bg-white p-4 rounded-md">{joinCode}</div>
        </div>
        <div className="bg-white rounded-md w-full grow p-6 flex flex-col items-stretch gap-6">
          <p>Or scan QR</p>
          <QRCode value={url} className="w-full h-full max-h-80" />
        </div>
      </div>
      <div className="w-1/2 h-full flex flex-col p-8 gap-8">
        <div className="flex flex-row">
          <p className="font-bold text-3xl drop-shadow-md text-white opacity-80 grow">
            Joined - {players.length}
          </p>
          <NextButton onClick={() => proxyClient.game.nextQuestion.query()}>
            <FaPlay />
            Start
          </NextButton>
        </div>
        <div className="grow flex flex-row flex-wrap gap-4 items-start justify-start content-start">
          {Object.values(players)
            .filter((player) => player.name)
            .map((player) => (
              <div
                key={player.id}
                className="bg-white rounded-full opacity-80 w-fit py-2 px-6"
              >
                {player.name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
