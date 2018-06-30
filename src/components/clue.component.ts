import {IComponentController, IComponentOptions, ILogService, ISCEService, IScope} from 'angular';
import {IGameEngine, IModalBindings} from '../app.interfaces';
import {IConstantsService} from "../services/constants.service";

export default class ClueComponent implements IComponentOptions {
    bindings: any;
    controller: any;
    template: any;

    constructor() {
        this.bindings = {
            modalInstance: '<',
            resolve: '<'
        };
        this.controller = Clue;
        this.template = `
            <ng-form
                id="clueForm"
                name="clueForm"
                novalidate>
                <div class="game-tile">
                    <div class="modal-header row">
                        <div class="col-6">
                            <span class="alert-success" ng-if="$ctrl.answerStatus === $ctrl.constants.CORRECT">CORRECT ANSWER!</span>
                            <span class="alert-danger" ng-if="$ctrl.answerStatus === $ctrl.constants.WRONG">INCORRECT ANSWER</span>
                        </div>
                        <div class="score col-3">Score: \${{$ctrl.gameEngine.currentScore}}</div>
                    </div>
                    <div class="modal-body">
                        <div class="qa-container row">                        
                            <p class="col-12 question">{{::$ctrl.gameEngine.currentClue.question}}</p>
                            <p class="col-12 answer">
                                <span 
                                    ng-if="$ctrl.gameEngine.hasAttemptedToAnswer"
                                    ng-class="{" 
                                    ng-cloak>
                                    {{::$ctrl.gameEngine.currentClue.answer}}
                                </span>
                            </p>       
                        </div>             
                        <input
                            type="text"
                            required
                            class="form-control"
                            ng-model="$ctrl.answer"
                            placeholder="Type Answer Here"/>                     
                    </div>    
                    <div class="modal-footer">
                        <button
                            class="btn btn-dark float-left"
                            type="button"
                            ng-click="$ctrl.toggleAnswerStatus()">
                            <span ng-if="$ctrl.answerStatus === $ctrl.constants.CORRECT">Mark as Incorrect</span>    
                            <span ng-if="$ctrl.answerStatus !== $ctrl.constants.CORRECT">Mark as Correct</span>    
                        </button>                    
                        <button
                            class="btn btn-success" 
                            type="button" 
                            ng-click="$ctrl.attemptAnswer()"
                            ng-disabled="$ctrl.gameEngine.hasAttemptedToAnswer">Answer</button>
                        <button
                            class="btn btn-warning" type="button" ng-click="$ctrl.cancel()">Close</button>
                    </div>
                </div>
            </ng-form>`;
    }
}

class Clue implements IComponentController, IModalBindings {
    static readonly $inject: string[] = [
        '$scope',
        '$log',
        '$sce',
        'constants',
        'gameEngine'
    ];

    private $scope: IScope;
    private $log: ILogService;
    private $sce: ISCEService;
    private gameEngine: IGameEngine;
    private constants: IConstantsService;

    modalInstance: any;
    resolve: any;
    answer: string;
    answerStatus: number;

    constructor(
        $scope: IScope,
        $log: ILogService,
        $sce: ISCEService,
        constants: IConstantsService,
        gameEngine: IGameEngine
    ) {
        this.$scope = $scope;
        this.constants = constants;
        this.$log = $log;
        this.$sce = $sce;
        this.gameEngine = gameEngine;
        this.answer = null;
        this.answerStatus = this.constants.NO_ANSWER;
    }

    $onInit(): void {
        if (!this.resolve.clue.data[0]) {
            this.$log.error('Error: ', this.resolve);
            this.cancel();
        }
        //just get the first one...
        this.gameEngine.currentClue = this.resolve.clue.data[0];
        this.$log.info('this.gameEngine.currentClue: ', this.gameEngine.currentClue);
    };

    attemptAnswer(): void {
        this.gameEngine.hasAttemptedToAnswer = true;

        let correctAnswer: string = this.gameEngine.currentClue.answer.toLowerCase().trim();
        let finalAnswer: string = (this.answer) ? this.$sce.trustAsHtml(this.answer.toLowerCase().trim()) : null;

        this.gameEngine.previousScore = this.gameEngine.currentScore;

        if (correctAnswer === finalAnswer) {
            this.gameEngine.currentScore += this.gameEngine.currentClue.value;
            this.answerStatus = this.constants.CORRECT;
        } else {
            this.gameEngine.currentScore -= this.gameEngine.currentClue.value;
            this.answerStatus = this.constants.WRONG;
        }
    }

    toggleAnswerStatus(): void {
        this.gameEngine.hasAttemptedToAnswer = true;

        switch (this.answerStatus) {
            case this.constants.CORRECT:
                this.gameEngine.currentScore = this.gameEngine.previousScore - this.gameEngine.currentClue.value;
                this.answerStatus = this.constants.WRONG;
                break;
            case this.constants.WRONG:
            default:
                this.gameEngine.currentScore = this.gameEngine.previousScore + this.gameEngine.currentClue.value;
                this.answerStatus = this.constants.CORRECT;
                break;
        }
    }

    resetClue(): void {
        this.gameEngine.hasAttemptedToAnswer = false;
        this.answerStatus = this.constants.NO_ANSWER;
        this.answer = null;
    }

    cancel(): void {
        this.resetClue();
        this.modalInstance.dismiss();
    }
}