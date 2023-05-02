import { FC } from "react";
import { Quiz } from "src/server/types/Quiz";
import { FaEdit, FaPlay } from "react-icons/fa";
import Button from "src/client/component/Button";
import { Link } from "react-router-dom";

const QuizCard: FC<{
  quiz: Quiz;
  onStart: (quiz: Quiz) => void;
  onEdit: (quiz: Quiz) => void;
}> = ({ quiz, onStart, onEdit }) => {
  return (
    <div className="bg-white p-4 shadow-md flex flex-row rounded-md">
      <div className="flex flex-col grow">
        <h1 className="text-xl font-bold">{quiz.title}</h1>
        <div>{quiz.questions.length} questions</div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <Button
          onClick={() => onStart(quiz)}
          className="bg-d rounded-md text-white font-bold"
        >
          <FaPlay />
          Start
        </Button>
        <Link to={`/edit/${quiz.id}`}>
          <Button className="bg-b rounded-md text-white font-bold">
            <FaEdit />
            Edit
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default QuizCard;
