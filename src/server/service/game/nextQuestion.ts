import { Context } from "../../router/context";
import { Phase } from "../../types/Phase";
import finishQuestion from "./finishQuestion";

export function nextQuestion({ game, user }: Context) {
  console.log("nextQuestion");
  if (game.state.get().questionIndex + 1 >= game.quiz.questions.length) {
    console.log("No more questions");
    return;
  }

  const nextQuestionIndex = game.state.get().questionIndex + 1;
  const question = game.quiz.questions[nextQuestionIndex];

  game.players.forEach((player) => {
    player.state.set({ answer: undefined });
  });
  console.log(
    "next question",
    nextQuestionIndex,
    "/",
    game.quiz.questions.length,
    question
  );
  game.answerOptions = {
    a: question.options[0],
    b: question.options[1],
    c: question.options[2],
    d: question.options[3],
  };
  let expiryTimestamp = Date.now() + question.time * 1000;

  game.timeout = setTimeout(
    () => finishQuestion({ game, user }),
    question.time * 1000 + 1000
  );

  game.state.set({
    questionIndex: nextQuestionIndex,
    phase: Phase.question,
    question: question.title,
    score: question.score,
    answeredCount: 0,
    expiryTimestamp,
    duration: question.time * 1000,
    answerTexts: {
      a: question.options[0].text,
      b: question.options[1].text,
      c: question.options[2].text,
      d: question.options[3].text,
    },
  });
}
