import { AnswerSymbol } from "./AnswerOption";
import { Observable } from "./Observable";

export class Player {
  id: string;
  state: Observable<PlayerState>;
  publicData(): PublicPlayerData {
    return {
      id: this.id,
      name: this.state.get().name,
      score: this.state.get().score,
    };
  }
  constructor(id: string) {
    this.id = id;
    this.state = new Observable<PlayerState>({
      name: "",
      score: 0,
      answer: undefined,
      isCorrect: undefined,
      time: 0,
    });
  }
}

export type PlayerState = {
  name: string;
  score: number;
  answer?: AnswerSymbol;
  isCorrect?: boolean;
  time: number;
};

export type PublicPlayerData = {
  id: string;
  name: string;
  score: number;
};
