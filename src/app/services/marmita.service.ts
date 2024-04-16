import { Injectable } from '@angular/core';
import { Marmita } from '../model/marmita';
import { finalize } from 'rxjs';
import { BaseService } from './base.service';
import { ExposeServiceRest } from '@navegador/common/expose-service-rest.utils';

@Injectable({
  providedIn: 'root',
})
@ExposeServiceRest({
  path: '/marmitas',
})
export class MarmitaService extends BaseService<Marmita> {
  getAll() {
    return this.http.get<Marmita[]>('/marmitas');
  }

  delete(id: string) {
    this.iniciarLoading();
    return this.http
      .delete<any>('/marmitas/' + id)
      .pipe(finalize(() => this.updateData()));
  }

  atualizar(id: string, lancamento: Date, observacao?: string | null) {
    this.iniciarLoading();
    return this.http
      .put<any>('/marmitas/' + id, {
        lancamento: lancamento,
        observacao: observacao,
      })
      .pipe(finalize(() => this.updateData()));
  }

  inlcluir(lancamento: Date, observacao?: string | null) {
    this.iniciarLoading();
    return this.http
      .post<any>('/marmitas', {
        lancamento: lancamento,
        observacao: observacao,
      })
      .pipe(finalize(() => this.updateData()));
  }
}
