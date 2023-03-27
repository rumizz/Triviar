import { Game } from "../../types/Game";
import { Phase } from "../../types/Phase";

export default function finishQuestion(game: Game) {
  let answerOptions = game.answerOptions;
  console.log("answerOptions", answerOptions);
  Object.values(game.players).forEach((player) => {
    let answer = player.state.get().answer;
    if (answer) {
      let isCorrect = answerOptions[answer].correct;
      console.log(player.state.get().name, isCorrect);
      player.state.set({ isCorrect });
    }
  });
  game.state.set({ phase: Phase.answer });
}
