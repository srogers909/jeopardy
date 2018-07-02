import { IComponentController, IComponentOptions, ILogService } from "angular";
import {IGameBoard, IGameEngine} from "../app.interfaces";
import { IHistoryEngine } from "../services/historyEngine.service";
import { IConstantsService } from "../services/constants.service";

// TODO: Convert this to a Flex layout with Bootstrap 4.
let template: string = `
    <div class="game-board">    
        <score-board></score-board>
        <table class="table">
            <thead>
                <tr scope="col" class="row">
                    <th 
                        class="col-md tile-header align-middle align-content-center flex-ellipsis"
                        ng-repeat="category in $ctrl.gameEngine.categories track by category.id">
                        <span>{{ ::category.title.trim() }}</span>
                    </th>                
                </tr>
                <tr><td colspan="6" class="spacer">&nbsp;</td></tr>
            </thead>                
            <tbody>
                <tr ng-repeat="tiles in $ctrl.gameEngine.gameBoard track by $index" class="row">
                    <td 
                        ng-repeat="tile in tiles track by $index"
                        class="col-md tile align-middle align-content-center flex-ellipsis">
                        <tile 
                            value="tile.value" 
                            category="tile.category.id"></tile>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
`;

/**
 * Game board AngularJS controller class.
 */
class GameBoard implements IComponentController, IGameBoard {
    static $inject: Array<string> = [
        '$log',
        'constants',
        'gameEngine',
        'historyEngine'
    ];

    private $log: ILogService;
    private constants: IConstantsService;
    private gameEngine: IGameEngine;
    private historyEngine: IHistoryEngine;

    constructor(
        $log: ILogService,
        constants: IConstantsService,
        gameEngine: IGameEngine,
        historyEngine: IHistoryEngine
    ) {
        this.$log = $log;
        this.constants = constants;
        this.gameEngine = gameEngine;
        this.historyEngine = historyEngine;
    }

    $onInit(): void {
        this.gameEngine.buildGameBoard();
        this.historyEngine.addHistoryItem(this.constants.HISTORY_TYPE.GAME_START);
    }

    $onDestroy(): void {
        this.gameEngine.isGameRunning = false;
    }
}

export default class GameBoardComponent implements IComponentOptions {
    bindings: any;
    controller: any;
    template: any;

    constructor() {
        this.bindings = {};
        this.controller = GameBoard;
        this.template = template;
    }
};