import { AnswerOption, AnswerSymbol } from "./AnswerOption";
import { Observable } from "./Observable";
import { Phase } from "./Phase";
import { Player, PublicPlayerData } from "./Player";
import { Quiz } from "./Quiz";

export type Game = {
  id: string;
  quiz: Quiz;
  questionIndex: number;
  state: Observable<GameState>;
  joinCode: number;
  players: Player[];
  answerOptions: { [id in AnswerSymbol]: AnswerOption };
  timeout?: NodeJS.Timeout;
};

export type GameState = {
  phase: Phase;
  question: string;
  score: number;
  answerTexts: { [id in AnswerSymbol]: string };
  answerCorrects: { [id in AnswerSymbol]: boolean };
  answeredCount: number;
  expiryTimestamp: number;
  players: PublicPlayerData[];
};
