import { AnswerOption } from "./AnswerOption";

export class Question {
  title: string;
  time: number;
  score: number;
  usingDefaults: DefaultQuestionOptions;
  options: AnswerOption[];
  constructor(defaultQuestion: Question) {
    this.title = "";
    this.options = [
      new AnswerOption(),
      new AnswerOption(),
      new AnswerOption(),
      new AnswerOption(),
    ];
    this.time = 0;
    this.score = 0;
    this.usingDefaults = { time: true, score: true };

    Object.assign(this, defaultQuestion);
  }
}

export type DefaultQuestionOptions = {
  time: boolean;
  score: boolean;
};
