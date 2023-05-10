import { Context } from "../../router/context";
import { Game } from "../../types/Game";
import { Quiz } from "../../types/Quiz";
import { connections, runningGames } from "../Game";

export default function createGame({ user }: Context, quiz: Quiz): string {
  const newGame = new Game(quiz);
  runningGames.push(newGame);
  connections[user.id] = newGame;
  console.log("running games count", runningGames.length);
  return newGame.id;
}
