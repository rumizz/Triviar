import { Context } from "../../router/context";
import { Phase } from "../../types/Phase";

export default function finishQuestion({ game }: Context) {
  let answerOptions = game.answerOptions;

  game.timeout && clearTimeout(game.timeout);

  Object.values(game.players).forEach((player) => {
    let answer = player.state.get().answer;
    if (answer) {
      let isCorrect = answerOptions[answer].correct;
      console.log(player.state.get().name, isCorrect);
      player.state.set({ isCorrect });
    }
  });
  game.state.set({ phase: Phase.answer });
}
