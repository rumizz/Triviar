import { GameStateContext } from "../util/GameStateContext";
import { useContext } from "react";
import AnswerButton from "../component/AnswerButton";

export default function QuestionPage() {
  const { question, answerOptions } = useContext(GameStateContext);

  return (
    <div className="absolute inset-0 flex flex-col bg-c">
      <div className="flex-1 flex items-center justify-center">
        <div className="flag bg-white px-16 py-8 font-bold text-4xl shadow">{question}</div>
      </div>
      <div className="flex-1 bg-gray-800 grid grid-cols-2 grid-rows-2 gap-6 p-6">
        {Object.entries(answerOptions).map(([key, { text }]) => (
          <AnswerButton key={key} id={key} value={text} onClick={() => { }} />
        ))}
      </div>
    </div >
  );
}
