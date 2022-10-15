import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GameEngineService} from "../../services/game-engine.service";
import {CoreModule} from "../../services/core.module";

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [
    CommonModule,
    CoreModule
  ],
  template: `
    <p>
      game-board works!
    </p>
  `,
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  private engine: GameEngineService;

  constructor(
    private gameEngine: GameEngineService
  ) {
    this.engine = gameEngine;
  }

  ngOnInit(): void {
  }

}
