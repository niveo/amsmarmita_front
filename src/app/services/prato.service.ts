import { Injectable } from '@angular/core';
import { Prato } from '../model';
import { map } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class PratoService extends BaseService<Prato> {
    apiRequest$ = this.http
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
    return this.http.put<Prato>('/pratos/' + id, {
      nome,
      grupo: grupoId,
      composicoes,
      observacao,
      ingredientes,
      icone,
      imagem,
    });
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
    return this.http.post<Prato>('/pratos', {
      nome,
      grupo: grupoId,
      composicoes,
      observacao,
      ingredientes,
      icone,
      imagem,
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
