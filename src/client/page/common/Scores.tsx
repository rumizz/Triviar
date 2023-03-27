import { useContext } from "react";
import { GameStateContext } from "../../util/GameStateContext";

export default function ScoresPage({ view }: ScoresPageProps) {
  const { players } = useContext(GameStateContext);

  return (
    <div className="absolute inset-0 flex flex-col bg-a">
      <h1 className="text-center text-3xl font-bold my-8 text-white drop-shadow-md">
        Scores
      </h1>
      <div className="flex flex-col justify-center items-stretch">
        {Object.values(players).map(({ name, score }) => (
          <div key={name} className="flex justify-between p-8">
            <div className="bg-white w-48 py-4 text-center font-bold text-3xl">
              {name}
            </div>
            <div className="bg-white w-48 py-4 text-center font-bold text-3xl">
              {score}
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
