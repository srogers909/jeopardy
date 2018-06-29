import {IComponentController, IComponentOptions} from "angular";
import {IGameBoard, IGameEngine} from "../app.interfaces";

// TODO: Convert this to a Flex layout with Bootstrap 4.
let template: string = `
    <div class="game-board">    
        <div class="scoreboard">
            <div class="row">
                <div class="col-2"></div>
                <div class="col-4">
                    Player: {{ $ctrl.gameEngine.playerName }}
                </div>
                <div class="col-4">
                    Score: \${{ $ctrl.gameEngine.currentScore }}
                </div>
                <div class="col-2"></div>
            </div>            
        </div>
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
    static $inject: Array<string> = ['gameEngine'];

    private gameEngine: IGameEngine;

    constructor(gameEngine: IGameEngine) {
        this.gameEngine = gameEngine;
    }

    $onInit(): void {
        this.gameEngine.buildGameBoard();
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