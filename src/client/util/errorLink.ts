import { TRPCLink } from "@trpc/client";
import { observable } from "@trpc/server/observable";
import { AppRouter } from "src/server/router/router";
import { useLoginStore } from "../store/loginStore";

export const errorLink: TRPCLink<AppRouter> = () => {
  return ({ next, op }) => {
    return observable((observer) => {
      console.log("performing operation:", op);
      const unsubscribe = next(op).subscribe({
        next(value) {
          console.log("received value", value);
          observer.next(value);
        },
        error(err) {
          console.log("received error", JSON.parse(JSON.stringify(err)));
          if (err.data?.httpStatus === 401) {
            sessionStorage.removeItem("token");
            useLoginStore.getState().setToken("");
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
