export interface IConstantsService {
    NO_ANSWER: number;
    CORRECT: number;
    WRONG: number;
}

export default class ConstantsService implements IConstantsService {
    NO_ANSWER: number;
    CORRECT: number;
    WRONG: number;

    constructor() {
        this.NO_ANSWER = 0;
        this.CORRECT = 1;
        this.WRONG = 2;
    }
}