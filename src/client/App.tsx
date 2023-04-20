import { Route, Routes } from "react-router-dom";
import "./index.css";
import Player from "./page/Player";
import Watch from "./page/Watch";
import PlayerStateContextProvider from "./util/PlayerStateContext";

function App() {
  return (
    <Routes>
      <Route path="/watch" element={<Watch />} />
      <Route
        path="/"
        element={
          <PlayerStateContextProvider>
            <Player />
          </PlayerStateContextProvider>
        }
      />
    </Routes>
  );
}

export default App;
