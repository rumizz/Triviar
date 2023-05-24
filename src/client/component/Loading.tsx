import clsx from "clsx";
import { FC } from "react";

const Loading: FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={clsx(
        "p-4 text-center font-bold absolute inset-0 flex items-center justify-center",
        className
      )}
    >
      Loading...
    </div>
  );
};

export default Loading;
