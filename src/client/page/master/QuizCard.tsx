import { FC } from "react";
import { Quiz } from "src/server/types/Quiz";
import { FaEdit, FaPlay } from "react-icons/fa";
import Button from "src/client/component/Button";
import { Link } from "react-router-dom";
import { MdClear } from "react-icons/md";

const QuizCard: FC<{
  quiz: Quiz;
  onStart: (quiz: Quiz) => void;
  onDelete: () => void;
}> = ({ quiz, onStart, onDelete }) => {
  return (
    <div className="bg-white p-4 shadow-md flex flex-col rounded-md">
      <div className="flex flex-col grow items-start">
        <h1 className="text-xl font-bold">{quiz.title || <i>Untitled</i>}</h1>
        <div>{quiz.questions.length} questions</div>
      </div>
      <div className="mt-4 flex flex-row items-end gap-2 flex-wrap">
        <Link to={`/master/edit/${quiz.id}`}>
          <Button className="bg-b rounded-md text-white font-bold">
            <FaEdit />
            Edit
          </Button>
        </Link>
        <Button
          onClick={onDelete}
          className="bg-red-500 rounded-md text-white font-bold"
        >
          <MdClear />
          Delete
        </Button>
        <div className="grow"></div>
        <Button
          onClick={() => onStart(quiz)}
          className="bg-d rounded-md text-white font-bold"
        >
          <FaPlay />
          Start
        </Button>
      </div>
    </div>
  );
};

export default QuizCard;
