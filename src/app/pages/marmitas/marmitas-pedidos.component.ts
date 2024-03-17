import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap, Observable } from 'rxjs';
import { ComedoresService } from '../../services/comedores.service';
import { PedidoService } from '../../services/pedido.service';
import { PratoStore } from '../../stores/prato.store';

@Component({
  selector: 'app-marmitas-pedidos-component',
  templateUrl: './marmitas-pedidos.component.html',
})
export class MarmitasPedidosComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly comedoresService = inject(ComedoresService);
  private readonly pedidoService = inject(PedidoService);

  private readonly pratoStore = inject(PratoStore);

  data$!: Observable<any>;

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        map(({ comedorId, marmitaId }) => {
          this.data$ = this.pedidoService.getMarmitaId(marmitaId, comedorId);

          /* this.data$.subscribe((response) => {
            this.pratoStore.vincularPedidoPrato(response);
          }); */
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
