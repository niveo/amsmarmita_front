import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';
import { KEY_SECRET_TOKEN } from '../common/constantes';
import { sha256 } from 'js-sha256';
import { jwtDecode } from "jwt-decode";
import { TOKEN_APP_CONFIG } from '../common/tokens';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _usuarioLogado = new BehaviorSubject<boolean>(false);
  readonly usuarioLogado$ = this._usuarioLogado.asObservable();
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly cofigToken = inject(TOKEN_APP_CONFIG);

  constructor() {
    //Se não for ambiente de produção jogar logado como false
    this._usuarioLogado.next(!this.cofigToken.production);
  }

  login(password: string) {
    const pass = sha256.update(password).hex()
    return this.http.post('/auth/login', { password: pass })
      .pipe(shareReplay())
      .pipe(tap({
        next: (response: any) => {
          const decode = jwtDecode(response.access_token);
          const dateExtp = new Date(decode.exp! * 1000);
          localStorage.setItem(KEY_SECRET_TOKEN, response.access_token);
          localStorage.setItem("expires_at", JSON.stringify(dateExtp.valueOf()));
          this._usuarioLogado.next(true);

          this.router.navigateByUrl('/');
        }
      }));
  }

  isAuthenticatedUser(): boolean {
    return this._usuarioLogado.getValue();
  }

  //console.log(isBefore(new Date(), this.getExpiration()))
  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration!);
    return new Date(Number(expiresAt));
  }

  logout(): void {
    localStorage.removeItem(KEY_SECRET_TOKEN);
    localStorage.removeItem("expires_at");
    this._usuarioLogado.next(false);
    this.router.navigateByUrl('/login');
  }
}


export const canActivateTeam: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot,
):
  Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  return inject(AuthService).isAuthenticatedUser()
    ? true
    : inject(Router).createUrlTree(['/login']);
};
