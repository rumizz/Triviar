import { z } from "zod";
import { client } from "./context";
import { gameRouter } from "./game-router";
import createGame from "../service/game/create";
import { join } from "../service/game/join";
import { quizRouter } from "./quiz-router";
import { db } from "../service/db/db";
import { Quiz } from "../types/Quiz";

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
  game: gameRouter,

  quiz: quizRouter,
});

export type AppRouter = typeof router;
