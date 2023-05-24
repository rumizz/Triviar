import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Button from "src/client/component/Button";
import Loading from "src/client/component/Loading";
import { proxyClient } from "src/client/util/proxyClient";
import { Quiz } from "src/server/types/Quiz";
import QuizCard from "./QuizCard";
import UserMenu from "src/client/component/UserMenu";
import GameCard from "./GameCard";
import { GameProgress } from "src/server/types/GameProgress";

export default function MasterIndex() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [games, setGames] = useState<GameProgress[]>([]);

  const reload = () => {
    async function reload() {
      const quizzes = await proxyClient.quiz.getAll.query();
      setQuizzes(quizzes);
      const games = await proxyClient.getOwnGames.query();
      setGames(games);
    }
    reload().then(() => setIsLoading(false));
  };

  useEffect(reload, []);

  const startGame = (quizId: string) => {
    proxyClient.createGame.query(quizId).then((id) => {
      navigate(`/master/${id}`);
      return id;
    });
  };

  const deleteQuiz = (quizId: string) => {
    if (window.confirm("Are you sure you want to delete this quiz?"))
      proxyClient.quiz.delete.query(quizId).then(reload);
  };

  const deleteGame = (gameId: string) => {
    if (window.confirm("Are you sure you want to delete this game?"))
      proxyClient.deleteGame.query(gameId).then(reload);
  };

  if (isLoading) return <Loading className="bg-b text-white" />;

  return (
    <main className="absolute inset-0 flex p-8 flex-col items-stretch gap-6 bg-b overflow-y-auto">
      <div className="absolute right-8 top-7 z-20">
        <UserMenu />
      </div>
      <div className="text-white font-bold text-3xl drop-shadow-md sm:text-center">
        Dashboard
      </div>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex-1 flex flex-col gap-4">
          <div className="relative">
            <h1 className="text-white font-bold text-3xl drop-shadow-md text-left w-full">
              Games
            </h1>
          </div>
          {games.map((game) => (
            <GameCard key={game.id} game={game} onDelete={deleteGame} />
          ))}
          {games.length === 0 && (
            <p className="text-white opacity-70">
              No running games (create one from a quiz)
            </p>
          )}
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <div className="relative">
            <h1 className="text-white font-bold text-3xl text-left drop-shadow-md w-full">
              Quizzes
            </h1>
            <Link to="/master/new">
              <Button className="absolute right-0 inset-y-0 bg-d ">
                <FaPlus />
                New Quiz
              </Button>
            </Link>
          </div>
          {quizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              onStart={() => startGame(quiz.id)}
              onDelete={() => deleteQuiz(quiz.id)}
              quiz={quiz}
            />
          ))}

          {quizzes.length === 0 && (
            <p className="text-white opacity-70">No quizzes</p>
          )}
        </div>
      </div>
    </main>
  );
}
