import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ICategory, IClue, IClueOptions} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private HOST: string = 'http://jservice.io/api';

  constructor(private httpClient: HttpClient) {
  }

  getCategories(count: number = 1): Observable<Array<ICategory>> {
    return this.httpClient.get<Array<ICategory>>
      (`${this.HOST}/categories?count=${count}&offset=${Math.floor((Math.random() * 2500) + 1)}`);
  }

  getCategoryAndClues(categoryId: number): Observable<ICategory> {
    return this.httpClient.get<ICategory>(`${this.HOST}/category?id=${categoryId}`);
  }

  getRandomClue(): Observable<IClue> {
    return this.httpClient.get<IClue>(`${this.HOST}/random`);
  }

  getFinal(): Observable<IClue> {
    return this.httpClient.get<IClue>(`${this.HOST}/final`);
  }

  getClues(options?: IClueOptions): Observable<Array<IClue>> {
    let url: string = `${this.HOST}/clues`;

    if (options) {
      url += '?'

      if (options.value) {
        url += `value=${options.value}&`
      }
      if (options.category) {
        url += `category=${options.category}&`
      }
      if (options.offset) {
        url += `offset=${options.offset}&`
      }
      if (options.max_date) {
        url += `max_date=${options.max_date}&`
      }
      if (options.min_date) {
        url += `min_date=${options.min_date}`
      }
    }

    return this.httpClient.get<Array<IClue>>(url);
  }
}
