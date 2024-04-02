import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PedidoItemService {
  private readonly http = inject(HttpClient);

  getAll() {
    return this.http.get<any[]>('/pedidoitens');
  }

  getId(id: string) {
    return this.http.get<any[]>('/pedidoitens/' + id);
  }

  delete(id: string) {
    return this.http.delete<any>('/pedidoitens/' + id);
  }

  atualizar(
    id: string,
    quantidade: number,
    acompanhamentos: string[],
    observacao?: string,
  ) { 
    return this.http.put<any>('/pedidoitens/' + id, {
      quantidade,
      acompanhamentos,
      observacao: observacao || null,
    });
  }

  inlcluir(
    marmita: string,
    comedor: string,
    prato: string,
    quantidade: number,
    acompanhamentos: string[],
    observacao?: string,
  ) { 
    return this.http.post<any>('/pedidoitens', {
      marmita,
      comedor,
      prato,
      quantidade,
      acompanhamentos,
      observacao: observacao || null,
    });
  }
}
