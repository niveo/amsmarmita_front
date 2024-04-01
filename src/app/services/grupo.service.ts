import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Grupo } from '../model/grupo';
import { BehaviorSubject, map, mergeMap, shareReplay, tap } from 'rxjs';
import { PratoService } from './prato.service';

@Injectable({
  providedIn: 'root',
})
export class GrupoService {
  private readonly http = inject(HttpClient);
  private readonly service = inject(PratoService);
  private _resourceData$ = new BehaviorSubject<void>(undefined);

  tapRemoverCache = tap(() => {
  });

   private apiRequest$ = this.http
    .get<Grupo[]>('/grupos')
    .pipe(
      mergeMap((mp) => {
        return this.service.getAll().pipe(
          map((m) => {
            return mp.map((n) => {
              return {
                ...n,
                pratos: m.filter((f) => f.grupo?._id === n._id),
              };
            });
          }),
        );
      }),
    )

  public data$ = this._resourceData$.pipe(
    mergeMap(() => this.apiRequest$),
    shareReplay(1)
  );

  updateData() {
    this._resourceData$.next();
  }

  delete(id: string) {
    return this.http.delete<any>('/grupos/' + id).pipe(this.tapRemoverCache);
  }

  atualizar({
    id,
    nome,
    principal,
    multiplo,
    observacao,
  }: {
    id: string;
    nome: string;
    principal: boolean;
    multiplo: boolean;
    observacao?: string;
  }) {
    return this.http
      .put<any>('/grupos/' + id, {
        nome: nome,
        principal: principal,
        multiplo: multiplo,
        observacao: observacao,
      })
      .pipe(this.tapRemoverCache);
  }

  inlcluir({
    nome,
    principal,
    multiplo,
    observacao,
  }: {
    nome: string;
    principal: boolean;
    multiplo: boolean;
    observacao?: string;
  }) {
    return this.http
      .post<any>('/grupos', {
        nome: nome,
        principal: principal,
        multiplo: multiplo,
        observacao: observacao,
      })
      .pipe(this.tapRemoverCache);
  }
}
