import { Context } from "../../router/context";
import { connections, runningGames } from "../Game";
import { addPlayer } from "./addPlayer";

export function join({ user }: Context, joinCode: number): string {
  let game = runningGames.find(
    (game) => game.state.get().joinCode === joinCode
  );
  console.log("User", user.id, "joining with code", joinCode);
  if (!game) {
    console.log("Game not found");

    console.log(
      "Running game ids",
      runningGames.map((g) => g.id)
    );
    return "";
  }
  console.log("User", user.id, "joined");
  connections[user.id] = game;
  addPlayer({ game, user });
  return game.id;
}
