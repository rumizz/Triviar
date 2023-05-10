import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Button from "src/client/component/Button";
import Loading from "src/client/component/Loading";
import { proxyClient } from "src/client/util/proxyClient";
import { Quiz } from "src/server/types/Quiz";
import QuizCard from "./QuizCard";

export default function MasterIndex() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  //const [games, setGames] = useState<Game[]>([]);

  const reload = () => {
    proxyClient.quiz.getAll.query().then((quizzes) => {
      setQuizzes(quizzes);
      setIsLoading(false);
    });
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

  if (isLoading) return <Loading />;

  return (
    <main className="absolute inset-0 flex p-8 flex-col items-stretch gap-4 bg-b overflow-y-auto">
      <h1 className="text-white font-bold text-3xl text-left w-full">Games</h1>
      <p className="text-white opacity-70">No running games</p>
      <div className="relative">
        <h1 className="text-white font-bold text-3xl text-left w-full">
          Quizzes
        </h1>
        <Link to="/new">
          <Button className="absolute right-0 inset-y-0 bg-c ">
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
    </main>
  );
}
