import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Ingrediente } from '../model';
import { BehaviorSubject, finalize, mergeMap, shareReplay } from 'rxjs';

@Injectable()
export class IngredienteService {
  private readonly http = inject(HttpClient);
  private _resourceData$ = new BehaviorSubject<void>(undefined);
  private apiRequest$ = this.http.get<Ingrediente[]>('/ingredientes');
  loading = signal(true);

  public data$ = this._resourceData$.pipe(
    mergeMap(() =>
      this.apiRequest$.pipe(finalize(() => this.loading.set(false))),
    ),
    shareReplay(1),
  );

  updateData() {
    this.loading.set(true);
    this._resourceData$.next();
  }

  getAll() {
    return this.http.get<Ingrediente[]>('/ingredientes');
  }

  delete(id: string) {
    return this.http.delete<any>('/ingredientes/' + id);
  }

  atualizar(id: string, nome: string, observacao?: string) {
    return this.http.put<any>('/ingredientes/' + id, {
      nome,
      observacao: observacao || null,
    });
  }

  inlcluir(nome: string, observacao?: string) {
    return this.http.post<any>('/ingredientes', {
      nome,
      observacao: observacao || null,
    });
  }
}
