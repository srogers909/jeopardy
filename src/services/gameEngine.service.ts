import {IHttpService, ILogService, IQService} from "angular";

export interface IGameEngine {
    isGameRunning: boolean;
    isDoubleJeopardy: boolean;
    currentCategories: Array<any>;
    buildGame(): any;
    startGame(): any;
    getClues(options?: IClueOptions): any;
    getRandomClue(): any;
    getCategories(count: number): any;
    getCategory(id: number): any;
}

export interface IClueOptions {
    value?: number;
    category?: number;
    min_date?: Date;
    max_date?: Date;
}

export default class GameEngine implements IGameEngine {
    static $inject: string[] = ['$q', '$log', '$http'];

    private HOST: string = 'http://jservice.io/api';
    private $http: IHttpService;
    private $log: ILogService;
    private $q: IQService;

    isGameRunning: boolean = false;
    isDoubleJeopardy: boolean = false;
    currentCategories: Array<any>;

    constructor($q: IQService, $log: ILogService, $http: IHttpService) {
        this.$http = $http;
        this.$log = $log;
        this.$q = $q;
    }

    buildGame(): any {
        return this.getCategories(6);
    }

    startGame(): any {
        this.isGameRunning = true;
    }

    // value(int): the value of the clue in dollars
    // category(int): the id of the category you want to return
    // min_date(date): earliest date to show, based on original air date
    // max_date(date): latest date to show, based on original air date
    // offset(int): offsets the returned clues. Useful in pagination
    getClues(options?: IClueOptions): any {
        let url: string = `${this.HOST}/clues`;

        if (options) {
            url += '?';

            if (options.value) {
                url += `value=${options.value}&`;
            }

            if (options.category) {
                url += `category=${options.category}&`;
            }
        }

        return this.$http.get(url);
    }

    getRandomClue(): any {
        return this.$http.get(`${this.HOST}/random`);
    }

    getCategories(count: number): any {
        return this.$http.get(`${this.HOST}/categories?count=${count}&offset=${Math.floor((Math.random() * 2000) + 1)}`);
    }

    getCategory(id: number): any {
        return this.$http.get(`${this.HOST}/category?id=${id}`);
    }
}
