import { Injectable } from '@angular/core';
import { Ingrediente } from '../model';
import { finalize } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class IngredienteService extends BaseService<Ingrediente> {
  apiRequest$ = this.http
    .get<Ingrediente[]>('/ingredientes')
    .pipe(finalize(() => this.loading.set(false)));

  getAll() {
    return this.http.get<Ingrediente[]>('/ingredientes');
  }

  delete(id: string) {
    return this.http
      .delete<any>('/ingredientes/' + id)
      .pipe(finalize(() => this.updateData()));
  }

  atualizar(id: string, nome: string, observacao?: string) {
    return this.http
      .put<any>('/ingredientes/' + id, {
        nome,
        observacao: observacao || null,
      })
      .pipe(finalize(() => this.updateData()));
  }

  inlcluir(nome: string, observacao?: string) {
    return this.http
      .post<any>('/ingredientes', {
        nome,
        observacao: observacao || null,
      })
      .pipe(finalize(() => this.updateData()));
  }
}
