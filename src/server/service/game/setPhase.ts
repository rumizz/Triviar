import { Context } from "../../router/context";
import { GameState } from "../../types/Game";
import { Phase } from "../../types/Phase";

export function setPhase({ game, user }: Context, phase: Phase) {
  if (game.state.get().phase === phase) return;
  if (game.timeout) clearTimeout(game.timeout);

  let params: Partial<GameState> = {};
  switch (phase) {
    case Phase.lobby:
      params = {
        players: {},
      };
      break;
    case Phase.question:
      Object.values(game.players).forEach((player) => {
        player.state.set({ answer: undefined });
      });
      game.answerOptions = {
        a: {
          text: "Igen",
          correct: true,
        },
        b: {
          text: "Igen",
          correct: false,
        },
        c: {
          text: "Igen",
          correct: false,
        },
        d: {
          text: "Igen",
          correct: false,
        },
      };
      let expiryTimestamp = Date.now() + 10000;
      game.timeout = setTimeout(
        () => setPhase({ game, user }, Phase.answer),
        11000
      );
      params = {
        question: "Lorem ipsum dolor sit amet",
        answeredCount: 0,
        expiryTimestamp,
        answerTexts: {
          a: "Igen",
          b: "Igen",
          c: "Igen",
          d: "Igen",
        },
      };
      break;
    case Phase.answer:
      params = {
        answerCorrects: {
          a: true,
          b: false,
          c: false,
          d: false,
        },
      };
      break;
  }

  game.state.set({
    phase,
    ...params,
  });
}
