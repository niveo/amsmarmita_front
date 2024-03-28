import { Component, inject } from '@angular/core';
import { NZ_DRAWER_DATA, NzDrawerRef } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-marmitas-pedidos-quantidade-component',
  templateUrl: './marmitas-pedidos-quantidade.component.html',
})
export class MarmitasPedidosQuantidadeComponent {
  readonly #modal = inject(NzDrawerRef);
  readonly nzModalData: { quantidadePedido: number } = inject(NZ_DRAWER_DATA);

  listaQuantidadePedido: number[] = [];

  constructor() {
    for (let i = 0; i <= 20; i++) {
      this.listaQuantidadePedido.push(i);
    }
  }

  close(quantidade: number) {
    this.#modal.close(quantidade);
  }
}
