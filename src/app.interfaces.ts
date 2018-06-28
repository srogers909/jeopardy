export interface ITile {
    title: String;
    category: Object;
    value: Number;
}

export interface IGameBoard {

}

export interface IModalBindings {
    modalInstance: any;
    resolve?: any;
}

export interface ICategory {
    id: Number;
    title: String;
    clues_count?: Number;
}

export interface IClue {
    question: String;
    answer: String;
    category: ICategory;
    value: Number;
    invalid_count?: Number;
}

export interface IGameEngine {
    isGameRunning: boolean;
    isDoubleJeopardy: boolean;
    currentCategories: Array<any>;
    currentClue: any;
    hasAttemptedToAnswer: boolean;
    currentScore: number;
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