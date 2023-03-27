import { Context } from "../../router/context";
import { Observable } from "../../types/Observable";
import { Player, PlayerState } from "../../types/Player";

export function addPlayer({ game, user }: Context) {
  let newPlayer: Player = {
    state: new Observable<PlayerState>({
      name: "",
      score: 0,
      answer: undefined,
      isCorrect: undefined,
    }),
  };

  game.players[user.id] = newPlayer;

  game.state.set((prev) => ({
    players: {
      ...prev.players,
      [user.id]: {
        ...prev.players[user.id],
        name: "",
        score: 0,
      },
    },
  }));
}
