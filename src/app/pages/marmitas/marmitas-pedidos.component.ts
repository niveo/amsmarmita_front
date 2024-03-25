import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { PedidoStore } from '../../stores/pedido.store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MarmitasPedidosQuantidadeComponent } from './marmitas-pedidos-quantidade.component';
import { isEmpty } from '../../common/util';
import { Prato } from '../../model';

@Component({
  selector: 'app-marmitas-pedidos-component',
  templateUrl: './marmitas-pedidos.component.html',
})
export class MarmitasPedidosComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly pedidoStore = inject(PedidoStore);
  private readonly modalService = inject(NzModalService);

  data$!: Observable<any>;
  loading = false;

  constructor() {
    this.data$ = this.pedidoStore.data$;
    this.pedidoStore.loading$.subscribe((loading) => (this.loading = loading));
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

  removerPratoPedido(prato: Prato) {
    this.pedidoStore.removerPratoPedido({
      pedidoPratoId: prato.pedido._id,
      pratoId: prato._id!,
      grupoId: prato.grupo!,
    });
  }

  incluirPratoPedido(prato: Prato) {
    this.modalService
      .create({
        nzContent: MarmitasPedidosQuantidadeComponent,
        nzFooter: null,
        nzClosable: false,
        nzTitle: prato.nome,
        nzData: {
          quantidadePedido: 0,
        },
      })
      .afterClose.subscribe((quantidade) => {
        if (!isEmpty(quantidade)) {
          this.pedidoStore.incluirPratoPedido({
            pratoId: prato._id!,
            grupoId: prato.grupo!,
            quantidade: quantidade,
          });
        }
      });
  }

  editarPratoPedido(prato: Prato) {
    this.modalService
      .create({
        nzContent: MarmitasPedidosQuantidadeComponent,
        nzFooter: null,
        nzClosable: false,
        nzTitle: prato.nome,
        nzData: {
          quantidadePedido: prato.pedido.quantidade,
        },
      })
      .afterClose.subscribe((quantidade) => {
        if (!isEmpty(quantidade)) {
          prato.pedido.quantidade = quantidade;
          this.pedidoStore.atualizarQuantidadePratoPedido({
            pedidoPratoId: prato.pedido._id,
            pratoId: prato._id!,
            grupoId: prato.grupo!,
            quantidade: prato.pedido.quantidade,
          });
        }
      });
  }
}
