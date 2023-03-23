import { z } from "zod";
import { client, Context } from "./context";
import { answer, join, leave, setName, setPhase } from "../service/Game";
import { observable } from "@trpc/server/observable";
import { GameState } from "../types/Game";
import { TRPCError } from "@trpc/server";
import { Phase } from "../types/Phase";

function createQuery<T>(method: (ctx: Context, input: T) => void) {
  return ({ input, ctx }: { input: T; ctx: Context }) => {
    if (!ctx.game) {
      return {
        error: "Game not found",
      };
    } else {
      method(ctx, input);
    }
  };
}

export const gameRouter = client.router({
  join: client.procedure.input(z.number()).query(createQuery<number>(join)),
  leave: client.procedure.query(createQuery(leave)),

  setName: client.procedure
    .input(z.string())
    .query(createQuery<string>(setName)),

  answer: client.procedure
    .input(z.number().min(0).max(3))
    .query(createQuery<number>(answer)),

  state: client.procedure.subscription(({ ctx }: { ctx: Context }) => {
    if (!ctx.game) {
      return new TRPCError({ code: "NOT_FOUND" });
    }
    let game = ctx.game;
    return observable<GameState>(game.state.toTRPC());
  }),

  setPhase: client.procedure
    .input(z.enum(["", ...Object.keys(Phase)]))
    .query(createQuery<Phase>(setPhase)),
});
