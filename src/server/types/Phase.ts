export const Phase = {
  lobby: "lobby",
  question: "question",
  answer: "answer",
  scores: "scores",
  podium: "podium",
};

export type Phase = (typeof Phase)[keyof typeof Phase];
