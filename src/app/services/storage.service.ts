import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }  

  delete(key): void {
    localStorage.removeItem(key);
  }

  save(key, value): void {
    localStorage.setItem(key, value)
  }

  saveJson(key, value): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getJson(key): any {
    const item = localStorage.getItem(key);

    if (item) {
      return JSON.parse(item);
    }

    return null;
  }

  getItem(key): any {
    return localStorage.getItem(key);
  }
}
