import {IComponentController, IComponentOptions, ILogService} from 'angular';
import {IGameEngine, IModalBindings} from '../app.interfaces';
import { IConstantsService } from "../services/constants.service";

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
            <div class="game-tile">
                <div class="modal-header row">                
                    <div class="category-title col-3">Category: {{::$ctrl.gameEngine.currentClue.category.title}}</div>
                    <div class="col-6">
                        <span class="alert-success" ng-if="$ctrl.answerStatus === $ctrl.constants.CORRECT">CORRECT ANSWER!</span>
                        <span class="alert-danger" ng-if="$ctrl.answerStatus === $ctrl.constants.INCORRECT">INCORRECT ANSWER</span>
                    </div>
                    <div class="score col-3">Score: \${{::$ctrl.gameEngine.currentScore}}</div>
                </div>
                <div class="modal-body">
                    <div class="qa-container">                        
                        <p class="question">{{::$ctrl.gameEngine.currentClue.question}}</p>
                        <p class="answer" ng-if="$ctrl.gameEngine.hasAttemptedToAnswer">
                            {{::$ctrl.lowerTrim($ctrl.gameEngine.currentClue.answer)}}
                        </p>       
                    </div>             
                    <input
                        type="text"
                        class="form-control"
                        ng-model="$ctrl.answer"
                        placeholder="Type Answer Here"/>                     
                </div>    
                <div class="modal-footer">                    
                    <button
                        class="btn btn-success" type="button" ng-click="$ctrl.attemptAnswer()">Answer</button>
                    <button
                        class="btn btn-warning" type="button" ng-click="$ctrl.cancel()">Cancel</button>
                </div>
            </div>`;
    }
}

class Clue implements IComponentController, IModalBindings {
    static readonly $inject: string[] = [
        '$log',
        'constants',
        'gameEngine'
    ];

    private $log: ILogService;
    private gameEngine: IGameEngine;
    private constants: IConstantsService;
    private log: any;

    modalInstance: any;
    resolve: any;
    answer: string;
    answerStatus: number;

    constructor(
        $log: ILogService,
        constants: IConstantsService,
        gameEngine: IGameEngine
    ) {
        this.$log = $log;
        this.gameEngine = gameEngine;
        this.answer = null;
        this.log = this.$log.info;
        this.answerStatus = this.constants.NO_ANSWER;
    }

    lowerTrim(answer: string): string {
        return answer.toLowerCase().trim();
    }

    $onInit(): void {
        if (!this.resolve.clue.data[0]) this.cancel();

        this.gameEngine.currentClue = this.resolve.clue.data[0]; //just get the first one...
    };

    attemptAnswer(): void {
        this.gameEngine.hasAttemptedToAnswer = true;

        let correctAnswer: string = this.lowerTrim(this.gameEngine.currentClue.answer);
        let finalAnswer: string = this.lowerTrim(this.answer);

        if (correctAnswer === finalAnswer) {
            this.gameEngine.currentScore += this.gameEngine.currentClue.value;
            this.answerStatus = this.constants.CORRECT;
        } else {
            this.gameEngine.currentScore -= this.gameEngine.currentClue.value;
        }
    }



    cancel(): void {
        this.modalInstance.dismiss('cancel');
    }
}