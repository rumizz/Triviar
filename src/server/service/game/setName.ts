import { Context } from "../../router/context";
import findPlayer from "./findOrCreatePlayer";

export function setName({ game, user }: Context, name: string) {
  const player = findPlayer(game, user.id);
  player.state.set({ name });
  game.state.set((prev) => {
    return {
      players: [
        ...prev.players.filter((p) => p.id !== player.id),
        { ...player.publicData(), name },
      ],
    };
  });
}
