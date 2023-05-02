import { Context } from "../../router/context";
import { Phase } from "../../types/Phase";
import finishQuestion from "./finishQuestion";

export function nextQuestion({ game, user }: Context) {
  if (game.state.get().questionIndex >= game.quiz.questions.length) {
    return;
  }
  game.state.set({ questionIndex: game.state.get().questionIndex + 1 });
  const question = game.quiz.questions[game.state.get().questionIndex];

  game.players.forEach((player) => {
    player.state.set({ answer: undefined });
  });
  game.answerOptions = {
    a: question.options[0],
    b: question.options[1],
    c: question.options[2],
    d: question.options[3],
  };
  let expiryTimestamp = Date.now() + question.time;
  game.timeout = setTimeout(
    () => finishQuestion({ game, user }),
    question.time + 1000
  );

  game.state.set({
    phase: Phase.question,
    question: question.title,
    score: question.score,
    answeredCount: 0,
    expiryTimestamp,
    answerTexts: {
      a: question.options[0].text,
      b: question.options[1].text,
      c: question.options[2].text,
      d: question.options[3].text,
    },
  });
}
