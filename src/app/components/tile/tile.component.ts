import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ICategory, IClue} from "../../interfaces";
import {CoreModule} from "../../services/core.module";

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [
    CommonModule,
    CoreModule
  ],
  template: `
    <div>
      {{clue.question}}
    </div>
  `,
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {
  @Input() clue: IClue | undefined;
  @Input() category: ICategory | undefined;
  @Input() type: AppConstants | undefined;

  @Output() tileClicked = new EventEmitter<MouseEvent>();

  constructor(
  ) {
  }

  ngOnInit(): void {
  }

  handleClick(event: MouseEvent) {
    this.tileClicked.emit(event);
  }


}
