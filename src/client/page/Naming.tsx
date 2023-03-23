import { useRef } from "react";
import { proxyClient } from "../util/proxyClient";

export default function NamePage() {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <input ref={ref} className="border-2 px-6 py-2 rounded-full m-2"></input>
      <button
        type="submit"
        className="bg-blue-600 text-white font-bold px-6 py-2 rounded-full"
        onClick={() => {
          if (ref.current) {
            proxyClient.game.setName.query(ref.current.value);
          }
        }}
      >
        Submit
      </button>
    </>
  );
}
