import { AnswerOption } from "../types/AnswerOption";
import { Game, GameState } from "../types/Game";
import { Observable } from "../types/Observable";
import { Phase } from "../types/Phase";
import { Question } from "../types/Question";
import { Quiz } from "../types/Quiz";

const mockAnswerOption: AnswerOption = {
  text: "Lorem ipsum dolor sit amet",
  correct: true,
};

const mockQuestion: Question = {
  title: "Lorem ipsum dolor sit amet",
  time: 10000,
  options: [
    mockAnswerOption,
    mockAnswerOption,
    mockAnswerOption,
    mockAnswerOption,
  ],
  score: 1000,
};
const mockQuiz: Quiz = {
  title: "lorem",
  questions: [mockQuestion, mockQuestion, mockQuestion, mockQuestion],
};

const mockGame: Game = {
  id: "0",
  joinCode: 1234,
  questionIndex: 0,
  state: new Observable<GameState>({
    answeredCount: 4,
    phase: Phase.lobby,
    expiryTimestamp: 0,
    answerTexts: {
      a: "Lorem ipsum dolor sit amet",
      b: "Lorem ipsum dolor sit amet",
      c: "Lorem ipsum dolor sit amet",
      d: "Lorem ipsum dolor sit amet",
    },
    answerCorrects: {
      a: true,
      b: false,
      c: false,
      d: false,
    },
    question: "Lorem ipsum dolor sit amet",
    players: [],
    score: 1000,
  }),
  quiz: mockQuiz,
  players: [],
  answerOptions: {
    a: {
      text: "Lorem ipsum dolor sit amet",
      correct: true,
    },
    b: {
      text: "Lorem ipsum dolor sit amet",
    },
    c: {
      text: "Lorem ipsum dolor sit amet",
    },
    d: {
      text: "Lorem ipsum dolor sit amet",
    },
  },
};

export const runningGames: Game[] = [mockGame];

export const connections: { [id: string]: Game | undefined } = {};
