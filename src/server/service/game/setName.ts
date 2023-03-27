import { Context } from "../../router/context";
import { addPlayer } from "./addPlayer";

export function setName({ game, user }: Context, name: string) {
  if (!game.players[user.id]) {
    addPlayer({ game, user });
  }
  game.players[user.id].state.set({ name });
  game.state.set((prev) => ({
    players: {
      ...prev.players,
      [user.id]: {
        ...prev.players[user.id],
        name,
      },
    },
  }));
}
