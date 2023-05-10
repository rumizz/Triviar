import { FC } from "react";
import AnswerOptionEditor from "./AnswerOptionEditor";
import { AnswerOption } from "src/server/types/AnswerOption";
import { EditorListener, useArrayEditor } from "src/client/hook/useEditor";

const AnswerOptionsEditor: FC<{
  name: string;
  value: AnswerOption[];
  onChange: EditorListener<AnswerOption[]>;
}> = ({ name, value, onChange }) => {
  const [options, listEditorFactory] = useArrayEditor<AnswerOption>(
    value,
    () => ({} as AnswerOption), // no need for this
    onChange
  );
  return (
    <div className="flex flex-row gap-4 mb-4">
      <div className="flex-1">
        <AnswerOptionEditor {...listEditorFactory(options, 0)} />
        <AnswerOptionEditor {...listEditorFactory(options, 2)} />
      </div>
      <div className="flex-1">
        <AnswerOptionEditor {...listEditorFactory(options, 1)} />
        <AnswerOptionEditor {...listEditorFactory(options, 3)} />
      </div>
    </div>
  );
};

export default AnswerOptionsEditor;
