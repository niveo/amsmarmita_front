import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ExposeServiceRest } from '@navegador/common/expose-service-rest.utils';

@Injectable({
  providedIn: 'root',
})
@ExposeServiceRest({
  path: '/pedidos',
})
export class PedidoService {
  private readonly http = inject(HttpClient);

  getAll() {
    return this.http.get<any[]>('/pedidos');
  }

  getId(id: string) {
    return this.http.get<any[]>('/pedidos/' + id);
  }

  delete(id: string) {
    return this.http.delete<any>('/pedidos/' + id);
  }

  atualizar(id: string, nome: string) {
    return this.http.put<any>('/pedidos/' + id, { nome: nome });
  }

  inlcluir(nome: string) {
    return this.http.post<any>('/pedidos', { nome: nome });
  }

  getMarmitaId(marmitaId: string, comedorId: string) {
    return this.http.get<any>('/pedidos/marmitas', {
      params: { comedorId, marmitaId },
    });
  }
}
