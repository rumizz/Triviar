import { AnswerOption } from "./AnswerOption";
import { Observable } from "./Observable";
import { Phase } from "./Phase";
import { Quiz } from "./Quiz";

export type Game = {
  id: string;
  quiz: Quiz;
  state: Observable<GameState>;
  joinCode: number;
};

export type GameState = {
  phase: Phase;
  question: string;
  answerOptions: {
    a: AnswerOption;
    b: AnswerOption;
    c: AnswerOption;
    d: AnswerOption;
  };
  answeredCount: number;
  players: {
    [id: string]: {
      name: string;
    };
  };
};
