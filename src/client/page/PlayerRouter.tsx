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
import Button from "../component/Button";

import { MdLogout } from "react-icons/md";
import ToolContainer from "../component/ToolContainer";

export default function PlayerRouter() {
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
        <ToolContainer>
          <Button
            onClick={() => {
              // eslint-disable-next-line no-restricted-globals
              if (confirm("Are you sure?")) {
                proxyClient.game.leave.query().then(leave);
              }
            }}
            className="bg-red-600"
          >
            <MdLogout />
            Leave
          </Button>
        </ToolContainer>
        <div className="h-12" />
        <Footer />
      </div>
    </GameStateContextProvider>
  );
}
