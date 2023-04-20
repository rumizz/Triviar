import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { proxyClient } from "../util/proxyClient";

export default function Index() {
  const navigate = useNavigate();

  const startTestGame = () => {
    proxyClient.createGame.query("1").then((id) => {
      console.log(id);
      navigate(`/game/${id}/watch`);
      return id;
    });
  };
  const joinAsPlayer = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (ref.current && parseInt(ref.current.value)) {
      proxyClient.join.query(parseInt(ref.current.value)).then((id) => {
        if (!id) {
          setError("Game not found");
          return;
        }
        console.log(id);
        navigate(`/game/${id}`);
      });
    }
  };
  const ref = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <main className="flex p-8 flex-col items-center">
      <button
        onClick={startTestGame}
        className="px-4 py-2 rounded-md text-black bg-gray-200"
      >
        Start Test game
      </button>

      <form className="flex flex-col" onSubmit={joinAsPlayer}>
        <label
          className="self-start font-bold text-gray-600 mb-2"
          htmlFor="name"
        >
          Join game
        </label>
        <div className="flex gap-2 items-stretch flex-col md:flex-row justify-center">
          <input
            name="joinCode"
            placeholder="Code"
            type="number"
            ref={ref}
            className="border-2 px-6 py-2 rounded-full h-10"
          />
          <button
            type="submit"
            className="bg-d text-white font-bold px-6 py-2 h-10 rounded-full shadow-md"
          >
            Join
          </button>
        </div>
        {error && <div className="text-red-500 p-2 text-center">{error}</div>}
      </form>
    </main>
  );
}
