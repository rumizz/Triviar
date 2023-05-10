import { FC } from "react";
import { FaPlus } from "react-icons/fa";
import Button from "src/client/component/Button";
import { EditorListener, useArrayEditor } from "src/client/hook/useEditor";
import { Question } from "src/server/types/Question";
import QuestionEditor from "./QuestionEditor";

const QuestionsEditor: FC<{
  value: Question[];
  defaultQuestion: Question;
  onChange: EditorListener<Question[]>;
}> = ({ value, defaultQuestion, onChange }) => {
  const [questions, setQuestions, listEditorFactory, addNew, deleterFactory] =
    useArrayEditor<Question>(
      value,
      () => {
        return new Question({
          time: defaultQuestion.time,
          score: defaultQuestion.score,
        } as Question);
      },
      onChange
    );
  return (
    <div className="flex flex-col gap-4 pb-4">
      <div className="flex flex-row justify-end">
        <Button onClick={addNew}>
          <FaPlus />
          Add new question
        </Button>
      </div>
      {questions.map((question, index) => (
        <QuestionEditor
          index={index}
          defaultValue={defaultQuestion}
          onDelete={deleterFactory(index)}
          {...listEditorFactory(questions, index)}
        />
      ))}
      {questions.length > 0 && (
        <div className="flex flex-row justify-end">
          <Button onClick={addNew}>
            <FaPlus />
            Add new question
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuestionsEditor;
