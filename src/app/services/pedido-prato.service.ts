import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PedidoPratoService {
  private readonly http = inject(HttpClient);

  getAll() {
    return this.http.get<any[]>('/pedidopratos');
  }

  getId(id: string) {
    return this.http.get<any[]>('/pedidopratos/' + id);
  }

  delete(id: string) {
    return this.http.delete<any>('/pedidopratos/' + id);
  }

  atualizar(id: string, quantidade: number) {
    return this.http.put<any>('/pedidopratos/' + id, {
      quantidade,
    });
  }

  inlcluir(pedido: string, prato: string, quantidade: number) {
    return this.http.post<any>(
      '/pedidopratos',
      {
        pedido,
        prato,
        quantidade,
      },
    );
  }
}
