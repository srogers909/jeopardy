export interface IConstantsService {
    NO_ANSWER: number;
    CORRECT: number;
    WRONG: number;
    TILE_COUNT: number;
    ROUNDS: any;
    TILE_TYPE: any;
    HISTORY_TYPE: any;
}

export default class ConstantsService implements IConstantsService {
    NO_ANSWER: number;
    CORRECT: number;
    WRONG: number;
    TILE_COUNT: number;
    ROUNDS: any;
    TILE_TYPE: any;
    HISTORY_TYPE: any;

    constructor() {
        this.NO_ANSWER = 0;
        this.CORRECT = 1;
        this.WRONG = 2;
        this.TILE_COUNT = 29;
        this.ROUNDS = {
            'JEOPARDY': 0,
            'DOUBLE_JEOPARDY': 1,
            'FINAL_JEOPARDY': 2
        };
        this.TILE_TYPE = {
            'CLUE': 0,
            'CATEGORY': 1
        };
        this.HISTORY_TYPE = {
            'GENERIC': 'Generic Unknown Event',
            'GAME_START': 'Game Started',
            'GAME_END': 'Game Ended',
            'GAIN_SCORE': 'Gained Score',
            'LOSS_SCORE': 'Lost Score',
            'ROUND_CHANGE': 'Round Changed',
            'REVERT': 'Revert'
        }
    }
}