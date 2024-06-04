import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, timeout } from 'rxjs'; 
import { DEFAULT_TIMEOUT } from './tokens';

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
  private readonly defaultTimeout = inject(DEFAULT_TIMEOUT);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const timeoutc: number =
      Number(req.headers.get('timeout')) || this.defaultTimeout;
    req.headers.delete('timeout');
    
    return next.handle(req).pipe(timeout(timeoutc));
  }
}
