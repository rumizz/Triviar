import { useRef } from "react";
import { proxyClient } from "../../util/proxyClient";

export default function NamePage() {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="absolute inset-0 bg-b flex flex-col justify-center items-center">
      <button
        onClick={() => proxyClient.game.leave.query()}
        className="absolute top-4 left-4 bg-red-600 px-8 py-2 text-white font-bold rounded-md shadow-md"
      >
        Leave
      </button>
      <div className="flex flex-row justify-center items-center">
        <input ref={ref} className="border-2 px-6 py-2 rounded-full m-2" />
        <button
          type="submit"
          className="bg-d text-white font-bold px-6 py-2 rounded-full shadow-md"
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
  );
}
