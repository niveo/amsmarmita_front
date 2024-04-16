import { Injectable } from '@angular/core';
import { Prato } from '../model';
import { finalize, map } from 'rxjs';
import { BaseService } from './base.service';
import { ExposeServiceRest } from '@navegador/common/expose-service-rest.utils';

@Injectable({
  providedIn: 'root',
})
@ExposeServiceRest({
  path: '/pratos',
})
export class PratoService extends BaseService<Prato> {
  override apiRequest$ = this.http
    .get<Prato[]>('/pratos')
    .pipe(map((m) => m.sort(this.sortNome)));

  sortNome = (a: Prato, b: Prato) => a.nome!.localeCompare(b.nome!);

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
    icone,
    imagem,
  }: {
    id: string;
    nome: string;
    grupoId: string;
    composicoes?: string[] | null;
    observacao?: string | null;
    ingredientes?: string[] | null;
    icone?: string | null;
    imagem?: string | null;
  }) {
    this.iniciarLoading();
    return this.http
      .put<Prato>('/pratos/' + id, {
        nome,
        grupo: grupoId,
        composicoes,
        observacao,
        ingredientes,
        icone,
        imagem,
      })
      .pipe(finalize(() => this.finalizarLoading()));
  }

  inlcluir({
    nome,
    grupoId,
    composicoes,
    observacao,
    ingredientes,
    icone,
    imagem,
  }: {
    nome: string;
    grupoId: string;
    composicoes?: string[] | null;
    observacao?: string | null;
    ingredientes?: string[] | null;
    icone?: string | null;
    imagem?: string | null;
  }) {
    this.iniciarLoading();
    return this.http
      .post<Prato>('/pratos', {
        nome,
        grupo: grupoId,
        composicoes,
        observacao,
        ingredientes,
        icone,
        imagem,
      })
      .pipe(finalize(() => this.finalizarLoading()));
  }

  duplicar(id: string) {
    this.iniciarLoading();
    return this.http
      .get<any>('/pratos/duplicar', {
        params: {
          id: id,
        },
      })
      .pipe(finalize(() => this.finalizarLoading()));
  }
}
