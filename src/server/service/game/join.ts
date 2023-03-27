import { Context } from "../../router/context";
import { connections, runningGames } from "../Game";
import { addPlayer } from "./addPlayer";

export function join({ user }: Context, joinCode: number): boolean {
  let game = runningGames.filter((game) => game.joinCode === joinCode)[0];
  if (!game) {
    return false;
  }
  connections[user.id] = game;
  addPlayer({ game, user });
  return true;
}
