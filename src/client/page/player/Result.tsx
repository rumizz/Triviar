import { useContext } from "react";
import { PlayerStateContext } from "src/client/util/PlayerStateContext";

export default function ResultPage() {
  const { isCorrect } = useContext(PlayerStateContext);
  return (
    <div className="absolute inset-0 bg-c flex justify-center items-center">
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
