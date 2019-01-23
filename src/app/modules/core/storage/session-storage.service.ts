import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  private keyList: Array<string> = [];

  public setStorageItem(key, value): void {

    if (!!value && typeof key === 'string') {
      if (typeof value === 'object') {
        sessionStorage.setItem(key, JSON.stringify(value));
      } else {
        sessionStorage.setItem(key, value);
      }
      if (this.keyList.indexOf(key) < 0) {
        this.keyList.push(key);
      }
    } else {
      console.log('Error: Invalid parameters on function setStorageItem');
    }
  }

  public getStorageItem(key): any {
    if (!!key && typeof key === 'string') {
      if (sessionStorage.getItem(key) != null) {
        return JSON.parse(sessionStorage.getItem(key));
      } else {
        return sessionStorage.getItem(key);
      }
    } else {
      console.log('Error: Invalid parameters on function getStorageItem');
    }
  }

  public clearStorage(): void {
    for (let i = 0; i < this.keyList.length; i++) {
      sessionStorage.removeItem(this.keyList[i]);
    }
  }

  public removeStorageItem(key): void {
    if (!!key && typeof key === 'string') {
      sessionStorage.removeItem(key);
    } else {
      console.log('Error: Invalid "key" parameter on function removeStorageItem');
    }
  }
}
