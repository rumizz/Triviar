import { initTRPC } from "@trpc/server";
import { gameRouter } from "./game-router";

const client = initTRPC.create();

export const router = client.router({
  helloWorld: client.procedure.query(() => ({ quote: "Hello world!" })),
  game: gameRouter,
});

export type AppRouter = typeof router;
