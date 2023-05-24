import clsx from "clsx";
import Button from "./Button";
import { ReactNode } from "react";

export type NextButtonProps = {
  onClick: () => void;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
};

export default function NextButton({
  onClick,
  children,
  className,
  disabled = false,
}: NextButtonProps) {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "bg-d rounded-full w-fit py-2 text-white font-bold drop-shadow-md",
        className
      )}
    >
      {children}
    </Button>
  );
}
