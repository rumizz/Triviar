import { FC } from "react";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "src/client/component/Button";
import { GameProgress } from "src/server/types/GameProgress";

const GameCard: FC<{ game: GameProgress }> = ({ game }) => {
  return (
    <div className="bg-white p-4 shadow-md flex flex-col rounded-md">
      <div className="flex flex-col grow items-start">
        <h1 className="text-xl font-bold">{game.title || <i>Untitled</i>}</h1>
        <div>
          {game.questionIndex + 1} / {game.totalQuestions} questions •{" "}
          {game.playerCount} players
        </div>
      </div>
      <div className="mt-4 flex flex-row items-end gap-2 flex-wrap">
        <div className="grow"></div>

        <Link to={`/master/${game.id}`}>
          <Button className="bg-d rounded-md text-white font-bold">
            <FaPlay />
            Continue
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default GameCard;
