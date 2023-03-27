import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import { CreateWSSContextFnOptions } from "@trpc/server/adapters/ws";
import { runningGames } from "../service/Game";
export function createContext({
  req,
  res,
}: CreateHTTPContextOptions | CreateWSSContextFnOptions) {
  return {
    user: { id: req.socket.remoteAddress || "" },
    game: runningGames[0], // mock
  };
}
export type Context = inferAsyncReturnType<typeof createContext>;

export const client = initTRPC.context<Context>().create();
