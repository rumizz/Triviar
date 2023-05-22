import { TRPCLink } from "@trpc/client";
import { observable } from "@trpc/server/observable";
import { AppRouter } from "src/server/router/router";
import { useLoginStore } from "../store/loginStore";
import { GAME_NOT_FOUND } from "src/server/types/ErrorCodes";

export const errorLink: TRPCLink<AppRouter> = () => {
  return ({ next, op }) => {
    return observable((observer) => {
      console.log("performing operation:", op);
      const unsubscribe = next(op).subscribe({
        next(value) {
          console.log("[errorLink] value", value);
          // @ts-ignore
          if (value.result?.data?.error === GAME_NOT_FOUND) {
            console.warn("game not found");
            alert("The game does not exist or has been deleted");
            window.location.replace("/");
          }
          observer.next(value);
        },
        error(err) {
          console.log("[errorLink] error", JSON.parse(JSON.stringify(err)));
          if (err.data?.httpStatus === 401) {
            useLoginStore.getState().logout();
          }
          observer.error(err);
        },
        complete() {
          observer.complete();
        },
      });
      return unsubscribe;
    });
  };
};
