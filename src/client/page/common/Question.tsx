import { GameStateContext } from "../../util/GameStateContext";
import { useContext, useEffect } from "react";
import AnswerButton from "../../component/AnswerButton";
import { proxyClient } from "../../util/proxyClient";
import { AnswerSymbol } from "src/server/types/AnswerOption";
import { usePlayerStore } from "src/client/store/playerStore";
import { useTimer } from "react-timer-hook";
import { Phase } from "src/server/types/Phase";
import { FaStopwatch, FaUser } from "react-icons/fa";

export default function QuestionPage({ view }: QuestionPageProps) {
  const {
    question,
    answerTexts,
    answerCorrects,
    answeredCount,
    players,
    expiryTimestamp,
    phase,
  } = useContext(GameStateContext);

  const { myAnswer, setMyAnswer } = usePlayerStore();
  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp: new Date(expiryTimestamp),
  });

  useEffect(() => {
    restart(new Date(expiryTimestamp));
    console.log("restart timer", new Date(expiryTimestamp));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expiryTimestamp]);

  const submitAnswer = (id: string) => () => {
    if (view === "player") {
      proxyClient.game.answer.query(id);
      setMyAnswer(id as AnswerSymbol);
    }
  };

  return (
    <div className="grow flex flex-col bg-c z-10">
      <div className="flex-1 relative">
        {view === "watch" && (
          <div className="flagparent absolute inset-0 flex items-center justify-center">
            <div className="flag bg-white px-16 py-8 font-bold text-4xl shadow">
              {question}
            </div>
          </div>
        )}
        {view === "player" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="drop-shadow-md text-white text-4xl font-bold m-4 text-center">
              {myAnswer ? "Changed your mind?" : "Answer Now!"}
            </p>
          </div>
        )}

        {view === "watch" && (
          <div className="absolute bottom-0 inset-x-0 flex flex-row p-4 text-black">
            <p className="drop-shadow-md bg-white text-2xl font-bold px-4 py-2 rounded-md flex items-center gap-4">
              <FaStopwatch />
              {phase === Phase.question
                ? `${minutes * 60 + seconds}s`
                : "Time's up!"}
            </p>
            <span className="grow" />
            <p className="drop-shadow-md bg-white text-2xl font-bold px-4 py-2 rounded-md flex gap-4 items-center">
              <FaUser />
              {`${answeredCount} / ${Object.values(players).length}`}
            </p>
          </div>
        )}
      </div>
      <div className="flex-1 bg-gray-800 grid grid-cols-2 grid-rows-2 gap-x-4 gap-y-6 p-4 pb-6">
        {Object.entries(answerTexts).map(([key, text]) => (
          <AnswerButton
            key={key}
            id={key}
            value={text}
            view={view}
            onClick={submitAnswer(key)}
            correct={
              phase === Phase.answer
                ? answerCorrects[key as AnswerSymbol]
                : undefined
            }
            playerAmount={undefined}
            grayedOut={
              view === "player"
                ? myAnswer !== null && myAnswer !== (key as AnswerSymbol)
                : phase === Phase.answer && !answerCorrects[key as AnswerSymbol]
            }
          />
        ))}
      </div>
    </div>
  );
}

type QuestionPageProps = {
  view: "watch" | "player";
};
