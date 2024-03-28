import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subject } from 'rxjs';
import { PedidoStore } from '../../../stores/pedido.store';
import { isEmpty } from '../../../common/util';
import { Prato } from '../../../model';

@Component({
  selector: 'app-marmitas-pedidos-component',
  templateUrl: './marmitas-pedidos.component.html',
  styleUrl: './marmitas-pedidos.component.scss',
})
export class MarmitasPedidosComponent implements OnInit, OnDestroy {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly pedidoStore = inject(PedidoStore);

  data$!: Observable<any>;
  loading = false;
  quantidade$!: Observable<number>;

  visibleAlteracaoPedido = false;
  tituloAlteracaoPedido = '';
  quantidadeAlteracaoPedido?: number;

  listaQuantidadePedido: number[] = [];

  subjectQuantidade = new Subject<number>();

  constructor() {
    for (let i = 1; i <= 20; i++) {
      this.listaQuantidadePedido.push(i);
    }
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

  ngOnDestroy() {
    this.subjectQuantidade.unsubscribe();
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
    this.carregarModalQuantidade(prato.nome!, 0);
    this.subjectQuantidade.subscribe((quantidade: number) => {
      if (!isEmpty(quantidade) && quantidade > 0) {
        this.pedidoStore.incluirPratoPedido({
          pratoId: prato._id!,
          grupoId: prato.grupo!,
          quantidade: quantidade,
        });
      }
    });
  }

  editarPratoPedido(prato: Prato) {
    this.editarQuantidadePrato(
      prato,
      prato.pedido._id,
      prato.pedido.quantidade,
    );
    this.subjectQuantidade.subscribe((quantidade: number) => {
      prato.pedido.quantidade = quantidade;
    });
  }

  private editarQuantidadePrato(
    prato: Prato,
    pedidoId: string,
    quantidade: number,
  ) {
    this.carregarModalQuantidade(prato.nome!, quantidade);
    this.subjectQuantidade.subscribe((quantidade: number) => {
      if (!isEmpty(quantidade)) {
        this.pedidoStore.atualizarQuantidadePratoPedido({
          pedidoPratoId: pedidoId,
          pratoId: prato._id!,
          grupoId: prato.grupo!,
          quantidade: quantidade,
        });
      }
    });
  }

  private carregarModalQuantidade(titulo: string, quantidade: number) {
    this.visibleAlteracaoPedido = true;
    this.tituloAlteracaoPedido = titulo;
    this.quantidadeAlteracaoPedido = quantidade;
  }

  closeAlteracaoPedido() {
    this.visibleAlteracaoPedido = false;
  }

  salvarAlteracaoPedido() {
    this.visibleAlteracaoPedido = false;
    this.subjectQuantidade.next(this.quantidadeAlteracaoPedido!);
  }
}
