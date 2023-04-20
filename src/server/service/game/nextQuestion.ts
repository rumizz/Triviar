import { Context } from "../../router/context";
import { Phase } from "../../types/Phase";
import finishQuestion from "./finishQuestion";

export function nextQuestion({ game, user }: Context) {
  const question = game.quiz.questions[game.questionIndex];
  game.questionIndex++;
  game.players.forEach((player) => {
    player.state.set({ answer: undefined });
  });
  game.answerOptions = {
    a: question.options[0],
    b: question.options[1],
    c: question.options[2],
    d: question.options[3],
  };
  let expiryTimestamp = Date.now() + 10000;
  game.timeout = setTimeout(
    () => finishQuestion({ game, user }),
    question.time + 1000
  );

  game.state.set({
    phase: Phase.question,
    question: question.title,
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