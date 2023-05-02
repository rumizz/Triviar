import { AnswerOption } from "../types/AnswerOption";
import { Game } from "../types/Game";
import { Question } from "../types/Question";
import { Quiz } from "../types/Quiz";

const mockAnswerOption: AnswerOption = {
  text: "Lorem ipsum dolor sit amet",
  correct: false,
};

const mockQuestion: Question = {
  title: "Lorem ipsum dolor sit amet",
  time: 100000,
  options: [
    { ...mockAnswerOption, correct: true },
    mockAnswerOption,
    mockAnswerOption,
    mockAnswerOption,
  ],
  score: 1000,
};

export const mockQuiz: Quiz = {
  id: "1",
  title: "lorem",
  questions: [mockQuestion, mockQuestion, mockQuestion, mockQuestion],
};

export let quizzes: Quiz[] = [mockQuiz];
export let runningGames: Game[] = [];

export let connections: { [id: string]: Game } = {};
