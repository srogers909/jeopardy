import {IComponentController, ILogService, IQService, ITimeoutService, copy, IComponentOptions} from "angular";
import {ICategory, IGameBoard, ITile, IGameEngine, IClueOptions, IClue} from "../app.interfaces";

// TODO: Convert this to a Flex layout with Bootstrap 4.
let template: string = `
    <div class="game-board">
        <table class="table">
            <thead>
                <tr scope="col" class="row">
                    <th 
                        class="col-md tile-header align-middle align-content-center"
                        ng-repeat="category in $ctrl.categories track by category.id">
                        <span>{{ ::category.title.trim() }}</span>
                    </th>                
                </tr>
                <tr><td colspan="6" class="spacer">&nbsp;</td></tr>
            </thead>                
            <tbody>
                <tr ng-repeat="tiles in $ctrl.gameBoard track by $index" class="row">
                    <td 
                        ng-repeat="tile in tiles track by $index"
                        class="col-md tile align-middle align-content-center"
                        ng-click="$ctrl.getClue({ value: tile.value, category: tile.category.id })">
                        <div class="tile-title text-center"><span>{{ ::tile.title.trim() }}</span></div>
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
        '$q',
        '$log',
        '$timeout',
        'gameEngine',
        '$uibModal'
    ];

    private $q: IQService;
    private gameEngine: IGameEngine;
    private $log: ILogService;
    private $timeout: ITimeoutService;
    private $uibModal: any;

    categories: Array<ICategory> = [];
    gameBoard: Array<ITile> = [];
    clueValues: Array<number> = [200, 400, 600, 800, 1000];
    currentClue: IClue = null;

    constructor(
        $q: IQService,
        $log: ILogService,
        $timeout: ITimeoutService,
        gameEngine: IGameEngine,
        $uibModal: any
    ) {
        this.gameEngine = gameEngine;
        this.$log = $log;
        this.$q = $q;
        this.$timeout = $timeout;
        this.$uibModal = $uibModal;
    }

    /**
     * AngularJS initialization hook. In this case, it builds the game board.
     */
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

    /**
     * Gets a single clue by category & value.
     * @param {IClueOptions} clue An IClueOptions object that represents the category & values chosen.
     */
    getClue(clue: IClueOptions): void {
        this.$uibModal
            .open({
                animation: false,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                windowClass: 'clue-window',
                component: 'clue',
                size: 'lg',
                resolve: {
                    clue: () => {
                        return this.gameEngine.getClues(clue);
                    }
                }
            })
            .result
            .then((selectedTile: any) => {
                this.$log.info('selectedTile: ', selectedTile);
            });
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