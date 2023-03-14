import express from "express";
import cors from "cors";
import { CreateWSSContextFnOptions } from "@trpc/server/adapters/ws";
import {
  CreateExpressContextOptions,
  createExpressMiddleware,
} from "@trpc/server/adapters/express";

import * as dotenv from "dotenv";
import path from "path";
import { router } from "./router/router";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import ws from "ws";

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

export const createContext = ({}:
  | CreateExpressContextOptions
  | CreateWSSContextFnOptions) => ({});

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
  port: parseInt(process.env.WEBSOCKET_PORT),
});
const handler = applyWSSHandler({ wss, router, createContext });

wss.on("connection", (ws) => {
  console.log(`++ Connection (${wss.clients.size})`);
  ws.once("close", () => {
    console.log(`-- Connection (${wss.clients.size})`);
  });
});
console.log(`webSocket Server listening on ${process.env.WEBSOCKET_PORT}`);

process.on("SIGTERM", () => {
  console.log("SIGTERM");
  handler.broadcastReconnectNotification();
  wss.close();
});
