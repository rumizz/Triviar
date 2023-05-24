import { z } from "zod";
import { client } from "./context";
import { gameRouter } from "./game-router";
import createGame from "../service/game/create";
import { join } from "../service/game/join";
import { quizRouter } from "./quiz-router";
import { db } from "../service/db/db";
import { Quiz } from "../types/Quiz";
import { authRouter } from "./auth-router";
import { runningGames } from "../service/Game";
import { GameProgress } from "../types/GameProgress";
import { GAME_NOT_FOUND } from "../types/ErrorCodes";

export const router = client.router({
  createGame: client.procedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const quizId = input;
      console.log("Creating game from quiz", quizId);
      const quiz = await db.QuizModel.findOne<Quiz>({
        id: quizId,
        ownerId: ctx.user.id,
      });
      if (!quiz) {
        throw new Error("Quiz not found");
      }
      return createGame(ctx, quiz);
    }),

  join: client.procedure.input(z.number()).query(({ input, ctx }) => {
    return join(ctx, input);
  }),

  getOwnGames: client.procedure.query(({ ctx }) => {
    const games: GameProgress[] = runningGames
      .filter((game) => game.quiz.ownerId === ctx.user.id)
      .filter((game) => !game.state.get().isDeleted)
      .map((game) => ({
        id: game.id,
        title: game.quiz.title,
        questionIndex: game.state.get().questionIndex,
        totalQuestions: game.state.get().totalQuestions,
        playerCount: game.players.length,
        createdAt: game.createdAt,
      }));
    return games;
  }),

  deleteGame: client.procedure.input(z.string()).query(({ input, ctx }) => {
    const game = runningGames.find((game) => game.id === input);
    if (!game || game.quiz.ownerId !== ctx.user.id) {
      throw new Error(GAME_NOT_FOUND);
    }
    game.state.set({
      isDeleted: true,
    });
    setTimeout(() => {
      const index = runningGames.findIndex((game) => game.id === input);
      if (index !== -1) {
        runningGames.splice(index, 1);
      }
    }, 1000 * 5);
  }),

  game: gameRouter,
  quiz: quizRouter,
  auth: authRouter,
});

export type AppRouter = typeof router;
