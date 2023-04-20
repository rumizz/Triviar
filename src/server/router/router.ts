import { z } from "zod";
import { client } from "./context";
import { gameRouter } from "./game-router";
import createGame from "../service/game/create";
import { join } from "../service/game/join";

export const router = client.router({
  createGame: client.procedure.input(z.string()).query(({ input, ctx }) => {
    return createGame(ctx, input);
  }),

  join: client.procedure.input(z.number()).query(({ input, ctx }) => {
    return join(ctx, input);
  }),
  game: gameRouter,
});

export type AppRouter = typeof router;
