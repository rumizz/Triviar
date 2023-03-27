import { Context } from "../../router/context";
import { AnswerSymbol } from "../../types/AnswerOption";
import finishQuestion from "./finishQuestion";

export function answer({ game, user }: Context, answerString: string) {
  const answer = answerString as AnswerSymbol;
  if (!answer) {
    return;
  }
  let prevAnswer = game.players[user.id].state.get().answer;

  game.players[user.id].state.set({ answer });

  if (!prevAnswer) {
    if (
      game.state.get().answeredCount ===
      Object.keys(game.players).length - 1
    ) {
      clearTimeout(game.timeout);
      setTimeout(() => finishQuestion(game), 1000);
    }
    game.state.set((prev) => ({
      answeredCount: prev.answeredCount + 1,
    }));
  }
}
