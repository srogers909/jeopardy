import {IHttpService, ILogService, IQService, IPromise} from "angular";
import {IGameEngine, IClueOptions} from "../app.interfaces";

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

    startGame(): any {
        this.isGameRunning = true;
    }

    // value(int): the value of the clue in dollars
    // category(int): the id of the category you want to return
    // min_date(date): earliest date to show, based on original air date
    // max_date(date): latest date to show, based on original air date
    // offset(int): offsets the returned clues. Useful in pagination
    getClues(options?: IClueOptions): IPromise<any> {
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

    getRandomClue(): IPromise<any> {
        return this.$http.get(`${this.HOST}/random`);
    }

    getCategories(count: number): IPromise<any> {
        return this.$http.get(`${this.HOST}/categories?count=${count}&offset=${Math.floor((Math.random() * 2000) + 1)}`);
    }

    getCategory(id: number): IPromise<any> {
        return this.$http.get(`${this.HOST}/category?id=${id}`);
    }
}
