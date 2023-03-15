import { initTRPC } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import { z } from "zod";
import { GameState } from "../types/GameState";

const client = initTRPC.create();

let stateObservers: { next: (state: GameState) => void }[] = [];

export const gameRouter = client.router({
  ping: client.procedure.query(() => {}),
  state: client.procedure.subscription(() => {
    return observable<GameState>((observer) => {
      stateObservers.push(observer);
      return () => {
        stateObservers.splice(
          stateObservers.findIndex((o) => o == observer),
          1
        );
      };
    });
  }),
  set: client.procedure
    .input(z.string())
    .query(({ input }: { input: GameState }) =>
      stateObservers.forEach((observer) => observer.next(input))
    ),
});
