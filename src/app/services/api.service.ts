import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ICategory, IClue} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http: HttpClient;
  private HOST: string = 'https://jservice.io/api';

  constructor(private httpClient: HttpClient) {
    this.http = httpClient;
  }

  getCategories(count: number = 1): Observable<Array<ICategory>> {
    return this.http.get<Array<ICategory>>
      (`${this.HOST}/categories?count=${count}&offset=${Math.floor((Math.random() * 2500) + 1)}`);
  }

  getCategory(id: number): Observable<ICategory> {
    return this.http.get<ICategory>(`${this.HOST}/category?id=${id}`);
  }

  getRandomClue(): Observable<IClue> {
    return this.http.get<IClue>(`${this.HOST}/random`);
  }

  getFinal(): Observable<IClue> {
    return this.http.get<IClue>(`${this.HOST}/final`);
  }

  getClues(value?: number, category?: number): Observable<Array<IClue>> {
    let url: string = `${this.HOST}/clues`;

    if (value || category) {
      url += '?';
    }
    if (value) {
      url += `value=${value}&`;
    }
    if (category) {
      url += `category=${category}&`;
    }

    return this.http.get<Array<IClue>>(url);
  }
}
