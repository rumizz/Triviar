import { z } from "zod";
import { mockQuiz } from "../service/Game";
import { client } from "./context";
import { Quiz } from "../types/Quiz";
import { v4 as uuid } from "uuid";

export const quizRouter = client.router({
  create: client.procedure.input(z.instanceof(Quiz)).query(({ input, ctx }) => {
    const quiz = input;
    quiz.id = uuid();
    return true;
  }),
  update: client.procedure.input(z.instanceof(Quiz)).query(({ input, ctx }) => {
    const quiz = input;
    if (quiz.ownerId !== ctx.user.id) {
      return false;
    }
    return true;
  }),
  get: client.procedure.input(z.string()).query(({ input, ctx }) => {
    const quiz = mockQuiz;
    if (quiz.ownerId !== ctx.user.id) {
      throw new Error("Unauthorized");
    }
    return mockQuiz;
  }),
  delete: client.procedure.input(z.string()).query(({ input, ctx }) => {
    return true;
  }),
});
