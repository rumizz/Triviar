import { Context } from "../../router/context";
import { Phase } from "../../types/Phase";

export default function finishQuestion({ game }: Context) {
  let answerOptions = game.answerOptions;

  console.log("finishQuestion", answerOptions);

  game.timeout && clearTimeout(game.timeout);

  Object.values(game.players).forEach((player) => {
    let answer = player.state.get().answer;
    if (answer) {
      let isCorrect = answerOptions[answer].correct;
      console.log("finishQuestion", player.id, answer, isCorrect);
      const newScore =
        player.state.get().score + (isCorrect ? game.state.get().score : 0);
      player.state.set({ isCorrect, score: newScore });
    }
  });
  game.state.set({
    phase: Phase.answer,
    answerCorrects: {
      a: game.answerOptions.a.correct ?? false,
      b: game.answerOptions.b.correct ?? false,
      c: game.answerOptions.c.correct ?? false,
      d: game.answerOptions.d.correct ?? false,
    },
  });
}
