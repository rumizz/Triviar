import { FC } from "react";
import { FaPlay, FaTrophy } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Button from "src/client/component/Button";
import { GameProgress } from "src/server/types/GameProgress";

const GameCard: FC<{ game: GameProgress }> = ({ game }) => {
  const isEnded = game.questionIndex + 1 === game.totalQuestions;
  let createdAtText;
  // create a text thats something like "2 days ago"
  if (game.createdAt) {
    const createdAt = new Date(game.createdAt);
    const now = new Date();
    const diff = now.getTime() - createdAt.getTime();
    const diffDays = Math.floor(diff / (1000 * 3600 * 24));
    const diffHours = Math.floor(diff / (1000 * 3600));
    const diffMinutes = Math.floor(diff / (1000 * 60));
    const diffSeconds = Math.floor(diff / 1000);
    if (diffDays > 0) {
      createdAtText = `${diffDays} day${diffDays > 1 ? "s" : ""}`;
    } else if (diffHours > 0) {
      createdAtText = `${diffHours} hour${diffHours > 1 ? "s" : ""}`;
    } else if (diffMinutes > 0) {
      createdAtText = `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""}`;
    } else {
      createdAtText = `${diffSeconds} second${diffSeconds > 1 ? "s" : ""}`;
    }
  }
  return (
    <div className="bg-white p-4 shadow-md flex flex-col rounded-md">
      <div className="flex flex-col grow items-start">
        <h1 className="text-xl font-bold">{game.title || <i>Untitled</i>}</h1>
        <div>
          {isEnded ? (
            "Ended "
          ) : (
            <span>
              {game.questionIndex + 1} / {game.totalQuestions} questions
            </span>
          )}
          {" • "}
          {game.playerCount} players
          {" • "}
          created {createdAtText} ago
        </div>
      </div>
      <div className="mt-4 flex flex-row items-end gap-2 flex-wrap">
        <Button className="bg-red-500 rounded-md text-white font-bold">
          <MdDelete />
          Delete
        </Button>
        <div className="grow"></div>

        <Link to={`/master/${game.id}`}>
          <Button className="bg-d rounded-md text-white font-bold">
            {isEnded ? (
              <>
                <FaTrophy />
                See results
              </>
            ) : (
              <>
                <FaPlay />
                Continue
              </>
            )}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default GameCard;
