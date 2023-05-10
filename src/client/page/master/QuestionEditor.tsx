import { FC, useState } from "react";
import { MdClose } from "react-icons/md";
import { useEditor } from "src/client/hook/useEditor";
import Editor from "src/client/page/master/Editor";
import { AnswerOption } from "src/server/types/AnswerOption";
import { DefaultQuestionOptions, Question } from "src/server/types/Question";
import AnswerOptionsEditor from "./AnswerOptionsEditor";
import CheckboxEditor from "./CheckBoxEditor";
import clsx from "clsx";

const QuestionEditor: FC<{
  index: number;
  name: number;
  value: Question;
  defaultValue: Question;
  onChange: (value: Question) => void;
  onDelete: () => void;
}> = ({ index, name, value, defaultValue, onChange, onDelete }) => {
  const [question, editorFactory] = useEditor<Question>(value, onChange);
  const [usingDefaults, usingDefaultsFactory] =
    useEditor<DefaultQuestionOptions>(
      value.usingDefaults,
      editorFactory(question, "usingDefaults").onChange
    );

  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <div className="border-2 px-4 pt-1 rounded-md">
      <div
        onClick={() => setIsOpen((isOpen) => !isOpen)}
        className={clsx(
          "text-xl mt-2 pb-2 -mx-4 px-4 flex gap-4 cursor-pointer",
          {
            "border-b-2": isOpen,
          }
        )}
      >
        <div className="font-bold">{index + 1}</div>
        <div className="grow">{question.title}</div>
        <button onClick={onDelete}>
          <MdClose color="red" />
        </button>
      </div>
      {isOpen && (
        <>
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

          <AnswerOptionsEditor
            {...editorFactory<AnswerOption[]>(question, "options")}
          />
        </>
      )}
    </div>
  );
};

export default QuestionEditor;
