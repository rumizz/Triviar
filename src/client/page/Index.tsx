import { Link } from "react-router-dom";

export default function Index() {
  return (
    <main className="absolute inset-0 flex flex-col justify-center items-center font-bold text-xl">
      <div className="text-gray-800  text-2xl">Join as</div>
      <div className="text-white flex p-8 flex-row gap-8 items-stretch justify-center">
        <Link to="/master" className="flex-1">
          <button className="relative p-8 bg-a rounded-lg text-center w-full h-full">
            <div className="absolute inset-1 rounded-lg border-dashed border-4 border-gray-100"></div>
            Teacher / Game master
          </button>
        </Link>
        <Link to="/game" className="flex-1">
          <button className="relative p-8 bg-b rounded-lg text-center w-full h-full">
            <div className="absolute inset-1 rounded-lg border-dashed border-4 border-gray-100"></div>
            Player
          </button>
        </Link>
      </div>
    </main>
  );
}
