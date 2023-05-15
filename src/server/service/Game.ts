import { Game } from "../types/Game";

export let runningGames: Game[] = [];

export let connections: { [id: string]: Game } = {};
