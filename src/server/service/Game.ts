import { Game, GameState } from "../types/Game";
import { Observable } from "../types/Observable";
import { Phase } from "../types/Phase";

export const runningGames: Game[] = [
  // mock
  {
    id: "1",
    joinCode: 1234,
    state: new Observable<GameState>({
      answeredCount: 4,
      phase: Phase.lobby,
      expiryTimestamp: 0,
      answerTexts: {
        a: "Igen",
        b: "Igen",
        c: "Igen",
        d: "Igen",
      },
      answerCorrects: {
        a: true,
        b: false,
        c: false,
        d: false,
      },
      question: "Lorem ipsum dolor sit amet",
      players: {},
    }),
    quiz: {
      title: "lorem",
      questions: [],
    },
    players: {},
    answerOptions: {
      a: {
        text: "a",
        correct: true,
      },
      b: {
        text: "b",
      },
      c: {
        text: "c",
      },
      d: {
        text: "d",
      },
    },
  },
];

export const connections: { [id: string]: Game | undefined } = {};
