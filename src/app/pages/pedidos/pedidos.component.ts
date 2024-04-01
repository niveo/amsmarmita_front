import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subject } from 'rxjs';
import { PedidoStore } from '../../stores/pedido.store';
import { PedidoPrato } from '../../model/pedido-prato';
import { LBL_ALERTA } from '../../common/constantes';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Prato } from '../../model';

@Component({
  selector: 'app-pedidos-component',
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss',
})
export class PedidosComponent implements OnInit, OnDestroy {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly pedidoStore = inject(PedidoStore);
  protected readonly notify = inject(NzNotificationService);
  data$!: Observable<PedidoPrato[]>;
  loading = false;
  quantidade$!: Observable<number>;

  visibleAlteracaoPedido = false;
  tituloAlteracaoPedido = '';
  quantidadeAlteracaoPedido?: number;
  acompanhamentosAlteracaoPedido!: string[];

  listaQuantidadePedido: number[] = [];

  subjectAlteracaoPedido = new Subject<{
    quantidade: number;
    acompanhamentos: string[];
  }>();

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
    this.subjectAlteracaoPedido.unsubscribe();
  }

  removerPratoPedido(pratoId: string) {
    this.pedidoStore.removerPratoPedido(pratoId);
  }

  incluirPratoPedido(value: {
    nome: string;
    pratoId: string;
    grupoId: string;
  }) {
    this.atualizarIncluirPrato({
      nome: value.nome,
      pratoId: value.pratoId,
      grupoId: value.grupoId,
      quantidade: 0,
      acompanhamentos: [],
    });
  }

  editarPratoPedido(pratoId: string) {
    const pedidoPrato = this.pedidoStore.obterPedidoPrato(pratoId);
    this.atualizarIncluirPrato({
      pedidoPratoId: pedidoPrato!._id!,
      nome: pedidoPrato!.prato!.nome!,
      pratoId: pedidoPrato!.prato!._id!,
      grupoId: pedidoPrato!.prato!.grupo!._id,
      quantidade: pedidoPrato!.quantidade!,
      acompanhamentos: pedidoPrato!.acompanhamentos!,
    });
  }

  private atualizarIncluirPrato({
    pedidoPratoId,
    nome,
    pratoId,
    grupoId,
    quantidade,
    acompanhamentos,
  }: {
    pedidoPratoId?: string;
    nome: string;
    pratoId: string;
    grupoId: string;
    quantidade: number;
    acompanhamentos: Prato[];
  }) {
    this.carregarModalQuantidade(nome, quantidade, acompanhamentos);
    const sub = this.subjectAlteracaoPedido.subscribe(
      ({ quantidade, acompanhamentos }) => {
        if (pedidoPratoId) {
          this.pedidoStore.atualizarPratoPedido({
            pedidoPratoId,
            pratoId,
            grupoId,
            quantidade,
            acompanhamentos,
          });
        } else {
          this.pedidoStore.incluirPratoPedido({
            pratoId: pratoId,
            grupoId: grupoId,
            quantidade: quantidade,
            acompanhamentos: acompanhamentos,
          });
        }

        sub.unsubscribe();
      },
    );
  }

  private carregarModalQuantidade(
    titulo: string,
    quantidade: number,
    acompanhamentos: Prato[] = [],
  ) {
    this.tituloAlteracaoPedido = titulo;
    this.acompanhamentosAlteracaoPedido = acompanhamentos.map((m) => m._id!);
    this.quantidadeAlteracaoPedido = quantidade;

    this.visibleAlteracaoPedido = true;
  }

  closeAlteracaoPedido() {
    this.visibleAlteracaoPedido = false;
  }

  salvarAlteracaoPedido() {
    if (
      !this.quantidadeAlteracaoPedido ||
      this.quantidadeAlteracaoPedido === 0
    ) {
      this.notify.warning(LBL_ALERTA, 'Informe uma quantidade!');
      return;
    }

    this.visibleAlteracaoPedido = false;

    this.subjectAlteracaoPedido.next({
      quantidade: this.quantidadeAlteracaoPedido!,
      acompanhamentos: this.acompanhamentosAlteracaoPedido,
    });
  }
}
