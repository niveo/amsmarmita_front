import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  finalize,
  mergeMap,
  shareReplay,
  tap,
} from 'rxjs';

const CACHE_SIZE = 1;

export abstract class BaseService<T> {
  //Registro obtido do decoretor ExposeServiceRest
  public readonly path!: string;

  protected readonly http = inject(HttpClient);
  loading = signal(true);
  abstract delete(id: string): any;

  _resourceData$ = new BehaviorSubject<void>(undefined);

  apiRequest$ = this.http
    .get<T[]>(this.path)
    .pipe(finalize(() => this.loading.set(false)));

  data$ = this._resourceData$.pipe(
    mergeMap(() => this.apiRequest$),
    shareReplay(CACHE_SIZE),
  );

  updateData() {
    this._resourceData$.next();
  }
}
