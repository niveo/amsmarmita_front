import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { PedidoService } from '../../services/pedido.service';
import { PratoStore } from '../../stores/prato.store';
import { PedidoStore } from '../../stores/pedido.store';
import { Prato } from 'src/app/model';

@Component({
  selector: 'app-marmitas-pedidos-component',
  templateUrl: './marmitas-pedidos.component.html',
})
export class MarmitasPedidosComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly pedidoStore = inject(PedidoStore);

  data$!: Observable<any>;

  constructor() {
    this.data$ = this.pedidoStore.data$;
  }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        map(({ comedorId, marmitaId }) => {
          this.pedidoStore.carregarRegistros(marmitaId, comedorId);
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

  removerPratoPedido(value: { pedidoId: string, pratoId: string }) {
    console.log(`Removendo prato pedido ${JSON.stringify(value)}`);
    //this.pedidoStore.remover(L);
  }

  incluirPratoPedido(pratoId: string) {
    console.log(pratoId);
  }

  editarPratoPedido(value: { pedidoId: string, pratoId: string }) {
    console.log(`Editando prato pedido ${JSON.stringify(value)}`);
  }
}
