import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";

import { applyWSSHandler } from "@trpc/server/adapters/ws";
import * as dotenv from "dotenv";
import path from "path";
import ws from "ws";
import { router } from "./router/router";

import { createContext } from "./router/context";

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

console.log("starting");

const app = express();
app.use(cors());

app.use(
  "/",
  createExpressMiddleware({
    router,
    createContext,
  })
);

app.listen(process.env.API_PORT, () => {
  console.log(`Express Server listening on ${process.env.API_PORT}`);
});

const wss = new ws.Server({
  port: parseInt(process.env.WEBSOCKET_PORT || "3001"),
});

const handler = applyWSSHandler({
  wss,
  router,
  createContext,
});

wss.on("connection", (ws) => {
  console.log(`++ Connection (${wss.clients.size})`);
  ws.once("close", () => {
    console.log(`-- Connection (${wss.clients.size})`);
  });
});
console.log(`WebSocket Server listening on ${process.env.WEBSOCKET_PORT}`);

process.on("SIGTERM", () => {
  console.log("SIGTERM");
  handler.broadcastReconnectNotification();
  wss.close();
});
