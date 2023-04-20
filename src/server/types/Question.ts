import { AnswerOption } from "./AnswerOption";

export type Question = {
  title: string;
  options: AnswerOption[];
  time: number;
  score: number;
};
