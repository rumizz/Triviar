import clsx from "clsx";
import { FC, ReactNode } from "react";

const Button: FC<{
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}> = ({ children, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "bg-b rounded-md text-white font-bold px-4 py-2 flex flex-row items-center gap-2",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
