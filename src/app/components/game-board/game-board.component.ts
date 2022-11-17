import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameEngineService} from "../../services/game-engine.service";
import {CoreModule} from "../../services/core.module";
import {TileComponent} from "../tile/tile.component";
import {ICategory, IClue, IGameBoard, ITileOptions, ModalConfig} from "../../interfaces";
import {BehaviorSubject, take, takeUntil} from "rxjs";
import { AppSettings } from 'src/app/constants';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { WebSpeechService } from 'src/app/services/web-speech.service';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [
    CommonModule,
    CoreModule,
    NgbModalModule,
    TileComponent,
    ModalComponent
  ],
  styleUrls: ['./game-board.component.scss'],
  template: `
    <div class="game-board">
      <table style="width:100%;height:100%">
        <thead>
          <tr>
            <th *ngFor="let category of clueStore">
              <tile [clue]="{}" [category]="category" [tileType]="'category'"></tile>
            </th>
          </tr>  
        </thead>
        <tbody>      
          <tr *ngFor="let row of engine.clueValues; let i = index">
            <td *ngFor="let clue of clueBoard && clueBoard[i]">
              <tile 
                [category]="clue.category" 
                [tileType]="'price'" 
                [clue]="clue" 
                [price]="clue.value"
                (tileClicked)="captureClueClick(clue)"></tile>
            </td>
          </tr>
        </tbody>
      </table>

      <modal #modal [modalConfig]="modalConfig">
        <div>{{currentClue.question}}</div>
      </modal>
    </div>
  `
})
export class GameBoardComponent implements OnInit, OnDestroy {
  @ViewChild('modal') private modalComponent: ModalComponent
  
  private destroyer$: BehaviorSubject<any>;

  clueBoard: [Array<IClue>, Array<IClue>, Array<IClue>, Array<IClue>, Array<IClue>];
  clueStore: Array<ICategory>;
  isDoubleJeopardy: boolean = false;
  clueRowCount = new Array<number>(5);
  engine: GameEngineService;
  modalConfig: ModalConfig = { modalTitle: '' };
  currentClue: IClue;

  constructor(
    private _gameEngine: GameEngineService,
    private webSpeechService: WebSpeechService,
    private modalService: NgbModal
  ) {
    this.destroyer$ = new BehaviorSubject<any>(null);
    this.engine = _gameEngine;
    this.clueStore = [];
    this.currentClue = {}
    this.webSpeechService.init();
  }

  private setUpGameBoard() {
    this.engine.setUpBoard()
      .pipe(take(1))
      .subscribe(
        {
          next: (board: any) => {
            this.clueStore = board[0];
            this.clueBoard = board[1];
            
          },
          error: (err) => {
            // todo
          }
        }
      );
  }

  captureClueClick(clue: IClue) {    
    
    this.currentClue = this.engine.getClueFromClueStore(clue, this.clueStore);

    if (this.currentClue && this.currentClue.question) {
      this.modalConfig = {
        modalTitle: this.currentClue.question,
        dismissButtonLabel: 'Give Up',
        closeButtonLabel: 'Solve'
      }

      // answer w/ button click maybe?
      this.webSpeechService.start();

      this.openModal()
        .then(result => {
          console.log('closed:', result)
        })
    }

    console.log('this.currentClue:', this.currentClue)
  }

  async openModal() {
    return await this.modalComponent.open()
  }

  ngOnInit(): void {
    this.setUpGameBoard();
  }

  ngOnDestroy() {
    this.destroyer$.next(true);
    this.destroyer$.complete();
  }


}
