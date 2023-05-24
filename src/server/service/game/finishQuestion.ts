import { Context } from "../../router/context";
import { Phase } from "../../types/Phase";

export default function finishQuestion({ game }: Context) {
  let answerOptions = game.answerOptions;

  console.log("finishQuestion", answerOptions);

  game.timeout && clearTimeout(game.timeout);

  let scores: { score: number; id: string }[] = [];

  Object.values(game.players).forEach((player) => {
    let answer = player.state.get().answer;
    let newScore = player.state.get().score;
    let isCorrect: boolean | undefined = false;
    if (answer) {
      isCorrect = answerOptions[answer].correct;
      console.log("finishQuestion", player.id, answer, isCorrect);

      const expiryTimestamp = game.state.get().expiryTimestamp;
      const playerTimestamp = player.state.get().time;
      const duration = game.state.get().duration;
      const score = game.state.get().score;
      const isLate = playerTimestamp > expiryTimestamp;

      newScore +=
        isCorrect && !isLate
          ? score / 2 +
            (score * ((expiryTimestamp - playerTimestamp) / duration)) / 2
          : 0;
    }

    newScore = parseInt(newScore.toFixed(0));
    scores.push({ score: newScore, id: player.id });
    player.state.set({ isCorrect, score: newScore });
  });

  scores = scores.sort((a, b) => b.score - a.score);

  Object.values(game.players).forEach((player) => {
    const rank = scores.findIndex(({ id }) => id === player.id);
    player.state.set({
      rank,
    });
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
