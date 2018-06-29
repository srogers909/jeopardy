import {module} from 'angular';
import uiRouter from '@uirouter/angularjs';
import * as ngAnimate from 'angular-animate';
import * as ngSanitize from 'angular-sanitize';
import * as ngTouch from 'angular-touch';
import * as uiBootstrap from 'angular1-ui-bootstrap4';

import './styles/main.scss';

import ConstantsService from './services/constants.service';
import GameEngine from './services/gameEngine.service';
import HomeComponent from './components/home.component';
import GameBoardComponent from './components/gameBoard.component';
import ClueComponent from './components/clue.component';
import TileComponent from './components/tile.component';

const jeopardyApp =
    module('jeopardyApp', [
        uiRouter,
        uiBootstrap,
        ngAnimate,
        ngSanitize,
        ngTouch
    ]);

class Configuration {
    static $inject: Array<string> = ['$stateProvider', '$urlRouterProvider'];

    constructor($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state({
                name: 'home',
                url: '/',
                component: 'homeComponent'
            })
            .state({
                name: 'gameBoard',
                url: '/game-time',
                component: 'gameBoard'
            });

        $urlRouterProvider.otherwise('/');
    }
}

jeopardyApp
    .config(Configuration)
    .service('constants', ConstantsService)
    .service('gameEngine', GameEngine)
    .component('homeComponent', new HomeComponent)
    .component('tile', new TileComponent)
    .component('gameBoard', new GameBoardComponent)
    .component('clue', new ClueComponent);

export default jeopardyApp;



