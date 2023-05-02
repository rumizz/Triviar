import clsx from "clsx";
import Button from "./Button";
import { ReactNode } from "react";

export type NextButtonProps = {
  onClick: () => void;
  children?: ReactNode;
  className?: string;
};

export default function NextButton({
  onClick,
  children,
  className,
}: NextButtonProps) {
  return (
    <Button
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
