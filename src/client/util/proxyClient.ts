import {
  createTRPCProxyClient,
  createWSClient,
  httpBatchLink,
  splitLink,
  wsLink,
} from "@trpc/react";
import { AppRouter } from "src/server/router/router";

export const proxyClient = createTRPCProxyClient<AppRouter>({
  links: [
    /*
    wsLink({
      client: createWSClient({
        url: `ws://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_WEBSOCKET_PORT}`,
      }),
    }),*/

    splitLink({
      condition(op) {
        return op.type === "subscription";
      },
      true: wsLink({
        client: createWSClient({
          url: `ws://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_WEBSOCKET_PORT}`,
        }),
      }),
      false: httpBatchLink({
        url: `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`,
      }),
    }),
  ],
});
