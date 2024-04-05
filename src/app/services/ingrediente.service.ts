import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Ingrediente } from '../model';
import { BehaviorSubject, finalize, mergeMap, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngredienteService {
  private readonly http = inject(HttpClient);
  private _resourceData$ = new BehaviorSubject<void>(undefined);
  private apiRequest$ = this.http.get<Ingrediente[]>('/ingredientes');

  public data$ = this._resourceData$.pipe(
    mergeMap(() => this.apiRequest$),
    shareReplay(1),
  );

  updateData() {
    this._resourceData$.next();
  }

  getAll() {
    return this.http.get<Ingrediente[]>('/ingredientes');
  }

  delete(id: string) {
    return this.http
      .delete<any>('/ingredientes/' + id)
      .pipe(finalize(() => this.updateData()));
  }

  atualizar(id: string, nome: string, observacao?: string) {
    return this.http
      .put<any>('/ingredientes/' + id, {
        nome,
        observacao: observacao || null,
      })
      .pipe(finalize(() => this.updateData()));
  }

  inlcluir(nome: string, observacao?: string) {
    return this.http
      .post<any>('/ingredientes', {
        nome,
        observacao: observacao || null,
      })
      .pipe(finalize(() => this.updateData()));
  }
}
