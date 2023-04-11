import { Context } from "../../router/context";
import { Phase } from "../../types/Phase";

export default function scores({ game }: Context) {
  game.state.set({
    phase: Phase.scores,
    players: game.players.map((player) => ({
      name: player.state.get().name,
      score: player.state.get().score,
    })),
  });
}
