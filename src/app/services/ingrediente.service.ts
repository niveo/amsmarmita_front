import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Ingrediente } from '../model';
import { BehaviorSubject, mergeMap, shareReplay } from 'rxjs';

@Injectable()
export class IngredienteService {
  private readonly http = inject(HttpClient);
  private _resourceData$ = new BehaviorSubject<void>(undefined);

  private apiRequest$ = this.http.get<Ingrediente[]>('/ingredientes')

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
