import {
  createTRPCProxyClient,
  createWSClient,
  httpBatchLink,
  loggerLink,
  splitLink,
  wsLink,
} from "@trpc/react";
import { AppRouter } from "src/server/router/router";
import { errorLink } from "./errorLink";
import { useLoginStore } from "../store/loginStore";

export const proxyClient = createTRPCProxyClient<AppRouter>({
  links: [
    loggerLink({
      enabled: (opts) =>
        (process.env.NODE_ENV === "development" &&
          typeof window !== "undefined") ||
        (opts.direction === "down" && opts.result instanceof Error),
    }),
    errorLink,
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
          "www-authenticate": useLoginStore.getState().token,
        }),
      }),
    }),
  ],
});
