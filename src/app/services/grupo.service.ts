import { Injectable, inject } from '@angular/core';
import { Grupo } from '../model/grupo';
import { finalize, map, mergeMap, tap } from 'rxjs';
import { PratoService } from './prato.service';
import { BaseService } from './base.service';
import { Prato } from '@navegador/model';
import { ExposeServiceRest } from '@navegador/common/expose-service-rest.utils';

@Injectable({
  providedIn: 'root',
})
@ExposeServiceRest({
  path: '/grupos',
})
export class GrupoService extends BaseService<Grupo> {
  private readonly service = inject(PratoService);

  tapRemoverCache = tap(() => this.updateData());

  override apiRequest$ = this.http
    .get<Grupo[]>('/grupos')
    .pipe(finalize(() => this.loading.set(false)))
    .pipe(
      mergeMap((mp) => {
        return this.service.data$.pipe(
          map((m) => {
            return mp.map((n) => {
              return {
                ...n,
                pratos: m.filter((f: Prato) => f.grupo?._id === n._id),
              };
            });
          }),
        );
      }),
    );

  delete(id: string) {
    return this.http.delete<any>('/grupos/' + id).pipe(this.tapRemoverCache);
  }

  atualizar({
    id,
    nome,
    principal,
    multiplo,
    observacao,
    cor,
  }: {
    id: string;
    nome: string;
    principal: boolean;
    multiplo: boolean;
    observacao?: string;
    cor?: string;
  }) {
    return this.http
      .put<any>('/grupos/' + id, {
        nome: nome,
        principal: principal,
        multiplo: multiplo,
        observacao: observacao || null,
        cor: cor || null,
      })
      .pipe(this.tapRemoverCache);
  }

  inlcluir({
    nome,
    principal,
    multiplo,
    observacao,
    cor,
  }: {
    nome: string;
    principal: boolean;
    multiplo: boolean;
    observacao?: string;
    cor?: string;
  }) {
    return this.http
      .post<any>('/grupos', {
        nome: nome,
        principal: principal,
        multiplo: multiplo,
        observacao: observacao || null,
        cor: cor || null,
      })
      .pipe(this.tapRemoverCache);
  }
}
