import gameEngine from './services/gameEngine.factory';
import homeComponent from './components/home.component';
import gameBoardComponent from './components/gameBoard.component';
import gameTileComponent from './components/gameTile.component';

configuration.$inject = ['$stateProvider', '$urlRouterProvider'];
function configuration($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state({
            name: 'home',
            url: '/',
            component: 'homeComponent'
        });

    $urlRouterProvider.otherwise('/');
}

angular
    .module('jeopardyApp', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ngSanitize'])
    .config(configuration)
    .factory('gameEngine', gameEngine)
    .component('homeComponent', homeComponent)
    .component('gameBoardComponent', gameBoardComponent)
    .component('gameTileComponent', gameTileComponent);