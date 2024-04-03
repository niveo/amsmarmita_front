import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';
import { KEY_SECRET_TOKEN } from '../common/constantes';
import { sha256 } from 'js-sha256';
import { jwtDecode } from 'jwt-decode';
import { TOKEN_APP_CONFIG } from '../common/tokens';
import { isBefore, differenceInSeconds } from 'date-fns';
import { SessionTimerService } from '../services/session-timer.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly cofigToken = inject(TOKEN_APP_CONFIG);
  private readonly sessionTimerService = inject(SessionTimerService);

  usuarioLogado = signal(false);

  constructor() {
    //Se não for ambiente de produção jogar logado como false
    this.usuarioLogado.set(!this.cofigToken.production);

    this.sessionTimerService.sessionFinished$.subscribe(() => {
      this.usuarioLogado.set(false);
    });

    /*     setInterval(() => {
      console.log(isBefore(this.getExpiration(), new Date()));
      console.log(
        format(new Date(), 'mm:ss'),
        ' até ',
        format(this.getExpiration(), 'mm:ss'),
      );
    }, 3000); */
  }

  login(password: string) {
    const pass = sha256.update(password).hex();
    return this.http.post('/auth/login', { password: pass }).pipe(
      tap({
        next: (response: any) => {
          const decode = jwtDecode(response.access_token);

          const dateExtp = new Date(decode.exp! * 1000);
          localStorage.setItem(KEY_SECRET_TOKEN, response.access_token);
          localStorage.setItem(
            'expires_at',
            JSON.stringify(dateExtp.valueOf()),
          );
          this.usuarioLogado.set(true);

          this.sessionTimerService.startTimer(
            differenceInSeconds(dateExtp, new Date()),
          );

          this.router.navigateByUrl('/');
        },
      }),
    );
  }

  isAuthenticatedUser(): boolean {
    return this.usuarioLogado(); //;
  }

  //console.log(isBefore(this.getExpiration(), new Date()))
  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration!);
    return new Date(Number(expiresAt));
  }

  isSessaoExpirou = () => isBefore(this.getExpiration(), new Date());

  logout(): void {
    localStorage.removeItem(KEY_SECRET_TOKEN);
    localStorage.removeItem('expires_at');
    this.usuarioLogado.set(false);
    this.router.navigateByUrl('/login');
  }
}

export const canActivateTeam: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot,
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  return inject(AuthService).isAuthenticatedUser()
    ? true
    : inject(Router).createUrlTree(['/login']);
};
