export const Phase = {
  lobby: "lobby",
  question: "question",
  answer: "answer",
  scores: "scores",
  end: "end",
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Phase = (typeof Phase)[keyof typeof Phase];
/*

export enum Phase {
  lobby = "lobby",
  question = "question",
  answer = "answer",
  scores = "scores",
  end = "end",
}*/
