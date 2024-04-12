import { HttpClient } from '@angular/common/http';
import { inject, signal } from '@angular/core';
import { BehaviorSubject, Observable, mergeMap, shareReplay } from 'rxjs';

export abstract class BaseService<T> {
  protected readonly http = inject(HttpClient);
  loading = signal(true);
  abstract delete(id: string): any;

  abstract apiRequest$: Observable<T[]>;

  protected _resourceData$ = new BehaviorSubject<void>(undefined);

  data$ = this._resourceData$.pipe(
    mergeMap(() => this.apiRequest$),
    shareReplay(1),
  );

  constructor() {}

  updateData() {
    console.log('updateData');
    this._resourceData$.next();
  }
}
