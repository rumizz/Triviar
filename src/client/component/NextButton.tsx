import clsx from "clsx";

export type NextButtonProps = {
  onClick: () => void;
  text: string;
  className?: string;
};

export default function NextButton({
  onClick,
  text,
  className,
}: NextButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "bg-d rounded-full w-fit px-8 py-2 text-white font-bold drop-shadow-md",
        className
      )}
    >
      <span className="drop-shadow-md">{text}</span>
    </button>
  );
}
