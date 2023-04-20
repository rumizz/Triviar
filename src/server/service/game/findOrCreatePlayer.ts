import { Game } from "../../types/Game";
import { addPlayer } from "./addPlayer";

export default function findOrCreatePlayer(game: Game, id: string) {
  let res = game.players.find((player) => player.id === id);
  if (!res) {
    res = addPlayer({ game, user: { id } }, false);
  }
  return res;
}
