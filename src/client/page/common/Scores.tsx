import { useContext } from "react";
import { GameStateContext } from "../../util/GameStateContext";

export default function ScoresPage({ view }: ScoresPageProps) {
  const { players } = useContext(GameStateContext);

  return (
    <div className="absolute inset-0 flex flex-col bg-a">
      <h1 className="text-center text-3xl font-bold my-8 text-white drop-shadow-md">
        Scores
      </h1>
      <div className="flex flex-col px-8 justify-center items-stretch gap-6">
        {Object.values(players)
          .sort((a, b) => (a.score > b.score ? -1 : 1))
          .map(({ name, score }, index) => (
            <div className="flex flex-row">
              <div className="flex flex-row items-center gap-6 w-full">
                <div className="text-white font-bold drop-shadow-md text-3xl">
                  {index + 1}.
                </div>
                <div className="flagparent">
                  <div className="flag bg-white py-4 px-8 text-center font-bold text-3xl">
                    {name}
                  </div>
                </div>
              </div>
              <div className="flagparent  ">
                <div className="flag bg-white py-4 px-8 text-center font-bold text-3xl flex flex-row">
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
