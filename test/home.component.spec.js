
import { HomeController } from '../src/components/home.component';


describe('do some coooool tests', () => {

    let $log = null, GameEngine = null, $controller = null,
        ctrl = null;

    beforeEach(() => {
        angular.mock.module('jeopardyApp');

        angular.mock.inject((
            _$log_,
            _$controller_,
            _GameEngine_
        ) => {
            $log = _$log_;
            $controller = _$controller_;
            GameEngine = _GameEngine_;
        });
    });

    function createController() {
        ctrl = $controller(HomeController, {
            $log: $log,
            gameEngine: GameEngine
        });
    }

    it('should be active', () => {
        createController();

        expect(ctrl).toBeDefined();
        expect(1+2).toEqual(3);
        expect(HomeController).toBeDefined();
    });






});