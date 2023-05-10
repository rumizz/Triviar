import React, { ReactNode } from "react";
import { EditorListener } from "../../hook/useEditor";

type inputTypeName = "text" | "number";
type inputType = string | number;

interface EditorProps<T extends inputType = string> {
  type?: inputTypeName;
  onChange: EditorListener<T>;
  name?: string;
  label: string;
  value: T;
  placeholder?: T;
  defaultValue?: T;
  usingDefault?: boolean;
  additionalCheckbox?: ReactNode;
}

const Editor = <T extends inputType>({
  type = "text",
  onChange,
  name,
  label,
  value,
  placeholder,
  defaultValue,
  usingDefault = false,
  additionalCheckbox,
}: EditorProps<T>) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value as T);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex mt-2 items-center">
        <label className="grow" htmlFor={name}>
          {label}
        </label>
        {additionalCheckbox}
      </div>
      <input
        className="px-4 py-2 rounded-md border-2 border-black disabled:opacity-40"
        name={name}
        type={type}
        placeholder={placeholder?.toString()}
        onChange={handleOnChange}
        value={usingDefault ? defaultValue : value}
        disabled={usingDefault}
      />
    </div>
  );
};

export default Editor;
