import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subject } from 'rxjs';
import { PedidoStore } from '../../stores/pedido.store';
import { LBL_ALERTA } from '../../common/constantes';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Prato } from '../../model';
import { PedidoItem } from '../../model/pedido-item';

@Component({
  selector: 'app-pedidos-component',
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss',
})
export class PedidosComponent implements OnInit, OnDestroy {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly pedidoStore = inject(PedidoStore);
  protected readonly notify = inject(NzNotificationService);
  data$!: Observable<PedidoItem[]>;

  visibleAlteracaoPedido = false;
  tituloAlteracaoPedido = '';
  quantidadeAlteracaoPedido?: number;
  acompanhamentosAlteracaoPedido: string[] = [];

  listaQuantidadePedido: number[] = [];

  subjectAlteracaoPedido = new Subject<{
    quantidade: number;
    acompanhamentos: string[];
  }>();

  quantidadeItens: Signal<number> = computed(() =>
    this.pedidoStore.quantidadeItens(),
  );

  quantidadeRegistros: Signal<number> = computed(() =>
    this.pedidoStore.quantidadeRegistros(),
  );

  loading: Signal<boolean> = computed(() => this.pedidoStore.loading());

  constructor() {
    for (let i = 1; i <= 20; i++) {
      this.listaQuantidadePedido.push(i);
    }
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

  ngOnDestroy() {
    this.subjectAlteracaoPedido.unsubscribe();
  }

  removerPratoPedido(pratoId: string) {
    this.pedidoStore.removerPedidoItem(pratoId);
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

  editarPedidoItem(pratoId: string) {
    const pedidoItem = this.pedidoStore.obterPedidoItem(pratoId);
    this.atualizarIncluirPrato({
      pedidoItemId: pedidoItem!._id!,
      nome: pedidoItem!.prato!.nome!,
      pratoId: pedidoItem!.prato!._id!,
      grupoId: pedidoItem!.prato!.grupo!._id,
      quantidade: pedidoItem!.quantidade!,
      acompanhamentos: pedidoItem!.acompanhamentos!,
    });
  }

  private atualizarIncluirPrato({
    pedidoItemId,
    nome,
    pratoId,
    grupoId,
    quantidade,
    acompanhamentos,
  }: {
    pedidoItemId?: string;
    nome: string;
    pratoId: string;
    grupoId: string;
    quantidade: number;
    acompanhamentos: Prato[];
  }) {
    this.carregarModalQuantidade(nome, quantidade, acompanhamentos);
    const sub = this.subjectAlteracaoPedido.subscribe(
      ({ quantidade, acompanhamentos }) => {
        if (pedidoItemId) {
          this.pedidoStore.atualizarPedidoItem({
            pedidoItemId,
            pratoId,
            grupoId,
            quantidade,
            acompanhamentos,
          });
        } else {
          this.pedidoStore.incluirPedidoItem({
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
