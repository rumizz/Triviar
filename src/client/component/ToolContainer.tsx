import clsx from "clsx";
import { FC, ReactNode } from "react";

const ToolContainer: FC<{ children: ReactNode; className?: string }> = ({
  className = "",
  children,
}) => (
  <div
    className={clsx(
      "absolute top-4 right-4 flex gap-4 justify-end z-20",
      className
    )}
  >
    {children}
  </div>
);

export default ToolContainer;
