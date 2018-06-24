import {IComponentController, ILogService} from "angular";
import {IGameEngine} from "../app.interfaces";

let template: string = `
    
`;

export interface IGameTile {

}

class GameTile implements IComponentController, IGameTile {
    static $inject: string[] = ['$log', 'gameEngine'];

    constructor($log: ILogService, gameEngine: IGameEngine) {
    }
}

export default {
    bindings: {},
    controller: GameTile,
    template: template
};