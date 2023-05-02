import clsx from "clsx";

export default function AnswerButton({
  id,
  value,
  onClick,
  view,
  correct = undefined,
  playerAmount,
  grayedOut = false,
}: AnswerButtonProps) {
  const classNames: { [id: string]: string } = {
    a: "bg-a",
    b: "bg-b",
    c: "bg-c",
    d: "bg-d",
  };
  const darkClassNames: { [id: string]: string } = {
    a: "bg-a-dark",
    b: "bg-b-dark",
    c: "bg-c-dark",
    d: "bg-d-dark",
  };
  return (
    <div
      className={clsx("relative", {
        "opacity-50": correct === false || grayedOut,
      })}
    >
      <button
        onClick={onClick}
        className={clsx(
          "relative z-20 px-4 w-full h-full text-left rounded-md text-white font-bold flex flex-row items-center justify-around",
          classNames[id],
          {
            "justify-center": view === "player",
          }
        )}
      >
        <div
          className={clsx("text-4xl m-6 text-center drop-shadow-md", {
            "text-5xl": view === "player",
          })}
        >
          {id.toUpperCase()}
        </div>
        {view === "watch" && (
          <>
            <div className="text-xl grow drop-shadow-md">{value}</div>
            <div className="drop-shadow-md">{playerAmount}</div>
          </>
        )}
        {/*correct && <Tick />*/}
      </button>
      <div
        className={clsx(
          "rounded-md w-full h-full absolute inset-0 top-2 z-0",
          darkClassNames[id]
        )}
      ></div>
    </div>
  );
}

export type AnswerButtonProps = {
  id: string;
  value: string;
  onClick: () => void;
  correct: boolean | undefined;
  view: "watch" | "player";
  playerAmount?: number;
  grayedOut?: boolean;
  className?: string;
};
