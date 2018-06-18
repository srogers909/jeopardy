let template = ``;

class GameTile {
    constructor($log) {
        $log.info('Game Tile Initialized');
    }
}

GameTile.$inject = ['$log'];

export default {
    bindings: {},
    controller: GameTile,
    template: template
};