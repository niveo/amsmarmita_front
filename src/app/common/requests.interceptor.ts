import { Injectable, inject } from '@angular/core';
import { Observable, catchError, mergeMap } from 'rxjs';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { TOKEN_APP_CONFIG } from '../common/tokens';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  private readonly conf = inject(TOKEN_APP_CONFIG);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.defaultClone(req, next);
  }

  defaultClone(req: HttpRequest<any>, next: HttpHandler) {
    const dupReq = req.clone({
      //Passado para pegar sessão
      withCredentials: true,
      url: this.conf.apiUri + req.url,
    });
    return next.handle(dupReq);
  }
}
