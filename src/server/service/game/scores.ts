import { Context } from "../../router/context";
import { Phase } from "../../types/Phase";

export default function scores({ game }: Context) {
  // end if game is over
  if (game.state.get().questionIndex === game.quiz.questions.length - 1) {
    game.state.set({
      phase: Phase.end,
      players: game.players.map((player) => player.publicData()),
    });
    return;
  }

  game.state.set({
    phase: Phase.scores,
    players: game.players.map((player) => player.publicData()),
  });
}
