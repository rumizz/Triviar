import { FC, useContext } from "react";
import { GameStateContext } from "src/client/util/GameStateContext";
import { Phase } from "src/server/types/Phase";

const Footer: FC<{}> = () => {
  const { joinCode, phase, questionIndex, totalQuestions } =
    useContext(GameStateContext);

  return (
    <div className="font-bold absolute bottom-0 inset-x-0 bg-gray-800 flex items-center p-4 gap-4">
      {(phase === Phase.question ||
        phase === Phase.answer ||
        phase === Phase.scores) && (
        <div className="bg-white px-4 py-1 rounded-md">
          {questionIndex} / {totalQuestions}
        </div>
      )}
      <div className="grow" />
      <div className="text-white">Code:</div>
      <div className="bg-white px-4 py-1 rounded-md">{joinCode}</div>
    </div>
  );
};

export default Footer;
