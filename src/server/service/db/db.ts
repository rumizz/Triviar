import mongoose from "mongoose";
import { Quiz } from "../../types/Quiz";

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/triviar");
}
main();

const QuizModel = new mongoose.Schema<Quiz>({
  id: String,
  ownerId: String,
  title: String,
  defaultTime: Number,
  defaultScore: Number,
  questions: [
    {
      title: String,
      time: Number,
      score: Number,
      usingDefaults: { time: Boolean, score: Boolean },
      options: [
        {
          text: String,
          correct: Boolean,
          playerAmount: Number,
        },
      ],
    },
  ],
});

const UserModel = new mongoose.Schema({
  id: String,
  name: String,
  passwordHash: String,
});

export const db = {
  QuizModel: mongoose.model("Quiz", QuizModel),
  UserModel: mongoose.model("User", UserModel),
};
