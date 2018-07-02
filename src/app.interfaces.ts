export interface ITile {
    title: string;
    category: object;
    value: number;
    isActive: boolean
}

export interface IGameBoard {

}

export interface IModalBindings {
    modalInstance: any;
    resolve?: any;
}

export interface ICategory {
    id: number;
    title: string;
    clues_count?: number;
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
    isRoundOver: boolean;
    isDoubleJeopardy: boolean;
    isFinalJeopardy: boolean;
    currentClue: any;
    currentRound: any;
    hasAttemptedToAnswer: boolean;
    currentScore: number;
    previousScore: number;
    tilesPlayed: number;
    playerName: string;
    startGame(): any;
    buildGameBoard(): void;
    getClues(value: number, category: number): any;
    getRandomClue(): any;
    getCategories(count: number): any;
    getCategory(id: number): any;
    addScore(): void;
    subtractScore(): void;
    roundOver(): void;
    initializeGame(): void;
}

export interface IClueOptions {
    value?: number;
    category?: number;
    min_date?: Date;
    max_date?: Date;
}