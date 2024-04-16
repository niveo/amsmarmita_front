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

  override apiRequest$ = this.http
    .get<Grupo[]>('/grupos')
    .pipe(finalize(() => this.finalizarLoading()))
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
    this.iniciarLoading();
    return this.http
      .delete<any>('/grupos/' + id)
      .pipe(finalize(() => this.updateData()));
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
    this.iniciarLoading();
    return this.http
      .put<any>('/grupos/' + id, {
        nome: nome,
        principal: principal,
        multiplo: multiplo,
        observacao: observacao || null,
        cor: cor || null,
      })
      .pipe(finalize(() => this.updateData()));
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
    this.iniciarLoading();
    return this.http
      .post<any>('/grupos', {
        nome: nome,
        principal: principal,
        multiplo: multiplo,
        observacao: observacao || null,
        cor: cor || null,
      })
      .pipe(finalize(() => this.updateData()));
  }
}
