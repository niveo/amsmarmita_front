import { Component, inject } from '@angular/core';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-marmitas-pedidos-quantidade-component',
  templateUrl: './marmitas-pedidos-quantidade.component.html',
})
export class MarmitasPedidosQuantidadeComponent {
  readonly #modal = inject(NzModalRef);
  readonly nzModalData: { quantidadePedido: number } = inject(NZ_MODAL_DATA);

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
