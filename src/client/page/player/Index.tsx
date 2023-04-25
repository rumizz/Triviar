import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { proxyClient } from "src/client/util/proxyClient";

export default function PlayerIndex() {
  const navigate = useNavigate();

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
    <main className="absolute inset-0 flex p-8 flex-col items-center justify-center bg-b">
      <form className="flex flex-col gap-2" onSubmit={joinAsPlayer}>
        <label className="self-start font-bold text-white" htmlFor="name">
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
        {error && (
          <div className="rounded-full w-fit text-white font-bold text-center">
            {error}
          </div>
        )}
      </form>
    </main>
  );
}
