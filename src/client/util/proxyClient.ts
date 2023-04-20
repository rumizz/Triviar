import {
  createTRPCProxyClient,
  createWSClient,
  httpBatchLink,
  splitLink,
  wsLink,
} from "@trpc/react";
import { AppRouter } from "src/server/router/router";

export const token =
  localStorage.getItem("token") ??
  "ID-" + (Math.random() * 10000000).toFixed(0);

localStorage.setItem("token", token);

export const proxyClient = createTRPCProxyClient<AppRouter>({
  links: [
    splitLink({
      condition(op) {
        return op.type === "subscription";
      },
      true: wsLink({
        client: createWSClient({
          WebSocket: WebSocket,
          url: `ws://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_WEBSOCKET_PORT}`,
        }),
      }),
      false: httpBatchLink({
        url: `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`,
        headers: () => ({
          "www-authenticate": token,
        }),
      }),
    }),
  ],
});
