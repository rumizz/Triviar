import { Context } from "../../router/context";
import { Player } from "../../types/Player";
import findPlayer from "./findPlayer";

export function addPlayer({ game, user }: Context) {
  if (findPlayer(game, user.id)) {
    return;
  }

  let newPlayer: Player = new Player(user.id);
  game.players.push(newPlayer);

  game.state.set((prev) => ({
    players: [...prev.players, newPlayer.publicData()],
  }));
}
