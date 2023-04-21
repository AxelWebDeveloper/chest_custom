import {UserInterface} from "./user.interface";

export interface GameInterface {
    id: number;
    uuid: string;
    name: string;
    isOpen: boolean;
    players: UserInterface[];
}
