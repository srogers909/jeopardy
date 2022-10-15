import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {hot} from "jest-marbles";

describe('ApiServiceService', () => {
  let service: ApiService, httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpHandler,
        HttpClient
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(ApiService);
  });

  describe('getCategories() Test Suite', () => {
    describe('When the user makes a request for categories', () => {
      test('it should return an array of ICategory items', () => {
        const returnVal = hot('---a---|', {a: []});
        jest.spyOn(httpClient, 'get').mockReturnValue(returnVal);
        expect(service.getCategories()).toBeObservable(returnVal);
        expect(httpClient.get).toHaveBeenCalled();
      })

      test('it should FAIL to return an array of ICategory items', () => {
        const returnVal = hot('---#');
        jest.spyOn(httpClient, 'get').mockReturnValue(returnVal);

        let result = service.getCategories();

        expect(result).toBeObservable(returnVal);
        expect(result).toBeMarble('---#');
        expect(httpClient.get).toHaveBeenCalled();
      });
    });
  });

  describe('getCategory() Test Suite', () => {
    describe('When the user makes a request for a single category', () => {
      test('it should return a single ICategory item', () => {
        const returnVal = hot('---a---|', {a: []});
        jest.spyOn(httpClient, 'get').mockReturnValue(returnVal);
        expect(service.getCategory(29)).toBeObservable(returnVal);
        expect(httpClient.get).toHaveBeenCalled();
      });

      test('it should FAIL to return an array of ICategory items', () => {
        const returnVal = hot('---#');
        jest.spyOn(httpClient, 'get').mockReturnValue(returnVal);

        let result = service.getCategory(29);

        expect(result).toBeObservable(returnVal);
        expect(result).toBeMarble('---#');
        expect(httpClient.get).toHaveBeenCalled();
      });
    });
  });

  describe('getRandomClue() Test Suite', () => {
    describe('When the user makes a request for a single random clue', () => {
      test('it should return a single random IClue item', () => {
        const returnVal = hot('---a---|', {a: {}});
        jest.spyOn(httpClient, 'get').mockReturnValue(returnVal);
        expect(service.getRandomClue()).toBeObservable(returnVal);
        expect(httpClient.get).toHaveBeenCalled();
      });

      test('it should FAIL to return a single random IClue item', () => {
        const returnVal = hot('---#');
        jest.spyOn(httpClient, 'get').mockReturnValue(returnVal);

        let result = service.getRandomClue();

        expect(result).toBeObservable(returnVal);
        expect(result).toBeMarble('---#');
        expect(httpClient.get).toHaveBeenCalled();
      });
    });
  });

  describe('getFinal() Test Suite', () => {
    describe('When the user makes a request for a FINAL clue', () => {
      test('it should return a single IClue item', () => {
        const returnVal = hot('---a---|', {a: {}});
        jest.spyOn(httpClient, 'get').mockReturnValue(returnVal);
        expect(service.getFinal()).toBeObservable(returnVal);
        expect(httpClient.get).toHaveBeenCalled();
      });

      test('it should FAIL to return a single IClue item', () => {
        const returnVal = hot('---#');
        jest.spyOn(httpClient, 'get').mockReturnValue(returnVal);

        let result = service.getFinal();

        expect(result).toBeObservable(returnVal);
        expect(result).toBeMarble('---#');
        expect(httpClient.get).toHaveBeenCalled();
      });
    });
  });

  describe('getClues() Test Suite', () => {
    describe('When the user makes a request for a list of clues', () => {
      test('it should return an array of IClue items', () => {
        const returnVal = hot('---a---|', {a: []});
        jest.spyOn(httpClient, 'get').mockReturnValue(returnVal);
        expect(service.getClues()).toBeObservable(returnVal);
        expect(httpClient.get).toHaveBeenCalled();
      });

      test('it should FAIL to return an array of IClue items', () => {
        const returnVal = hot('---#');
        jest.spyOn(httpClient, 'get').mockReturnValue(returnVal);

        let result = service.getClues();

        expect(result).toBeObservable(returnVal);
        expect(result).toBeMarble('---#');
        expect(httpClient.get).toHaveBeenCalled();
      });

      describe('and the value is 200', () => {
        test('it should return a single IClue item', () => {
          const returnVal = hot('---a---|', {a: {'value': 200}});
          jest.spyOn(httpClient, 'get').mockReturnValue(returnVal);

          let result = service.getClues(200);

          expect(result).toBeObservable(returnVal);
          expect(httpClient.get).toHaveBeenCalled();
        })
      })

      describe('and the value is 200 while category id is 40', () => {
        test('it should return a single IClue item', () => {
          const returnVal = hot('---a---|', {a: {'value': 200, 'category': {'id': 40}}});
          jest.spyOn(httpClient, 'get').mockReturnValue(returnVal);

          let result = service.getClues(200, 40);

          expect(result).toBeObservable(returnVal);
          expect(httpClient.get).toHaveBeenCalled();
        })
      })
    });
  });
});
