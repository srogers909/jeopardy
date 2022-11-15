import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameEngineService} from "../../services/game-engine.service";
import {CoreModule} from "../../services/core.module";
import {TileComponent} from "../tile/tile.component";
import {ICategory, IClue, IGameBoard, ITileOptions} from "../../interfaces";
import {BehaviorSubject, take, takeUntil} from "rxjs";
import { AppSettings } from 'src/app/constants';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [
    CommonModule,
    CoreModule,
    TileComponent
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
    </div>
  `
})
export class GameBoardComponent implements OnInit, OnDestroy {
  private destroyer$: BehaviorSubject<any>;

  clueBoard: [Array<IClue>, Array<IClue>, Array<IClue>, Array<IClue>, Array<IClue>];
  clueStore: Array<ICategory>;
  isDoubleJeopardy: boolean = false;
  clueRowCount = new Array<number>(5);
  engine: GameEngineService;

  constructor(
    private _gameEngine: GameEngineService,
  ) {
    this.destroyer$ = new BehaviorSubject<any>(null);
    this.engine = _gameEngine;
    this.clueStore = [];
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
    const newClue: IClue = this.engine.getClueFromClueStore(clue, this.clueStore);

    console.log('newClue:', newClue)
  }

  ngOnInit(): void {
    this.setUpGameBoard();
  }

  ngOnDestroy() {
    this.destroyer$.next(true);
    this.destroyer$.complete();
  }


}
