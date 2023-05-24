import { FC, useContext } from "react";
import { PlayerStateContext } from "src/client/util/PlayerStateContext";

const PlayerFinalPage: FC = () => {
  const { rank } = useContext(PlayerStateContext);
  const postfix =
    rank === 0 ? "st" : rank === 1 ? "nd" : rank === 2 ? "rd" : "th";

  return (
    <div className="absolute inset-0 bg-d flex items-center justify-center">
      <div className="text-white font-bold drop-shadow-md flex flex-col items-center">
        <div className="text-2xl">You finished in</div>
        <div className="text-6xl mr-2">
          {rank + 1}
          {postfix}
        </div>
        <div className="text-xl mt-8">Thank you for playing!</div>
      </div>
    </div>
  );
};

export default PlayerFinalPage;
