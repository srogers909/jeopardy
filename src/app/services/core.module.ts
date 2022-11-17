import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {ApiService} from "./api.service";
import {GameEngineService} from "./game-engine.service";
import { WebSpeechService } from './web-speech.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    WebSpeechService,
    GameEngineService
  ]
})
export class CoreModule { }
