import { Game } from "../../types/Game";

export default function findPlayer(game: Game, id: string) {
  return game.players.filter((player) => player.id === id)[0];
}
