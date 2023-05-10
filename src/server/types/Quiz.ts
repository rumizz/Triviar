import { Question } from "./Question";

export class Quiz {
  id: string;
  ownerId?: string;
  title: string;
  defaultTime: number;
  defaultScore: number;
  questions: Question[];
  constructor(defaultQuiz?: Quiz) {
    this.id = "";
    this.title = "";
    this.defaultTime = 30;
    this.defaultScore = 1000;
    this.questions = [];

    Object.assign(this, defaultQuiz);
  }
}
