import { Injectable, inject } from '@angular/core';
import { Prato } from '../model';
import { PedidoService } from '../services/pedido.service';
import { BehaviorSubject } from 'rxjs';
import { PratoStore } from './prato.store';

@Injectable({
  providedIn: 'root',
})
export class PedidoStore {
  private readonly _dataSource = new BehaviorSubject<any>(null);
  readonly data$ = this._dataSource.asObservable();
  private readonly pedidoService = inject(PedidoService);
  private readonly pratoStore = inject(PratoStore);

  carregarRegistros(marmitaId: string, comedorId: string) {
    this.pedidoService.getMarmitaId(marmitaId, comedorId)
      .subscribe({
        next: (response: any) => {
          this.pratoStore.vincularPedidoPrato(response);
          this._dataSource.next(response);
        },
        error: (response: any) => {
          console.log(response)
        }
      });
  }

  incluirPratoPedido(prato: Prato) {
    console.log(prato);
  }

  editarPratoPedido(value: { pedidoId: string, pratoId: string }) {
  }

  removerPratoPedido(value: { pedidoId: string, pratoId: string }) {

  }
}
