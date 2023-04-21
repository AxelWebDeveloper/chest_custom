import {GameInterface} from "./game.interface";

export interface UserInterface {
    id: number;
    uuid: string;
    email: string;
    password: string;
    games: GameInterface[];
}
