import {
  EnvironmentInjector,
  inject,
  runInInjectionContext,
} from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { EMPTY, Observable, of, skipWhile } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const skipNull =
  () =>
  <T>(source: Observable<T>): Observable<T> =>
    source.pipe(skipWhile((value) => value === null));
 