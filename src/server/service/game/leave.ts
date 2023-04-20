import { Context } from "../../router/context";
import { connections } from "../Game";

export function leave({ game, user }: Context) {
  game.players = game.players.filter((p) => p.id !== user.id);
  game.state.set((prev) => ({
    players: prev.players.filter((p) => p.id !== user.id),
  }));
  delete connections[user.id];
}
