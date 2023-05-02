import { Phase } from "src/server/types/Phase";
import GameStateContextProvider from "../util/GameStateContext";
import PhaseRouter, { PhaseRoute } from "../util/PhaseRouter";
import QuestionPage from "./common/Question";
import ScoresPage from "./common/Scores";
import WatchLobbyPage from "./watch/WatchLobby";
import NextButton from "../component/NextButton";
import { proxyClient } from "../util/proxyClient";
import Footer from "./watch/Footer";
import ToolContainer from "../component/ToolContainer";
import { FaArrowRight, FaStop } from "react-icons/fa";

export default function Watch() {
  return (
    <GameStateContextProvider>
      <div className="flex flex-col absolute inset-0">
        <PhaseRouter>
          <PhaseRoute value={Phase.lobby}>
            <WatchLobbyPage />
          </PhaseRoute>
          <PhaseRoute value={Phase.question}>
            <>
              <QuestionPage view="watch" />
              <ToolContainer>
                <NextButton
                  onClick={() => proxyClient.game.finishQuestion.query()}
                  className="!bg-a"
                >
                  <FaStop />
                  End Timer
                </NextButton>
              </ToolContainer>
            </>
          </PhaseRoute>
          <PhaseRoute value={Phase.answer}>
            <>
              <QuestionPage view="watch" />

              <ToolContainer>
                <NextButton
                  onClick={() => proxyClient.game.endQuestion.query()}
                >
                  <FaArrowRight />
                  Next
                </NextButton>
              </ToolContainer>
            </>
          </PhaseRoute>
          <PhaseRoute value={Phase.scores}>
            <>
              <ScoresPage view="watch" />

              <ToolContainer>
                <NextButton
                  onClick={() => proxyClient.game.nextQuestion.query()}
                >
                  <FaArrowRight />
                  Next
                </NextButton>
              </ToolContainer>
            </>
          </PhaseRoute>
          <PhaseRoute value={Phase.podium}>
            <div>podium</div>
          </PhaseRoute>
        </PhaseRouter>
        <div className="h-12" />
        <Footer />
      </div>
    </GameStateContextProvider>
  );
}
