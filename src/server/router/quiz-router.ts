import { z } from "zod";
import { client } from "./context";
import { Quiz } from "../types/Quiz";
import { v4 as uuid } from "uuid";
import { db } from "../service/db/db";

const quizSchema = z.object({
  id: z.string().optional(),
  ownerId: z.string().optional(),
  title: z.string(),
  defaultTime: z.number(),
  defaultScore: z.number(),
  questions: z.array(
    z.object({
      title: z.string(),
      time: z.number(),
      score: z.number(),
      usingDefaults: z.object({
        time: z.boolean(),
        score: z.boolean(),
      }),
      options: z.array(
        z.object({
          text: z.string(),
          correct: z.boolean().optional(),
          playerAmount: z.number().optional(),
        })
      ),
    })
  ),
});

export const quizRouter = client.router({
  getAll: client.procedure.query(({ input, ctx }) => {
    return db.QuizModel.find<Quiz>({ ownerId: ctx.user.id });
  }),

  create: client.procedure.input(quizSchema).query(({ input, ctx }) => {
    const quiz = input;
    quiz.id = uuid();
    quiz.ownerId = ctx.user.id;
    console.log("create", quiz);
    db.QuizModel.insertMany([quiz]);
    return quiz.id;
  }),

  update: client.procedure.input(quizSchema).query(({ input, ctx }) => {
    const quiz = input;
    quiz.ownerId = ctx.user.id;
    console.log("update", quiz);
    return db.QuizModel.updateOne({ id: quiz.id, ownerId: ctx.user.id }, quiz);
  }),

  get: client.procedure.input(z.string()).query(({ input, ctx }) => {
    const id = input;
    return db.QuizModel.findOne<Quiz>({ id: id, ownerId: ctx.user.id });
  }),

  delete: client.procedure.input(z.string()).query(({ input, ctx }) => {
    const id = input;
    return db.QuizModel.deleteOne({ id, ownerId: ctx.user.id }).then((res) => {
      console.log("delete", id);
      return res;
    });
  }),
});
