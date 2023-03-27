import { AnswerSymbol } from "./AnswerOption";
import { Observable } from "./Observable";

export type Player = {
  state: Observable<PlayerState>;
};

export type PlayerState = {
  name: string;
  score: number;
  answer?: AnswerSymbol;
  isCorrect?: boolean;
};
