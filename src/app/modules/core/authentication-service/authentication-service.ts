import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthService {
  private _token: string;

  constructor(private readonly _store: Store<any>) {
    this._store.select('login').subscribe(data => {
      if (data) {
        this._token = data.token;
      }
    });
  }

   /**
   * @description
   * Verifica se há um token no store de login e retorna um booleano. Caso tenha
   * um token, retornará true.
   */
  isAuthenticated(): boolean {
    if (this._token) {
      return true;
    }
    return false;
  }
}
