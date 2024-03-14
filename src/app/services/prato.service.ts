import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Prato } from '../model';

@Injectable()
export class PratoService {
  private readonly http = inject(HttpClient);

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
    composicoes = undefined,
    observacao = undefined,
  }: {
    id: string;
    nome: string;
    grupoId: string;
    composicoes?: string[];
    observacao?: string;
  }) {
    return this.http.put<any>('/pratos/' + id, {
      nome: nome,
      grupoId: grupoId,
      composicoes: composicoes,
      observacao: observacao,
    });
  }

  inlcluir({
    nome,
    grupoId,
    composicoes = undefined,
    observacao = undefined,
  }: {
    nome: string;
    grupoId: string;
    composicoes?: string[];
    observacao?: string;
  }) {
    return this.http.post<any>('/pratos', {
      nome: nome,
      grupoId: grupoId,
      composicoes: composicoes,
      observacao: observacao,
    });
  }

  duplicar(_id: string) {
    return this.http.get<any>('/pratos/duplicar', {
      params: {
        id: _id,
      },
    });
  }
}
