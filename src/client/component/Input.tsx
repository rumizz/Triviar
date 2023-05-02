import { FC } from "react";

const Input: FC<{ defaultValue: string }> = ({ defaultValue }) => {
  return <input defaultValue={defaultValue} />;
};

export default Input;
