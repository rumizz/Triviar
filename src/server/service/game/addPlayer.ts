import { Context } from "../../router/context";
import { Player } from "../../types/Player";
import findPlayer from "./findOrCreatePlayer";

export function addPlayer(
  { game, user }: Context,
  checkExisting = true
): Player {
  if (checkExisting) {
    let existing = findPlayer(game, user.id);
    if (existing) {
      return existing;
    }
  }
  let newPlayer: Player = new Player(user.id);
  game.players.push(newPlayer);

  console.log("added", newPlayer);

  game.state.set((prev) => ({
    players: [...prev.players, newPlayer.publicData()],
  }));

  return newPlayer;
}
