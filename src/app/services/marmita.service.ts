import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Marmita } from '../model/marmita';

@Injectable()
export class MarmitaService {
  private readonly http = inject(HttpClient);

  getAll() {
    return this.http.get<Marmita[]>('/marmitas');
  }

  delete(id: string) {
    return this.http.delete<any>('/marmitas/' + id);
  }

  atualizar(id: string, lancamento: Date, observacao?: string) {
    return this.http.put<any>('/marmitas/' + id, {
      lancamento: lancamento,
      observacao: observacao,
    });
  }

  inlcluir(lancamento: Date, observacao?: string) {
    return this.http.post<any>('/marmitas', {
      lancamento: lancamento,
      observacao: observacao,
    });
  }
}
