import React, { FC, ReactNode } from "react";
import { EditorListener } from "src/client/hook/useEditor";

const CheckboxEditor: FC<{
  onChange: EditorListener<boolean>;
  value: boolean;
  label: string;
  name: string;
}> = ({ onChange, value, label, name }) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };
  return (
    <div className="flex gap-2">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        type="checkbox"
        checked={value}
        onChange={handleOnChange}
      />
    </div>
  );
};

export default CheckboxEditor;
