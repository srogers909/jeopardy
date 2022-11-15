import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { GameEngineService } from './game-engine.service';

xdescribe('GameEngineService', () => {
  let service: GameEngineService, httpClient: HttpClient;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient
      ]
    });
    service = TestBed.inject(GameEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
