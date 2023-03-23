import clsx from "clsx";

export default function AnswerButton({
  id,
  value,
  onClick,
  className,
}: AnswerButtonProps) {

  const classNames: { [id: string]: string } = {
    "a": "bg-a",
    "b": "bg-b",
    "c": "bg-c",
    "d": "bg-d",
  }
  const darkClassNames: { [id: string]: string } = {
    "a": "bg-a-dark",
    "b": "bg-b-dark",
    "c": "bg-c-dark",
    "d": "bg-d-dark",
  }
  return (
    <div className="relative">
      <button
        onClick={onClick}
        className={clsx(
          "relative z-20 w-full h-full text-left rounded-md text-white font-bold flex flex-row items-center",
          classNames[id]
        )}
      >
        <div className="text-4xl w-8 m-6 text-center">{id.toUpperCase()}</div>
        <div className="text-xl">{value}</div>
      </button>
      <div className={clsx(
        "rounded-md w-full h-full absolute inset-0 top-1 z-0",
        darkClassNames[id]
      )}></div>
    </div >
  );
}

export type AnswerButtonProps = {
  id: string;
  value: string;
  onClick: () => void;
  className?: string;
};
