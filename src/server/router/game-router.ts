import { z } from "zod";
import { client, Context } from "./context";
import { observable } from "@trpc/server/observable";
import { GameState } from "../types/Game";
import { PlayerState } from "../types/Player";
import { answer } from "../service/game/answer";
import { leave } from "../service/game/leave";
import { setName } from "../service/game/setName";
import { nextQuestion } from "../service/game/nextQuestion";
import scores from "../service/game/scores";
import findPlayer from "../service/game/findOrCreatePlayer";
import finishQuestion from "../service/game/finishQuestion";
import { connections } from "../service/Game";
import { TRPCError } from "@trpc/server";
import { getUserIdFromToken } from "../service/auth/token";
import { GAME_NOT_FOUND } from "../types/ErrorCodes";

function createQuery<T>(method: (ctx: Context, input: T) => void) {
  return ({ input, ctx }: { input: T; ctx: Context }) => {
    if (!ctx.game) {
      return {
        error: GAME_NOT_FOUND,
      };
    } else {
      method(ctx, input);
    }
  };
}

function createSubscription(method: (ctx: Context, input: string) => void) {
  return async ({ input, ctx }: { input: string; ctx: Context }) => {
    console.log("subscription open", input);
    const token = input;
    const userId = await getUserIdFromToken(token);
    const game = connections[userId];
    if (!game) {
      return new TRPCError({
        code: "NOT_FOUND",
        message: "Game not found",
      });
    }
    ctx = {
      ...ctx,
      user: { id: userId },
      game,
    };
    return method(ctx, input);
  };
}

export const gameRouter = client.router({
  leave: client.procedure.query(createQuery(leave)),

  nextQuestion: client.procedure.query(createQuery(nextQuestion)),
  finishQuestion: client.procedure.query(createQuery(finishQuestion)),
  endQuestion: client.procedure.query(createQuery(scores)),

  setName: client.procedure
    .input(z.string())
    .query(createQuery<string>(setName)),

  answer: client.procedure.input(z.string()).query(createQuery<string>(answer)),

  state: client.procedure.input(z.string()).subscription(
    createSubscription(({ game }: Context) => {
      return observable<GameState>(game.state.toTRPC());
    })
  ),

  playerState: client.procedure.input(z.string()).subscription(
    createSubscription(({ game, user }: Context) => {
      const player = findPlayer(game, user.id);
      return observable<PlayerState>(player.state.toTRPC());
    })
  ),
});
