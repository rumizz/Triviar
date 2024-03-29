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

  const joinedAndnNamedPlayerCount = players.filter((p) => p.name).length;

  return (
    <div className="flex flex-row bg-b absolute inset-0">
      <div className="w-1/2 flex flex-col p-8 gap-8 font-bold text-3xl h-full">
        <div className="flex p-4 bg-white rounded-md flex-row flex-wrap gap-4 items-start">
          <div className="grow">Join with code</div>
          <div>{joinCode}</div>
        </div>
        <div className="bg-white rounded-md w-full grow p-6 flex flex-col items-stretch gap-6 mb-16">
          <p>Or scan QR</p>
          <QRCode value={url} className="grow w-full max-h-80" />
        </div>
      </div>
      <div className="w-1/2 h-full flex flex-col p-8 gap-8">
        <div className="flex flex-row">
          <p className="font-bold text-3xl drop-shadow-md text-white opacity-80 grow">
            Joined - {joinedAndnNamedPlayerCount}
          </p>
          <NextButton
            disabled={joinedAndnNamedPlayerCount === 0}
            onClick={() => proxyClient.game.nextQuestion.query()}
          >
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
          {players.length === 0 && (
            <p className="text-white opacity-80">
              Waiting for players to join...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
