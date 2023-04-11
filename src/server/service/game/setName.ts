import { Context } from "../../router/context";
import { addPlayer } from "./addPlayer";
import findPlayer from "./findPlayer";

export function setName({ game, user }: Context, name: string) {
  if (!findPlayer(game, user.id)) {
    addPlayer({ game, user });
  }
  const player = findPlayer(game, user.id);
  player.state.set({ name });
  game.state.set((prev) => ({
    players: [...prev.players, player.publicData()],
  }));
}
