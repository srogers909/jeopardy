export interface IConstantsService {
    NO_ANSWER: number;
    CORRECT: number;
    WRONG: number;
    TILE_COUNT: number;
    ROUNDS: any;
}

export default class ConstantsService implements IConstantsService {
    NO_ANSWER: number;
    CORRECT: number;
    WRONG: number;
    TILE_COUNT: number;
    ROUNDS: any;

    constructor() {
        this.NO_ANSWER = 0;
        this.CORRECT = 1;
        this.WRONG = 2;
        this.TILE_COUNT = 29;
        this.ROUNDS = {
            'JEOPARDY': 0,
            'DOUBLE_JEOPARDY': 1,
            'FINAL_JEOPARDY': 2
        }
    }
}