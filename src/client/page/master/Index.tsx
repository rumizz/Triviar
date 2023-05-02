import { Link, useNavigate } from "react-router-dom";
import { proxyClient } from "src/client/util/proxyClient";
import QuizCard from "./QuizCard";
import { mockQuiz } from "src/server/service/Game";
import { FaPlus } from "react-icons/fa";
import Button from "src/client/component/Button";

export default function MasterIndex() {
  const navigate = useNavigate();

  const startTestGame = () => {
    proxyClient.createGame.query("1").then((id) => {
      console.log(id);
      navigate(`/master/${id}`);
      return id;
    });
  };

  return (
    <main className="absolute inset-0 flex p-8 flex-col items-stretch gap-4 bg-b">
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
      <QuizCard onStart={startTestGame} onEdit={() => {}} quiz={mockQuiz} />
      <QuizCard onStart={() => {}} onEdit={() => {}} quiz={mockQuiz} />

      <p className="text-white opacity-70">No quizzes</p>
    </main>
  );
}
