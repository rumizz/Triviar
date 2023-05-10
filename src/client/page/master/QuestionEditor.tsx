import { FC } from "react";
import Editor from "src/client/page/master/Editor";
import { useEditor } from "src/client/hook/useEditor";
import { Question } from "src/server/types/Question";
import AnswerOptionEditor from "./AnswerOptionEditor";
import { AnswerOption } from "src/server/types/AnswerOption";
import { IDictionary } from "src/server/types/IDictionary";
import CheckboxEditor from "./CheckBoxEditor";
import Button from "src/client/component/Button";
import { MdCancel, MdDelete, MdOutlineCancel } from "react-icons/md";

const QuestionEditor: FC<{
  index: number;
  name: number;
  value: Question;
  defaultValue: Question;
  onChange: (value: Question) => void;
  onDelete: () => void;
}> = ({ index, name, value, defaultValue, onChange, onDelete }) => {
  const [question, editorFactory, setQuestion] = useEditor<Question>(
    value,
    onChange
  );
  const [usingDefaults, usingDefaultsFactory] = useEditor<IDictionary<boolean>>(
    value.usingDefaults,
    editorFactory(question, "usingDefaults").onChange
  );

  return (
    <div className="border-2 p-4 pt-1 rounded-md">
      <div className="text-xl font-bold mt-2 flex">
        <div className="grow">{index + 1}</div>
        <button onClick={onDelete}>
          <MdOutlineCancel color="red" />
        </button>
      </div>
      <div className="flex flex-row gap-4">
        <div className="flex-1">
          <Editor
            label="Question"
            {...editorFactory<string>(question, "title")}
          />
        </div>

        <div className="flex-1">
          <Editor<number>
            type="number"
            label="Time (seconds)"
            defaultValue={defaultValue.time}
            usingDefault={usingDefaults.time}
            additionalCheckbox={
              <CheckboxEditor
                label="Use default"
                {...usingDefaultsFactory<boolean>(usingDefaults, "time")}
              />
            }
            {...editorFactory<number>(question, "time")}
          />
          <Editor<number>
            type="number"
            label="Score"
            defaultValue={defaultValue.score}
            usingDefault={usingDefaults.score}
            additionalCheckbox={
              <CheckboxEditor
                label="Use default"
                {...usingDefaultsFactory<boolean>(usingDefaults, "score")}
              />
            }
            {...editorFactory<number>(question, "score")}
          />
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <div className="flex-1">
          <AnswerOptionEditor
            {...editorFactory<AnswerOption>(question.options, "0")}
          />
          <AnswerOptionEditor
            {...editorFactory<AnswerOption>(question.options, "2")}
          />
        </div>
        <div className="flex-1">
          <AnswerOptionEditor
            {...editorFactory<AnswerOption>(question.options, "1")}
          />
          <AnswerOptionEditor
            {...editorFactory<AnswerOption>(question.options, "3")}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionEditor;
