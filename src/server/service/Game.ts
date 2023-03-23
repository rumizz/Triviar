import { Context } from "../router/context";
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
      answerOptions: {
        a: {
          text: "a",
          correct: true,
        },
        b: {
          text: "b",
          correct: false,
        },
        c: {
          text: "c",
          correct: false,
        },
        d: {
          text: "d",
          correct: false,
        },
      },
      question: "Lorem ipsum dolor sit amet",
      players: {},
    }),
    quiz: {
      title: "lorem",
      questions: [],
    },
  },
];

export const connections: { [id: string]: Game | undefined } = {};

export function join({ user }: Context, joinCode: number): boolean {
  let game = runningGames.filter((game) => game.joinCode === joinCode)[0];
  if (!game) {
    return false;
  }
  connections[user.id] = game;
  return true;
}

export function leave({ user }: Context) {
  connections[user.id] = undefined;
}
export function answer({ game, user }: Context, answer: number) {
  game.state.set((prev) => ({
    answeredCount: prev.answeredCount++,
  }));
}

export function setPhase({ game, user }: Context, phase: Phase) {
  game.state.set({ phase });
}

export function setName({ game, user }: Context, name: string) {
  game.state.set((prev) => ({
    players: {
      ...prev.players,
      [user.id]: {
        name,
      },
    },
  }));
}
