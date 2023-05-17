import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Page404 from "./client/page/404";
import Index from "./client/page/Index";
import Player from "./client/page/Player";
import Watch from "./client/page/Watch";
import MasterIndex from "./client/page/master/Index";
import PlayerIndex from "./client/page/player/Index";
import reportWebVitals from "./client/reportWebVitals";
import GameConnectionContextProvider from "./client/util/GameConnectionContext";
import "./client/index.css";
import PlayerStateContextProvider from "./client/util/PlayerStateContext";
import QuizForm from "./client/page/master/QuizForm";
import LoginContextProvider from "./client/util/LoginContext";
import RegisterPage from "./client/page/Register";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/game" element={<PlayerIndex />} />
        <Route
          path="/game/:gameId/*"
          element={
            <GameConnectionContextProvider>
              <PlayerStateContextProvider>
                <Player />
              </PlayerStateContextProvider>
            </GameConnectionContextProvider>
          }
        />
        <Route
          path="/master/*"
          element={
            <LoginContextProvider>
              <Routes>
                <Route path="/" element={<MasterIndex />} />
                <Route path="/new" element={<QuizForm isNew />} />
                <Route path="/edit/:quizId" element={<QuizForm />} />

                <Route
                  path="/:gameId/*"
                  element={
                    <GameConnectionContextProvider>
                      <Watch />
                    </GameConnectionContextProvider>
                  }
                />
              </Routes>
            </LoginContextProvider>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
