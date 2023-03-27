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

export default function Player() {
  const { name } = useContext(PlayerStateContext);

  if (!name) {
    return <NamePage />;
  }

  return (
    <GameStateContextProvider>
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
    </GameStateContextProvider>
  );
}
