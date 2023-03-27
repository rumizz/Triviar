import { z } from "zod";
import { client, Context } from "./context";
import { observable } from "@trpc/server/observable";
import { GameState } from "../types/Game";
import { Phase } from "../types/Phase";
import { PlayerState } from "../types/Player";
import { answer } from "../service/game/answer";
import { leave } from "../service/game/leave";
import { join } from "../service/game/join";
import { setName } from "../service/game/setName";
import { setPhase } from "../service/game/setPhase";
import { addPlayer } from "../service/game/addPlayer";

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

  answer: client.procedure.input(z.string()).query(createQuery<string>(answer)),

  state: client.procedure.subscription(({ ctx }: { ctx: Context }) => {
    return observable<GameState>(ctx.game.state.toTRPC());
  }),

  playerState: client.procedure.subscription(({ ctx }: { ctx: Context }) => {
    if (!ctx.game.players[ctx.user.id]) {
      addPlayer(ctx);
    }
    return observable<PlayerState>(
      ctx.game.players[ctx.user.id].state.toTRPC()
    );
  }),

  setPhase: client.procedure
    .input(z.enum(["", ...Object.keys(Phase)]))
    .query(createQuery<Phase>(setPhase)),
});
