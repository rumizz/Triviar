import { client } from "./context";
import { gameRouter } from "./game-router";

export const router = client.router({
  game: gameRouter,
});

export type AppRouter = typeof router;
