import { FC } from "react";
import Editor from "src/client/page/master/Editor";
import { useEditor } from "src/client/hook/useEditor";
import { AnswerOption } from "src/server/types/AnswerOption";
import CheckboxEditor from "./CheckBoxEditor";

const AnswerOptionEditor: FC<{
  value: AnswerOption;
  onChange: (a: AnswerOption) => void;
}> = ({ value, onChange }) => {
  const [answerOption, editorFactory] = useEditor<AnswerOption>(
    value,
    onChange
  );
  return (
    <div>
      <Editor
        label="Answer"
        additionalCheckbox={
          <CheckboxEditor
            label="Correct"
            {...editorFactory<boolean>(answerOption, "correct")}
          />
        }
        {...editorFactory<string>(answerOption, "text")}
      />
    </div>
  );
};

export default AnswerOptionEditor;
