import { TestBed } from '@angular/core/testing';

import { WebSpeechService } from './web-speech.service';

xdescribe('WebSpeechService', () => {
  let service: WebSpeechService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebSpeechService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
