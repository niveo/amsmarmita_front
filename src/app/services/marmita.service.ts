import { Injectable } from '@angular/core';
import { Marmita } from '../model/marmita';
import { finalize } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class MarmitaService extends BaseService<Marmita> {
    apiRequest$ = this.http
    .get<Marmita[]>('/marmitas')
    .pipe(finalize(() => this.loading.set(false)));

  getAll() {
    return this.http.get<Marmita[]>('/marmitas');
  }

  delete(id: string) {
    return this.http
      .delete<any>('/marmitas/' + id)
      .pipe(finalize(() => this.updateData()));
  }

  atualizar(id: string, lancamento: Date, observacao?: string | null) {
    return this.http
      .put<any>('/marmitas/' + id, {
        lancamento: lancamento,
        observacao: observacao,
      })
      .pipe(finalize(() => this.updateData()));
  }

  inlcluir(lancamento: Date, observacao?: string | null) {
    return this.http
      .post<any>('/marmitas', {
        lancamento: lancamento,
        observacao: observacao,
      })
      .pipe(finalize(() => this.updateData()));
  }
}
