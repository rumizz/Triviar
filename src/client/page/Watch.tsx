import { Phase } from "src/server/types/Phase";
import Commands from "../component/Commands";
import GameStateContextProvider from "../util/GameStateContext";
import PhaseRouter, { PhaseRoute } from "../util/PhaseRouter";
import QuestionPage from "./common/Question";
import ScoresPage from "./common/Scores";
import WatchLobbyPage from "./watch/WatchLobby";

export default function Watch() {
  return (
    <GameStateContextProvider>
      <div>
        <Commands />
        <PhaseRouter>
          <PhaseRoute value={Phase.lobby}>
            <WatchLobbyPage />
          </PhaseRoute>
          <PhaseRoute value={Phase.question}>
            <QuestionPage view="watch" />
          </PhaseRoute>
          <PhaseRoute value={Phase.answer}>
            <QuestionPage view="watch" />
          </PhaseRoute>
          <PhaseRoute value={Phase.scores}>
            <ScoresPage view="watch" />
          </PhaseRoute>
          <PhaseRoute value={Phase.podium}>
            <div>podium</div>
          </PhaseRoute>
        </PhaseRouter>
      </div>
    </GameStateContextProvider>
  );
}
