import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameEngineService {
  score: number = 0;


  constructor() { }
}
