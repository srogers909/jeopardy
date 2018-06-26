import {IComponentController, IComponentOptions, ILogService} from 'angular';
import {IGameEngine} from '../app.interfaces';

export default class GameTileComponent implements IComponentOptions {
    bindings: any;
    controller: any;
    template: any;

    constructor() {
        this.bindings = {
            $uibModalInstance: '<',
            resolve: '<'
        };
        this.controller = GameTile;
        this.template = `
            <div class="game-tile">
                <div class="modal-body">
                    <p>{{::$ctrl.clue}}</p>
                    <input
                        type="text"
                        class="form-control"
                        ng-model="$ctrl.answer"
                        placeholder="Type Answer Here"/>
                </div>    
                <div class="modal-footer">
                    <button
                        class="btn btn-primary" type="button" ng-click="$ctrl.ok">Answer</button>
                    <button
                        class="btn btn-warning" type="button" ng-click="$ctrl.cancel">Cancel</button>
                </div>
            </div>`;
    }
}

export interface IGameTile {
}

class GameTile implements IComponentController, IGameTile {
    static readonly $inject: string[] = [
        '$log',
        'gameEngine'
    ];

    private $log: ILogService;
    private gameEngine: IGameEngine;

    constructor(
        $log: ILogService,
        gameEngine: IGameEngine
    ) {
        this.$log = $log;
        this.gameEngine = gameEngine;
    }

    $onInit: any = () => {

    };

    cancel: any = () => {
        //this.$uibModalInstance.dismiss('cancel');
    }
}