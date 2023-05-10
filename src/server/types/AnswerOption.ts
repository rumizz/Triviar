export class AnswerOption {
  text: string;
  correct?: boolean;
  playerAmount?: number;
  constructor() {
    this.text = "";
    this.correct = false;
  }
}

export type AnswerSymbol = "a" | "b" | "c" | "d";
