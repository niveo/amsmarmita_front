import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Grupo } from '../model/grupo';

@Injectable()
export class GrupoService {
  private readonly http = inject(HttpClient);

  getAll() {
    return this.http.get<Grupo[]>('/grupos');
  }

  delete(id: string) {
    return this.http.delete<any>('/grupos/' + id);
  }

  atualizar({
    id,
    nome,
    principal,
    observacao,
  }: {
    id: string;
    nome: string;
    principal: boolean;
    observacao?: string;
  }) {
    return this.http.put<any>('/grupos/' + id, {
      nome: nome,
      principal: principal,
      observacao: observacao,
    });
  }

  inlcluir({
    nome,
    principal,
    observacao,
  }: {
    nome: string;
    principal: boolean;
    observacao?: string;
  }) {
    return this.http.post<any>('/grupos', {
      nome: nome,
      principal: principal,
      observacao: observacao,
    });
  }
}
