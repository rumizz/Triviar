import React from "react";
import ReactDOM from "react-dom/client";
import App from "./client/App";
import reportWebVitals from "./client/reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./client/page/Index";
import GameConnectionContextProvider from "./client/util/GameConnectionContext";
import Page404 from "./client/page/404";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route
          path="/game/:gameId/*"
          element={
            <GameConnectionContextProvider>
              <App />
            </GameConnectionContextProvider>
          }
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
