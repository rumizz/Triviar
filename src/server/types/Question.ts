import { AnswerOption } from "./AnswerOption";
import { IDictionary } from "./IDictionary";

export class Question {
  title: string;
  options: AnswerOption[];
  time: number;
  score: number;
  usingDefaults: IDictionary<boolean>;
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
