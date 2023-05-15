import { AnswerOption, AnswerSymbol } from "./AnswerOption";
import { Observable } from "./Observable";
import { Phase } from "./Phase";
import { Player, PublicPlayerData } from "./Player";
import { Quiz } from "./Quiz";
import { v4 as uuid } from "uuid";

export class Game {
  id: string;
  quiz: Quiz;
  state: Observable<GameState> = new Observable<GameState>({
    answeredCount: 0,
    phase: Phase.lobby,
    expiryTimestamp: 0,
    answerTexts: {
      a: "",
      b: "",
      c: "",
      d: "",
    },
    answerCorrects: {
      a: true,
      b: false,
      c: false,
      d: false,
    },
    question: "",
    players: [],
    score: 0,
    joinCode: 0,
    questionIndex: -1,
    totalQuestions: 0,
  });
  players: Player[] = [];
  answerOptions: { [id in AnswerSymbol]: AnswerOption } = {
    a: {
      text: "",
      correct: true,
    },
    b: {
      text: "",
    },
    c: {
      text: "",
    },
    d: {
      text: "",
    },
  };
  timeout?: NodeJS.Timeout;
  constructor(quiz: Quiz) {
    this.id = uuid();
    this.quiz = quiz;
    this.state.set({
      joinCode: Math.floor(Math.random() * 900000) + 100000,
      totalQuestions: quiz.questions.length,
    });
  }
}

export type GameState = {
  joinCode: number;
  phase: Phase;
  question: string;
  score: number;
  answerTexts: { [id in AnswerSymbol]: string };
  answerCorrects: { [id in AnswerSymbol]: boolean };
  answeredCount: number;
  expiryTimestamp: number;
  players: PublicPlayerData[];
  questionIndex: number;
  totalQuestions: number;
};
