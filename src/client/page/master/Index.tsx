import { useNavigate } from "react-router-dom";
import { proxyClient } from "src/client/util/proxyClient";

export default function MasterIndex() {
  const navigate = useNavigate();

  const startTestGame = () => {
    proxyClient.createGame.query("1").then((id) => {
      console.log(id);
      navigate(`/master/${id}`);
      return id;
    });
  };

  return (
    <main className="absolute inset-0 flex p-8 flex-col items-center bg-b">
      <button
        onClick={startTestGame}
        className="px-4 py-2 rounded-md text-black bg-gray-200"
      >
        Start Test game
      </button>
    </main>
  );
}
