import { IComponentController, ILogService, IQService, ITimeoutService, copy } from "angular";
import { ICategory, IGameBoard, ITile, IGameEngine, IClueOptions, IClue } from "../app.interfaces";

let template: string = `
    <div class="game-board">
        <table class="table">
            <thead>
                <tr scope="col" class="row">
                    <th 
                        class="col tile-header align-middle align-content-center"
                        ng-repeat="category in $ctrl.categories track by category.id">
                        <div class="header-title text-center">{{ ::category.title.trim() }}</div></th>                
                </tr>
                <tr><td colspan="6" class="spacer">&nbsp;</td></tr>
            </thead>                
            <tbody>
                <tr ng-repeat="tiles in $ctrl.gameBoard track by $index" class="row">
                    <td 
                        ng-repeat="tile in tiles track by $index"
                        class="col tile align-middle align-content-center"
                        ng-click="$ctrl.getClue({ value: tile.value, category: tile.category.id })">
                        <div class="tile-title text-center">{{ ::tile.title.trim() }}</div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
`;

class GameBoard implements IComponentController, IGameBoard {
    static $inject: Array<string> = ['$q', '$log', '$timeout', 'gameEngine'];

    private $q: IQService;
    private gameEngine: IGameEngine;
    private $log: ILogService;
    private $timeout: ITimeoutService;

    categories: Array<ICategory> = [];
    gameBoard: Array<ITile> = [];
    clueValues: Array<number> = [200, 400, 600, 800, 1000];
    currentClue: IClue = null;

    constructor($q: IQService, $log: ILogService, $timeout: ITimeoutService, gameEngine: IGameEngine) {
        this.gameEngine = gameEngine;
        this.$log = $log;
        this.$q = $q;
        this.$timeout = $timeout;
    }

    $onInit(): void {
        this.buildGameBoard();
    }

    /**
     * Gets a list of random categories and builds a full game board.
     */
    buildGameBoard(): void {
        this.gameEngine.getCategories(6)
            .then((cats: any) => {
                this.categories = copy(cats.data);
                let board: Array<any> = [];

                /**
                 * Each category contains 5 dollar values [200, 400, 600, 800, 1000] <p/>
                 * (doubled in value during 'double jeopardy')
                 */
                for (let i: number = 0, len: number = this.clueValues.length; i < len; i++) {
                    let row = [];

                    // each categories we construct an ITile object and add to the row.
                    for (let j = 0, len = this.categories.length; j < len; j++) {
                        row.push({
                            title: `\$${this.clueValues[i]}`,
                            category: this.categories[j],
                            value: this.clueValues[i]
                        });
                    }

                    // the row is finished... send it to the board.
                    board.push(row);
                }

                this.gameBoard = copy(board);
                this.$log.info('this.gameBoard: ', this.gameBoard);
            });
    }

    getClue(clue: IClueOptions): void {
        this.gameEngine.getClues(clue)
            .then((response: any) => {
                this.currentClue = response.data as IClue;
            });
    }
}

export default {
    bindings: {},
    controller: GameBoard,
    template: template
};