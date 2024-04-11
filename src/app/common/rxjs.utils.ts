import { Observable, skipWhile } from 'rxjs';
export const skipNull =
  () =>
  <T>(source: Observable<T>): Observable<T> =>
    source.pipe(skipWhile((value) => value === null));
