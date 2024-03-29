import { Context } from "../../router/context";
import { AnswerSymbol } from "../../types/AnswerOption";
import findPlayer from "./findOrCreatePlayer";
import finishQuestion from "./finishQuestion";

export function answer({ game, user }: Context, answerString: string) {
  const answer = answerString as AnswerSymbol;
  if (!answer) {
    return;
  }
  const player = findPlayer(game, user.id);
  let prevAnswer = player.state.get().answer;
  const time = Date.now();
  player.state.set({ answer, time });
  console.log("answer", user.id, player.state.get().answer);

  if (!prevAnswer) {
    if (
      game.state.get().answeredCount ===
      Object.keys(game.players).length - 1
    ) {
      clearTimeout(game.timeout);
      setTimeout(() => finishQuestion({ game, user }), 1000);
    }
    game.state.set((prev) => ({
      answeredCount: prev.answeredCount + 1,
    }));
  }
}
