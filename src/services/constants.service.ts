export default class ConstantsService {
    answerStatus: any;

    constructor() {
        this.answerStatus = {
            'NO_ANSWER': 0,
            'CORRECT': 1,
            'WRONG': 2,
        }
    }
}