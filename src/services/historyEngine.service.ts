import { ILogService, copy } from "angular";
import { IConstantsService } from "./constants.service";
import { IGameEngine } from "../app.interfaces";

export interface IHistory {
    type: string;
    playerName: string;
    score: number;
    previousScore: number;
    clue: any;
    currentRound: number;
    hasAttemptedToAnswer: boolean;
}

export interface IHistoryEngine {
    history: Array<IHistory>;
    addHistoryItem(type: string): void
}

export default class HistoryEngineService implements IHistoryEngine {
    static readonly $inject: Array<string> = ['$log', 'constants', 'gameEngine'];

    private $log: ILogService;
    private constants: IConstantsService;
    private gameEngine: IGameEngine;

    history: Array<IHistory>;

    constructor(
        $log: ILogService,
        constants: IConstantsService,
        gameEngine: IGameEngine
    ) {
        this.$log = $log;
        this.constants = constants;
        this.gameEngine = gameEngine;

        this.reset();
    }

    addHistoryItem(type: string = this.constants.HISTORY_TYPE.GENERIC): void {
        let item = {
            'type': type,
            'playerName': this.gameEngine.playerName,
            'score': this.gameEngine.currentScore || 0,
            'previousScore': this.gameEngine.previousScore || 0,
            'currentRound': this.gameEngine.currentRound || this.constants.ROUNDS.JEOPARDY,
            'clue': this.gameEngine.currentClue,
            'hasAttemptedToAnswer': this.gameEngine.hasAttemptedToAnswer
        };

        this.history.push(item);
        this.$log.info('HISTORY: Item Added: ', item);
    }

    reset(): void {
        this.history = [];
        this.$log.info('HISTORY: Reset');
    }
}