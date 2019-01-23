import { CanLoad, Router } from '@angular/router';
import { AuthService } from '../authentication-service/authentication-service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanLoad {
  constructor(private _authService: AuthService, private _router: Router) {}

  /**
   * @description
   * Executa a chamada do serviço de autenticação. Caso retorne verdadeiro, o usuário
   * conseguirá prosseguir para determinada rota.
   */
  canLoad() {
    if (!this._authService.isAuthenticated()) {
      this._router.navigate(['/login']);
    }
    return this._authService.isAuthenticated();
  }
}
