import { Phase } from "src/server/types/Phase";
import QuestionPage from "./common/Question";
import ScoresPage from "./common/Scores";
import PhaseRouter, { PhaseRoute } from "../util/PhaseRouter";
import NamePage from "./player/Name";
import ResultPage from "./player/Result";
import { useContext } from "react";
import PlayerLobbyPage from "./player/PlayerLobby";
import GameStateContextProvider from "../util/GameStateContext";
import { PlayerStateContext } from "../util/PlayerStateContext";
import { proxyClient } from "../util/proxyClient";
import { GameConnectionContext } from "../util/GameConnectionContext";
import Footer from "./player/Footer";

export default function Player() {
  const { name } = useContext(PlayerStateContext);
  const { leave } = useContext(GameConnectionContext);

  if (!name) {
    return <NamePage />;
  }

  return (
    <GameStateContextProvider>
      <div className="flex flex-col absolute inset-0">
        <PhaseRouter>
          <PhaseRoute value={Phase.lobby}>
            <PlayerLobbyPage />
          </PhaseRoute>
          <PhaseRoute value={Phase.question}>
            <QuestionPage view="player" />
          </PhaseRoute>
          <PhaseRoute value={Phase.answer}>
            <ResultPage />
          </PhaseRoute>
          <PhaseRoute value={Phase.scores}>
            <ScoresPage view="player" />
          </PhaseRoute>
          <PhaseRoute value={Phase.podium}>
            <div>podium</div>
          </PhaseRoute>
        </PhaseRouter>
        <button
          onClick={() => {
            // eslint-disable-next-line no-restricted-globals
            if (confirm("Are you sure?")) {
              proxyClient.game.leave.query().then(leave);
            }
          }}
          className="absolute top-4 left-4 bg-red-600 px-8 py-2 text-white font-bold rounded-md shadow-md z-20"
        >
          Leave
        </button>
        <Footer />
      </div>
    </GameStateContextProvider>
  );
}
