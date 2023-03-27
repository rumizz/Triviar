import { AnswerOption, AnswerSymbol } from "./AnswerOption";
import { Observable } from "./Observable";
import { Phase } from "./Phase";
import { Player } from "./Player";
import { Quiz } from "./Quiz";

export type Game = {
  id: string;
  quiz: Quiz;
  state: Observable<GameState>;
  joinCode: number;
  players: {
    [id: string]: Player;
  };
  answerOptions: { [id in AnswerSymbol]: AnswerOption };
  timeout?: NodeJS.Timeout;
};

export type GameState = {
  phase: Phase;
  question: string;
  answerTexts: { [id in AnswerSymbol]: string };
  answerCorrects: { [id in AnswerSymbol]: boolean };
  answeredCount: number;
  expiryTimestamp: number;
  players: {
    [id: string]: {
      name: string;
      score: number;
    };
  };
};
