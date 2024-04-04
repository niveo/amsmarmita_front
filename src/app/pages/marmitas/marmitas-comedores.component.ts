import { Component, Inject, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NZ_DRAWER_DATA, NzDrawerRef } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-marmitas-comedores-component',
  template: `<app-comedores-component
    tipoSelecao
    (eventComedorTipoSelecao)="comedorTipoSelecao($event)"
  />`,
  styleUrl: './marmitas-comedores.component.scss',
})
export class MarmitasComedoresComponent {
  constructor(
    private drawerRef: NzDrawerRef<string>,
    @Inject(NZ_DRAWER_DATA) public nzData: { marmitaId: string },
  ) {}

  private readonly router = inject(Router);
  comedorTipoSelecao(comedorId: string) {
    this.router.navigate([
      'pedido',
      {
        comedorId: comedorId,
        marmitaId: this.nzData.marmitaId,
      },
    ]);
    this.drawerRef.close();
  }

  sair() {
    this.drawerRef.close();
  }
}
