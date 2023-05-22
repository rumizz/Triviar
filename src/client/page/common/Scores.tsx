import { useContext } from "react";
import { GameStateContext } from "../../util/GameStateContext";
import { PlayerStateContext } from "src/client/util/PlayerStateContext";
import clsx from "clsx";

export default function ScoresPage({ view }: ScoresPageProps) {
  const { players } = useContext(GameStateContext);

  const { rank } = useContext(PlayerStateContext);

  return (
    <div className="absolute inset-0 flex flex-col bg-a">
      <h1 className="text-center text-3xl font-bold mt-20 mb-8 md:my-8 text-white drop-shadow-md">
        Scores
      </h1>

      <div className="flex flex-col px-4 md:px-8 justify-center items-stretch gap-6 text-xl md:text-2xl font-bold">
        {Object.values(players)
          .sort((a, b) => (a.score > b.score ? -1 : 1))
          .filter((_, index) =>
            view === "player"
              ? index >= rank - 1 && index <= rank + 1
              : index < 5
          )
          .map(({ id, name, score }, index) => (
            <div key={id} className="flagparent">
              <div
                className={clsx(
                  "flag bg-white text-black flex flex-row px-8 py-4 gap-4",
                  {
                    "bg-gray-400": view === "player" && index !== rank,
                  }
                )}
              >
                <div className="drop-shadow-md">{index + 1}.</div>
                <div className="overflow-hidden grow">{name}</div>
                <div className="text-center font-bold flex flex-row">
                  {score}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export type ScoresPageProps = {
  view: "watch" | "player";
};
