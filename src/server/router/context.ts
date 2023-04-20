import { initTRPC } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { User } from "../types/User";
import { Game } from "../types/Game";
import { connections } from "../service/Game";

export function createContext({ req, res }: CreateNextContextOptions): Context {
  if (!req.headers["www-authenticate"]) {
    res.statusCode = 401;
    return {} as Context;
  }
  const userId: string = req.headers["www-authenticate"];
  return {
    user: { id: userId },
    game: connections[userId],
  };
}

export type Context = {
  user: User;
  game: Game;
};

export const client = initTRPC.context<Context>().create();
