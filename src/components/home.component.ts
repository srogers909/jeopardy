import {IComponentController, ILogService, ITimeoutService} from "angular";
import {IGameEngine} from "../app.interfaces";

let componentTemplate: string = `
<div class="home">
    <div class="row" >
        <div class="col-2">&nbsp;</div>
        <div class="col-8">
            <div class="title-screen" >
                <h1>Jeopardy!</h1>
                <div ng-if="!$ctrl.GameEngine.isGameRunning">                    
                    <p>A game made with love using AngularJS, Webpack & Typescript.</p>
                    <button
                        class="btn btn-primary"
                        ng-click="$ctrl.GameEngine.startGame()">Start Game</button>
                </div>
                <div ng-if="$ctrl.GameEngine.isGameRunning">
                    <ng-form
                        name="nameForm"
                        id="nameForm"
                        novalidate>
                        
                        <div class="input-group">
                            <input
                                type="text"
                                class="form-control"
                                ng-model="$ctrl.GameEngine.Name"
                                placeholder="Enter your name"
                                required />
                            <span class="input-group-btn">
                                <button
                                    class="btn btn-primary"
                                    ng-click="$ctrl.go()">Go!</button>
                            </span>
                        </div>
                    </ng-form>
                </div>
            </div>
        </div>
        <div class="col-2">&nbsp;</div>        
    </div>       
</div>
`;

export interface iHome {
}

export class HomeController implements IComponentController, iHome {
    static $inject: string[] = ['$log', 'gameEngine', '$state', '$timeout'];

    private $log: ILogService;
    private readonly $timeout: ITimeoutService;
    private GameEngine: IGameEngine;
    private $state: any;

    constructor(
        $log: ILogService,
        gameEngine: IGameEngine,
        $state: any,
        $timeout: ITimeoutService
    ) {
        this.$log = $log;
        this.$state = $state;
        this.$timeout = $timeout;
        this.GameEngine = gameEngine;
    }

    go(): any {
        this.$timeout(() => {
            this.$state.go('gameBoard');
        }, 0, false);
    }
}

export default {
    bindings: {},
    controller: HomeController,
    template: componentTemplate
}
