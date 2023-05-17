import clsx from "clsx";
import { FC, ReactNode } from "react";

const Button: FC<{
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}> = ({ children, className, onClick, type = "button", disabled = false }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "bg-b rounded-md text-white font-bold px-4 py-2 flex flex-row items-center gap-2",
        {
          "opacity-50 cursor-not-allowed": disabled,
        },
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
