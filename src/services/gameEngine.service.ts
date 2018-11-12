import {IHttpService, ILogService, IQService, IPromise, copy} from "angular";
import {IGameEngine, ICategory, IGameBoard} from "../app.interfaces";
import {IConstantsService} from "./constants.service";

export default class GameEngine implements IGameEngine {
    static $inject: string[] = ['$q', '$log', '$http', 'constants'];

    private HOST: string = 'http://jservice.io/api';

    isRoundOver: boolean;
    isDoubleJeopardy: boolean;
    isFinalJeopardy: boolean;
    clueValues: Array<number>;
    isGameRunning: boolean = false;
    currentRound: any;
    currentClue: any;
    hasAttemptedToAnswer: boolean;
    previousScore: number;
    currentScore: number;
    tilesPlayed: number;
    playerName: string;
    currentBoard: Array<any>;
    categories: Array<ICategory>;
    gameBoard: IGameBoard;

    constructor(
        private $q: IQService,
        private $log: ILogService,
        private $http: IHttpService,
        private constants: IConstantsService
    ) {
        this.$http = $http;
        this.$log = $log;
        this.$q = $q;
        this.constants = constants;

        this.initializeGame();
    }

    startGame(): any {
        this.isGameRunning = true;
        this.$log.info('EVENT: Game started');
    }

    buildGameBoard(): void {
        this.getCategories(6)
            .then((cats: any) => {
                if (!cats) {
                    this.$log.error('EVENT: Categories not retrieved.');
                    return;
                }

                let _categories = copy(cats.data);
                let board: Array<any> = [];

                /**
                 * Each category contains 5 dollar values [200, 400, 600, 800, 1000] <p/>
                 * (doubled in value during 'double jeopardy')
                 */
                for (let i: number = 0, len: number = this.clueValues.length; i < len; i++) {
                    let row = Array<any>();

                    // each categories we construct an ITile object and add to the row.
                    for (let j = 0, len = _categories.length; j < len; j++) {
                        row.push({
                            category: _categories[j],
                            value: this.clueValues[i],
                            isActive: true
                        });
                    }

                    // the row is finished... send it to the board.
                    board.push(row);
                }

                this.categories = copy(_categories);
                this.gameBoard = copy(board);

                this.$log.info('EVENT: Categories retrieved and game board built');
            });
    }

    // value(int): the value of the clue in dollars
    // category(int): the id of the category you want to return
    // min_date(date): earliest date to show, based on original air date
    // max_date(date): latest date to show, based on original air date
    // offset(int): offsets the returned clues. Useful in pagination
    getClues(value: number = null, category: number = null): IPromise<any> {
        let url: string = `${this.HOST}/clues`;

        if (value || category) {
            url += '?';
        }
        if (value) {
            url += `value=${value}&`;
        }
        if (category) {
            url += `category=${category}&`;
        }

        return this.$http.get(url);
    }

    getRandomClue(): IPromise<any> {
        return this.$http.get(`${this.HOST}/random`);
    }

    getCategories(count: number): IPromise<any> {
        return this.$http.get(`${this.HOST}/categories?count=${count}&offset=${Math.floor((Math.random() * 2500) + 1)}`);
    }

    getCategory(id: number): IPromise<any> {
        return this.$http.get(`${this.HOST}/category?id=${id}`);
    }

    addScore(): void {
        this.currentScore += this.currentClue.value;
        this.previousScore = this.currentScore;

        this.$log.info('EVENT: Score added - ', this.currentScore);
    }

    subtractScore(): void {
        this.currentScore -= this.currentClue.value;
        this.previousScore = this.currentScore;

        this.$log.info('EVENT: Score subtracted - ', this.currentScore);
    }

    roundOver(): void {
        if (this.isRoundOver && (this.currentRound === this.constants.ROUNDS.JEOPARDY)) {
            let clues: any = copy(this.clueValues);

            this.currentRound = this.constants.ROUNDS.DOUBLE_JEOPARDY;
            for (let i = 0, len = clues.length; i < len; i++) {
                clues[i] *= 2;
            }

            this.clueValues = clues;

            this.$log.info('EVENT: Round changed to "Double Jeopardy"');
        }

        if (this.isRoundOver && this.isDoubleJeopardy) {
            this.currentRound = this.constants.ROUNDS.FINAL_JEOPARDY;
            //this.buildGameBoard();

            this.$log.info('EVENT: Round changed to "Final Jeopardy"');
        }
    }

    initializeGame(): void {
        this.currentRound = this.constants.ROUNDS.JEOPARDY;
        this.isRoundOver = false;
        this.isDoubleJeopardy = false;
        this.isFinalJeopardy = false;
        this.currentBoard = [];
        this.isGameRunning = false;
        this.currentScore = 0;
        this.tilesPlayed = 0;
        this.hasAttemptedToAnswer = false;
        this.playerName = (!this.playerName) ? 'Player 1' : this.playerName;
        this.clueValues = [200, 400, 600, 800, 1000];
    }
}
