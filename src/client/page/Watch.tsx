import { Phase } from "src/server/types/Phase";
import GameStateContextProvider from "../util/GameStateContext";
import PhaseRouter, { PhaseRoute } from "../util/PhaseRouter";
import QuestionPage from "./common/Question";
import ScoresPage from "./common/Scores";
import WatchLobbyPage from "./watch/WatchLobby";
import NextButton from "../component/NextButton";
import { proxyClient } from "../util/proxyClient";

export default function Watch() {
  return (
    <GameStateContextProvider>
      <div>
        <PhaseRouter>
          <PhaseRoute value={Phase.lobby}>
            <WatchLobbyPage />
          </PhaseRoute>
          <PhaseRoute value={Phase.question}>
            <>
              <QuestionPage view="watch" />
              <NextButton
                onClick={() => proxyClient.game.finishQuestion.query()}
                text="Next"
              />
            </>
          </PhaseRoute>
          <PhaseRoute value={Phase.answer}>
            <>
              <QuestionPage view="watch" />
              <NextButton
                onClick={() => proxyClient.game.endQuestion.query()}
                text="Next"
              />
            </>
          </PhaseRoute>
          <PhaseRoute value={Phase.scores}>
            <>
              <ScoresPage view="watch" />
              <NextButton
                onClick={() => proxyClient.game.nextQuestion.query()}
                text="Next"
              />
            </>
          </PhaseRoute>
          <PhaseRoute value={Phase.podium}>
            <div>podium</div>
          </PhaseRoute>
        </PhaseRouter>
      </div>
    </GameStateContextProvider>
  );
}
