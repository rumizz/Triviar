import { initTRPC } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { connections } from "../service/Game";
import {
  createAnonymousToken,
  getUserIdFromToken,
} from "../service/auth/token";
import { Game } from "../types/Game";
import { User } from "../types/User";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { CreateWSSContextFnOptions } from "@trpc/server/adapters/ws";

export async function createContext({
  req,
  res,
}: CreateExpressContextOptions): Promise<Context> {
  let token = req.headers["www-authenticate"];
  if (!token) {
    console.log("creating anonymous token");
    token = createAnonymousToken();
    res.header("www-authenticate", token);
  }
  let userId = await getUserIdFromToken(token);
  if (!userId) {
    userId = "";
  }
  console.log("context userId", userId);
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

export async function createWSSContext({
  req,
  res,
}: CreateWSSContextFnOptions): Promise<Context> {
  return {
    user: { id: "" },
    game: {} as Game,
  };
}
