import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Prato } from '../model';
import { BehaviorSubject, map, mergeMap, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PratoService {
  private readonly http = inject(HttpClient);

  private _resourceData$ = new BehaviorSubject<void>(undefined);
  private apiRequest$ = this.http
    .get<Prato[]>('/pratos')
    .pipe(map((m) => m.sort(this.sortNome)));

    sortNome = (a: Prato, b: Prato) => a.nome!.localeCompare(b.nome!);

  public data$ = this._resourceData$.pipe(
    mergeMap(() => this.apiRequest$),
    shareReplay(1),
  );

  updateData() {
    this._resourceData$.next();
  }

  getAll() {
    return this.http.get<Prato[]>('/pratos');
  }

  delete(id: string) {
    return this.http.delete<any>('/pratos/' + id);
  }

  atualizar({
    id,
    nome,
    grupoId,
    composicoes,
    observacao,
    ingredientes,
  }: {
    id: string;
    nome: string;
    grupoId: string;
    composicoes?: string[] | null;
    observacao?: string | null;
    ingredientes?: string[] | null;
  }) {
    return this.http.put<Prato>('/pratos/' + id, {
      nome: nome,
      grupo: grupoId,
      composicoes: composicoes || null,
      observacao: observacao || null,
      ingredientes: ingredientes || null,
    });
  }

  inlcluir({
    nome,
    grupoId,
    composicoes,
    observacao,
    ingredientes,
  }: {
    nome: string;
    grupoId: string;
    composicoes?: string[] | null;
    observacao?: string | null;
    ingredientes?: string[] | null;
  }) {
    return this.http.post<Prato>('/pratos', {
      nome: nome,
      grupo: grupoId,
      composicoes: composicoes || null,
      observacao: observacao || null,
      ingredientes: ingredientes || null,
    });
  }

  duplicar(id: string) {
    return this.http.get<any>('/pratos/duplicar', {
      params: {
        id: id,
      },
    });
  }
}
