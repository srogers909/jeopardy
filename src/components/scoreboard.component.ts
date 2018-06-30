import {IComponentController, IComponentOptions, ILogService} from "angular";
import {IConstantsService} from "../services/constants.service";
import {IGameEngine} from "../app.interfaces";

let template = `<div class="scoreboard">

</div>`;

class ScoreBoard implements IComponentController {
    static readonly $inject: Array<string> = ['$log', 'constants', 'gameEngine'];

    private $log: ILogService;
    private constants: IConstantsService;
    private gameEngine: IGameEngine;

    constructor($log: ILogService, constants: IConstantsService, gameEngine: IGameEngine) {

    }
}

export default class ScoreboardComponent implements IComponentOptions {
    bindings: any;
    controller: any;
    template: any;

    constructor() {
        this.bindings = {};
        this.controller = ScoreBoard;
        this.template = template;
    }
}