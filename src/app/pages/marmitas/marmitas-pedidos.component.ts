import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs';
import { ComedoresService } from '../../services/comedores.service';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-marmitas-pedidos-component',
  templateUrl: './marmitas-pedidos.component.html',
})
export class MarmitasPedidosComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly comedoresService = inject(ComedoresService);
  private readonly pedidoService = inject(PedidoService);

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        mergeMap(({ comedorId, marmitaId }) => {
          this.pedidoService.getMarmitaId(marmitaId, comedorId).subscribe(console.log);
          return this.comedoresService.getId(comedorId);
        }),
      )
      .subscribe();
  }

  visible = false;
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
