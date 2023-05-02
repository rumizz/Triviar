import clsx from "clsx";
import { useContext } from "react";
import { PlayerStateContext } from "src/client/util/PlayerStateContext";

export default function ResultPage() {
  const { isCorrect } = useContext(PlayerStateContext);
  return (
    <div
      className={clsx("absolute inset-0 flex justify-center items-center", {
        "bg-d": isCorrect,
        "bg-a": !isCorrect,
      })}
    >
      {isCorrect ? (
        <div className="text-4xl text-center text-white font-bold drop-shadow-md">
          Correct!
        </div>
      ) : (
        <div className="text-4xl text-center text-white font-bold drop-shadow-md">
          Incorrect!
        </div>
      )}
    </div>
  );
}
