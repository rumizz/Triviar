import { Context } from "../../router/context";
import { Game } from "../../types/Game";
import { connections, quizzes, runningGames } from "../Game";

export default function createGame({ user }: Context, quizId: string): string {
  console.log("Creating game from quiz", quizId);

  const quiz = quizzes.find((q) => q.id === quizId);
  if (!quiz) {
    throw new Error("Quiz not found");
  }
  const newGame = new Game(quiz);
  runningGames.push(newGame);
  connections[user.id] = newGame;
  console.log("running games count", runningGames.length);
  return newGame.id;
}
