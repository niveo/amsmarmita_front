import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Prato } from '../model';

@Injectable({
  providedIn: 'root',
})
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
