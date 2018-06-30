import {IGameEngine} from "../app.interfaces";
import {IComponentController, IComponentOptions, ILogService} from "angular";

let _template = `<div 
class="tile-title text-center" 
ng-if="$ctrl.isActive" 
ng-click="$ctrl.getClue()"><span>\${{ ::$ctrl.value }}</span></div>`;

class Tile implements IComponentController {
    static readonly $inject: Array<string> = ['$log', 'gameEngine', '$uibModal'];

    category: any = null;
    value: number = null;

    private isActive: boolean = true;

    private $log: ILogService;
    private gameEngine: IGameEngine;
    private $uibModal: any;

    constructor(
        $log: ILogService,
        gameEngine: IGameEngine,
        $uibModal: any
    ) {
        this.$log = $log;
        this.gameEngine = gameEngine;
        this.$uibModal = $uibModal;
    }

    $onInit(): void {
    }

    getClue(): void {
        this.gameEngine.tilesPlayed += 1;

        this.$uibModal
            .open({
                animation: false,
                backdrop: 'static',
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                windowClass: 'clue-window',
                component: 'clue',
                size: 'lg',
                resolve: {
                    clue: () => {
                        return this.gameEngine.getClues(this.value, this.category);
                    }
                }
            })
            .result
            .catch(() => {
                this.isActive = false;
                this.gameEngine.roundOver();
            });
    }
}

export default class TileComponent implements IComponentOptions {
    bindings: any;
    controller: any;
    template: any;

    constructor() {
        this.bindings = {
            category: '<',
            value: '<'
        };
        this.controller = Tile;
        this.template = _template;
    }
}