import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Comedor } from '../model/comedor';
import { BehaviorSubject, finalize, mergeMap, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComedoresService {
  private readonly http = inject(HttpClient);

  private _resourceData$ = new BehaviorSubject<void>(undefined);
  private apiRequest$ = this.http.get<Comedor[]>('/comedores');

  public data$ = this._resourceData$.pipe(
    mergeMap(() => this.apiRequest$),
    shareReplay(1),
  );

  updateData() {
    this._resourceData$.next();
  }

  getId(id: string) {
    return this.http.get<Comedor[]>('/comedores/' + id);
  }

  delete(id: string) {
    return this.http
      .delete<any>('/comedores/' + id)
      .pipe(finalize(() => this.updateData()));
  }

  atualizar(id: string, nome: string) {
    return this.http
      .put<any>('/comedores/' + id, { nome: nome })
      .pipe(finalize(() => this.updateData()));
  }

  inlcluir(nome: string) {
    return this.http
      .post<any>('/comedores', { nome: nome })
      .pipe(finalize(() => this.updateData()));
  }
}
