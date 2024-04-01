import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { shareReplay } from 'rxjs';

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

  atualizar(id: string, quantidade: number, acompanhamentos: string[]) {
    console.log('atualizar');

    return this.http.put<any>('/pedidopratos/' + id, {
      quantidade,
      acompanhamentos
    });
  }

  inlcluir(marmita: string, comedor: string, prato: string, quantidade: number, acompanhamentos: string[]) {
    return this.http.post<any>(
      '/pedidopratos',
      {
        marmita,
        comedor,
        prato,
        quantidade,
        acompanhamentos
      },
    );
  }
}
