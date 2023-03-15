export const GameState = {
  lobby: "lobby",
  question: "question",
  answer: "answer",
  scores: "scores",
  podium: "podium",
};

export type GameState = (typeof GameState)[keyof typeof GameState];
