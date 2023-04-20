import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { runningGames } from "../service/Game";
import { CreateWSSContextFnOptions } from "@trpc/server/adapters/ws";

const defaultContext = {
  user: { id: "" },
  game: runningGames[0], // mock
};

export function createContext({ req, res }: CreateNextContextOptions) {
  if (!req.headers["www-authenticate"]) {
    return defaultContext;
  }
  return {
    user: { id: req.headers["www-authenticate"]!! },
    game: runningGames[0], // mock
  };
}

export function createWssContext({ req, res }: CreateWSSContextFnOptions) {
  console.log("wss headers", req.headers);

  return defaultContext;
}
export type Context = inferAsyncReturnType<typeof createContext>;

export const client = initTRPC.context<Context>().create();
