import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-marmitas-comedores-component',
  template: `<app-comedores-component
    tipoSelecao
    (eventComedorTipoSelecao)="comedorTipoSelecao($event)"
  />`,
  styleUrl: './marmitas-comedores.component.scss'
})
export class MarmitasComedoresComponent {
  readonly #modal = inject(NzModalRef);
  readonly nzModalData: { marmitaId: string } = inject(NZ_MODAL_DATA);

  private readonly router = inject(Router);
  comedorTipoSelecao(comedorId: string) {
    this.router.navigate([
      'pedido',
      {
        comedorId: comedorId,
        marmitaId: this.nzModalData.marmitaId,
      },
    ]);
    this.#modal.close();
  }

  sair(){
    this.#modal.close();
  }
}
