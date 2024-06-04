import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { TOKEN_APP_CONFIG } from '../common/tokens';
import { KEY_SECRET_TOKEN } from './constantes'; 

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  private readonly conf = inject(TOKEN_APP_CONFIG); 

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    let token = localStorage.getItem(KEY_SECRET_TOKEN);
    if (token) {
      request = request.clone({
        url: this.conf.apiUri + request.url,
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      request = request.clone({
        url: this.conf.apiUri + request.url,
      });
    }
    return next.handle(request);
  }
}
