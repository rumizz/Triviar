import { useRef } from "react";
import { proxyClient } from "../../util/proxyClient";

export default function NamePage() {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="absolute inset-0 bg-b flex flex-col justify-center items-center">
      <div className="flex flex-col">
        <label
          className="self-start font-bold text-white mb-2 drop-shadow-md"
          htmlFor="name"
        >
          Enter your remarkable nickname
        </label>
        <div className="flex gap-2 items-stretch flex-col md:flex-row justify-center">
          <input
            name="name"
            ref={ref}
            className="border-2 px-6 py-2 rounded-full h-10"
          />
          <button
            type="submit"
            className="bg-d text-white font-bold px-6 py-2 h-10 rounded-full shadow-md"
            onClick={() => {
              if (ref.current) {
                proxyClient.game.setName.query(ref.current.value);
              }
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
