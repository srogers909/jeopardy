let template = ``;

class GameBoard {
    constructor($log) {
        $log.info('Game Board Initialized');
    }
}

GameBoard.$inject = ['$log'];

export default {
    bindings: {},
    controller: GameBoard,
    template: template
};