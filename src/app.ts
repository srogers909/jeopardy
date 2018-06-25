import * as angular from 'angular';

import './styles/main.scss';

import GameEngine from './services/gameEngine.service';
import HomeComponent from './components/home.component';
import GameBoardComponent from './components/gameBoard.component';
import GameTileComponent from './components/gameTile.component';

const jeopardyApp =
    angular.module('jeopardyApp', [
        'ui.router',
        'ui.bootstrap',
        'ngAnimate',
        'ngSanitize',
        'ngTouch'
    ]);

class Configuration {
    static $inject: string[] = ['$stateProvider', '$urlRouterProvider'];

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
            })
            .state({
                name: 'gameTile',
                url: '/game-tile',
                component: 'gameTile'
            });

        $urlRouterProvider.otherwise('/');
    }
}

jeopardyApp
    .config(Configuration)
    .service('gameEngine', GameEngine)
    .component('homeComponent', new HomeComponent)
    .component('gameBoard', new GameBoardComponent)
    .component('gameTile', new GameTileComponent);

export default jeopardyApp;



