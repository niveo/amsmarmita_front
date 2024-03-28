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
  styleUrl: './marmitas-pedidos.component.scss',
})
export class MarmitasPedidosComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly pedidoStore = inject(PedidoStore);
  private readonly modalService = inject(NzModalService);

  data$!: Observable<any>;
  loading = false;
  quantidade$!: Observable<number>;

  constructor() {
    this.data$ = this.pedidoStore.data$;
    this.quantidade$ = this.pedidoStore.quantidade$;
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

  removerPratoPedidoLocal(value: any) {
    this.pedidoStore.removerPratoPedido({
      pedidoPratoId: value._id,
      pratoId: value.prato._id,
      grupoId: value.prato.grupo,
    });
  }

  removerPratoPedido(prato: Prato) {
    this.pedidoStore.removerPratoPedido({
      pedidoPratoId: prato.pedido._id,
      pratoId: prato._id!,
      grupoId: prato.grupo!,
    });
  }

  editarPratoPedidoLocal(value: any) {
    this.editarQuantidadePrato(value.prato, value._id, value.quantidade);
  }

  incluirPratoPedido(prato: Prato) {
    this.carregarModalQuantidade(prato.nome!, 0).afterClose.subscribe(
      (quantidade) => {
        if (!isEmpty(quantidade) && quantidade > 0) {
          this.pedidoStore.incluirPratoPedido({
            pratoId: prato._id!,
            grupoId: prato.grupo!,
            quantidade: quantidade,
          });
        }
      },
    );
  }

  editarPratoPedido(prato: Prato) {
    this.editarQuantidadePrato(
      prato,
      prato.pedido._id,
      prato.pedido.quantidade,
    ).afterClose.subscribe((quantidade) => {
      prato.pedido.quantidade = quantidade;
    });
  }

  private editarQuantidadePrato(
    prato: Prato,
    pedidoId: string,
    quantidade: number,
  ) {
    const subs = this.carregarModalQuantidade(prato.nome!, quantidade);
    subs.afterClose.subscribe((quantidade) => {
      if (!isEmpty(quantidade)) {
        this.pedidoStore.atualizarQuantidadePratoPedido({
          pedidoPratoId: pedidoId,
          pratoId: prato._id!,
          grupoId: prato.grupo!,
          quantidade: quantidade,
        });
      }
    });
    return subs;
  }

  private carregarModalQuantidade(titulo: string, quantidade: number) {
    return this.modalService.create({
      nzContent: MarmitasPedidosQuantidadeComponent,
      nzFooter: null,
      nzClosable: false,
      nzTitle: titulo,
      nzData: {
        quantidadePedido: quantidade,
      },
    });
  }
}
