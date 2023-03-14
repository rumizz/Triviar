import { initTRPC } from "@trpc/server";
import { observable, Observer } from "@trpc/server/observable";
import EventEmitter from "events";
import { z } from "zod";

const emitter = new EventEmitter();
const client = initTRPC.create();

let stateObservers: Observer<unknown, unknown>[] = [];

export const gameRouter = client.router({
  ping: client.procedure.query(() => {}),
  state: client.procedure.subscription(() => {
    return observable((observer) => {
      stateObservers.push(observer);

      const ping = () => observer.next("ping");
      emitter.on("ping", ping);
      return () => {
        stateObservers.splice(
          stateObservers.findIndex((o) => o == observer),
          1
        );
        emitter.off("ping", ping);
      };
    });
  }),
  set: client.procedure
    .input(z.string())
    .query(({ input }) =>
      stateObservers.forEach((observer) => observer.next(input))
    ),
});
