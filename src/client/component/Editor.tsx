import React, { ReactNode } from "react";
import { EditorListener } from "../hook/useEditor";

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
  defaultCheckbox?: ReactNode;
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
  defaultCheckbox,
}: EditorProps<T>) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value as T);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex mt-2">
        <label className="text-white grow" htmlFor={name}>
          {label}
        </label>
        {defaultCheckbox}
      </div>
      <input
        className="px-4 py-2 rounded-md"
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
