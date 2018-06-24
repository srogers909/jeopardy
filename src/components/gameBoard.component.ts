import {IComponentController, ILogService} from "angular";
import {IGameEngine} from "../services/gameEngine.service";

let template: string = `
    <div class="game-board">
        <table class="table table-bordered table-responsive">
            <tr>
                <th 
                    class="tile"
                    ng-repeat="category in $ctrl.gameEngine.currentCategories track by category.id">{{ category.title }}</th>                
            </tr>
            <tr><td colspan="6" class="spacer">&nbsp;</td></tr>
            <tr ng-repeat="cat in $ctrl.board track by cat.category.id">
                <td 
                    class="tile"
                    ng-click="$ctrl.gameEngine.getClues({ value: , category: cat.category.id })"
                    ng-repeat="clueValue in cat.clues track by $index">{{ ::clueValue }}</td>
            </tr>
        </table>
    </div>
`;

export interface IGameBoard {
}

class GameBoard implements IComponentController, IGameBoard {
    static $inject: string[] = ['$log', 'gameEngine'];

    private gameEngine: IGameEngine;
    private $log: ILogService;

    gameBoard: Array<any> = [];
    board: Array<any> = [];
    clueValues = [200, 400, 600, 800, 1000];

    constructor($log: ILogService, gameEngine: IGameEngine) {
        this.gameEngine = gameEngine;
        this.$log = $log;



        this.gameEngine.getCategories(6)
            .then((categories) => {
                this.gameEngine.currentCategories = categories.data;



                for (let i = 0, len = this.gameEngine.currentCategories.length; i < len; i++) {
                    let category = this.gameEngine.currentCategories[i];

                    this.board.push({
                        category: category,
                        clues: this.clueValues
                    });
                }

                console.log(this.board);
            });
    }


    builder(): void {
        for (var i = 0; i < 5; i++) {



        }
    }

}

export default {
    bindings: {},
    controller: GameBoard,
    template: template
};