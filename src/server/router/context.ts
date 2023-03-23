import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import { CreateWSSContextFnOptions } from "@trpc/server/adapters/ws";
import { runningGames } from "../service/Game";
export function createContext({
  req,
  res,
}: CreateHTTPContextOptions | CreateWSSContextFnOptions) {
  function getUserFromHeader() {
    if (req.headers.authorization) {
      return { id: req.headers.authorization };
    }
    return { id: "" };
  }
  const user = getUserFromHeader();
  const game = runningGames[0];
  return {
    user,
    game, // mock
  };
}
export type Context = inferAsyncReturnType<typeof createContext>;

export const client = initTRPC.context<Context>().create();
