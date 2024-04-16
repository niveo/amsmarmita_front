import { Injectable } from '@angular/core';
import { Ingrediente } from '../model';
import { finalize } from 'rxjs';
import { BaseService } from './base.service';
import { ExposeServiceRest } from '@navegador/common/expose-service-rest.utils';

@Injectable({
  providedIn: 'root',
})
@ExposeServiceRest({
  path: '/ingredientes',
})
export class IngredienteService extends BaseService<Ingrediente> {
  getAll() {
    return this.http.get<Ingrediente[]>('/ingredientes');
  }

  delete(id: string) {
    this.iniciarLoading();
    return this.http
      .delete<any>('/ingredientes/' + id)
      .pipe(finalize(() => this.updateData()));
  }

  atualizar(id: string, nome: string, observacao?: string) {
    this.iniciarLoading();
    return this.http
      .put<any>('/ingredientes/' + id, {
        nome,
        observacao: observacao || null,
      })
      .pipe(finalize(() => this.updateData()));
  }

  inlcluir(nome: string, observacao?: string) {
    this.iniciarLoading();
    return this.http
      .post<any>('/ingredientes', {
        nome,
        observacao: observacao || null,
      })
      .pipe(finalize(() => this.updateData()));
  }
}
