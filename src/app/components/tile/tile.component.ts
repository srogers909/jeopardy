import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ICategory, IClue} from "../../interfaces"
import {CoreModule} from "../../services/core.module"
import { AppSettings } from 'src/app/constants'

@Component({
  selector: 'tile',
  standalone: true,
  imports: [
    CommonModule,
    CoreModule
  ],
  styleUrls: ['./tile.component.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="tile" [ngClass]="{'category': tileType === 'category', 
    'price': tileType === 'price', 'question': tileType === 'question'}" aria-label="Tile" (click)="handleClick(clue)">
      <div *ngIf="tileType && tileType === 'category'; then categoryTemplate"></div>
      <div *ngIf="tileType && tileType === 'price'; then priceTemplate"></div>
      <div *ngIf="tileType && tileType === 'question'; then questionTemplate"></div>
      <div *ngIf="tileType && tileType === 'blank'; then blankTemplate"></div>

      <ng-template #questionTemplate>
        <div class="question">
          {{clue && clue['question']}}
        </div>
      </ng-template>


      <ng-template #priceTemplate>
        <div class="price">
          {{convertPrice(price)}}
        </div>
      </ng-template>


      <ng-template #categoryTemplate>
        <div class="category">
          {{category && category.title}}
        </div>
      </ng-template>

      <ng-template #blankTemplate>
        <div>
          &nbsp;
        </div>
      </ng-template>
    </div>
  `,

})
export class TileComponent implements OnChanges {
  @Input() clue: IClue;
  @Input() category?: ICategory = undefined;
  @Input() tileType?: string = AppSettings.TILE_TYPES.PRICE;
  @Input() isSolved?: boolean = false;
  @Input() price?: number = 0;

  @Output() tileClicked = new EventEmitter<IClue>();

  type: string;

  constructor(
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['clue'] && changes['clue'].currentValue) {

    }
  }

  convertPrice(price: number = 0): string {
    return `$${price}`;
  }

  handleClick(clue: IClue) {
    this.tileType = 'blank';
    this.tileClicked.emit(clue);
  }
}
