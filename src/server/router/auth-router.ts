import { z } from "zod";
import { checkPassword, hashPassword } from "../service/auth/hash";
import { createAnonymousToken, createToken } from "../service/auth/token";
import { db } from "../service/db/db";
import { client } from "./context";
import { v4 as uuid } from "uuid";

export const authRouter = client.router({
  register: client.procedure
    .input(
      z.object({
        username: z.string().min(3).max(20),
        password: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { username, password } = input;
      const user = await db.UserModel.findOne({ name: username });
      if (user) {
        throw new Error("username: User already exists");
      }
      const passwordHash = await hashPassword(password);
      const newUser = await db.UserModel.create({
        id: uuid(),
        name: username,
        passwordHash,
      });
      console.log("user created", newUser);
      return {
        userid: newUser.id,
        token: createToken(newUser.id),
        username: newUser.name,
      };
    }),

  login: client.procedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { username, password } = input;
      console.log("login", username, password);
      const user = await db.UserModel.findOne({ name: username });
      if (!user) {
        throw new Error("password: Incorrect username or password");
      }
      const ok = await checkPassword(password, user.passwordHash ?? "");
      if (!ok) {
        throw new Error("password: Incorrect username or password");
      }
      const token = createToken(user.id);
      return { id: user.id, token, username: user.name };
    }),

  loginAnonymously: client.procedure.query(async () => {
    return createAnonymousToken();
  }),
});

export type PublicRouter = typeof authRouter;
