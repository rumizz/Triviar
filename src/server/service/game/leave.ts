import { Context } from "../../router/context";
import { connections } from "../Game";

export function leave({ user }: Context) {
  connections[user.id] = undefined;
}
