import { IComponentController, IComponentOptions, ILogService, IQService, IPromise, IScope } from "angular";
import {IConstantsService} from "../services/constants.service";
import {IGameEngine} from "../app.interfaces";

let template: string = `<div class="scoreboard row">
    <div class="col-4 player-name align-content-center"><b>{{ ::$ctrl.gameEngine.playerName }}</b></div>
    <div class="col-4 round align-content-center">{{ $ctrl.whichRound() }}</div>
    <div class="col-4 score-container align-content-center">\${{ $ctrl.gameEngine.currentScore }}</div>
</div>`;

class ScoreBoard implements IComponentController {
    static readonly $inject: Array<string> = ['$scope', '$q', '$log', 'constants', 'gameEngine'];

    private $scope: IScope;
    private $q: IQService;
    private $log: ILogService;
    private constants: IConstantsService;
    private gameEngine: IGameEngine;

    constructor(
        $scope: IScope,
        $q: IQService,
        $log: ILogService,
        constants: IConstantsService,
        gameEngine: IGameEngine
    ) {
        this.$scope = $scope;
        this.$q = $q;
        this.$log = $log;
        this.constants = constants;
        this.gameEngine = gameEngine;
    }

    $onInit(): void {
        this.$log.info('this.gameEngine.playerName: ', this.gameEngine.playerName);
    }

    whichRound(): string {
        let rounds: any = this.constants.ROUNDS;
        let roundTitle: string;

        switch(this.gameEngine.currentRound) {
            case rounds.DOUBLE_JEOPARDY:
                roundTitle = 'double jeopardy';
                break;
            case rounds.FINAL_JEOPARDY:
                roundTitle = 'final jeopardy';
                break;
            default:
                roundTitle = 'jeopardy';
                break;
        }

        return roundTitle;
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