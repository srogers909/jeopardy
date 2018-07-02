import {module} from 'angular';
import uiRouter from '@uirouter/angularjs';
import * as ngAnimate from 'angular-animate';
import * as ngSanitize from 'angular-sanitize';
import * as ngTouch from 'angular-touch';
import * as uiBootstrap from 'angular1-ui-bootstrap4';

import './styles/main.scss';

import ConstantsService from './services/constants.service';
import GameEngine from './services/gameEngine.service';
import HistoryEngine from './services/historyEngine.service';
import HomeComponent from './components/home.component';
import GameBoardComponent from './components/gameBoard.component';
import ClueComponent from './components/clue.component';
import TileComponent from './components/tile.component';
import ScoreboardComponent from "./components/scoreboard.component";

const jeopardyApp =
    module('jeopardyApp', [
        uiRouter,
        uiBootstrap,
        ngAnimate,
        ngSanitize,
        ngTouch
    ]);

class Configuration {
    static $inject: Array<string> = ['$stateProvider', '$urlRouterProvider', '$compileProvider'];

    constructor($stateProvider, $urlRouterProvider, $compileProvider) {
        $compileProvider.debugInfoEnabled(true);

        $stateProvider
            .state({
                name: 'home',
                url: '/',
                component: 'homeComponent'
            })
            .state({
                name: 'gameBoard',
                url: '/game-time',
                component: 'gameBoard',
            })
            .state('scoreBoard', {
                views: {
                    'top': 'scoreBoard'
                }
            });

        $urlRouterProvider.otherwise('/');
    }
}

jeopardyApp
    .config(Configuration)
    .service('constants', ConstantsService)
    .service('gameEngine', GameEngine)
    .service('historyEngine', HistoryEngine)
    .component('homeComponent', new HomeComponent)
    .component('tile', new TileComponent)
    .component('gameBoard', new GameBoardComponent)
    .component('scoreBoard', new ScoreboardComponent)
    .component('clue', new ClueComponent);

export default jeopardyApp;



