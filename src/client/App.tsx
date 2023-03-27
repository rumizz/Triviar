import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Watch from "./page/Watch";
import Player from "./page/Player";
import PlayerStateContextProvider from "./util/PlayerStateContext";

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
