import {
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subject } from 'rxjs';
import { PedidoStore } from '@navegador/stores/pedido.store';
import { Prato } from '@navegador/model';
import { PedidoItem } from '@navegador/model/pedido-item';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { MSG_CONFIRMAR_EXCLUSAO } from '@navegador/common/constantes';
import { NotificationDialogService, NotificationService } from 'amslib';

@Component({
  selector: 'app-pedidos-component',
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss',
})
export class PedidosComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly pedidoStore = inject(PedidoStore);
  private readonly formBuilder = inject(FormBuilder);
  private readonly _notificationDialogService = inject(
    NotificationDialogService,
  );
  private readonly _messageService = inject(NotificationService);

  @ViewChild('drawer', { static: true }) drawer!: MatSidenav;

  data$: Observable<PedidoItem[]> = this.pedidoStore.data$;

  alteracaoPedidoTitulo = '';
  alteracaoPedidoQuantidade?: number;
  alteracaoPedidoAcompanhamentos: string[] = [];
  alteracaoPratoId?: string;
  alteracaoGrupoId?: string;
  alteracaoPedidoItemId?: string;

  alteracaoPedidoForm: FormGroup<{
    observacao: FormControl<string | null>;
  }> = this.formBuilder.group({
    observacao: ['', [Validators.maxLength(100)]],
  });

  listaQuantidadePedido: number[] = [];

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

    this.pedidoStore.subSucess.subscribe(() => {
      this.limparCamposAlteracaoPedido();
    });
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

  removerPedidoItem(pratoId: string) {
    this._notificationDialogService
      .confirmation({ mensagem: MSG_CONFIRMAR_EXCLUSAO })
      .afterClosed()
      .subscribe((response) =>
        response ? this.pedidoStore.removerPedidoItem(pratoId) : '',
      );
  }

  incluirPratoPedido(value: {
    nome: string;
    pratoId: string;
    grupoId: string;
  }) {
    console.log('incluirPratoPedido: ', value);

    this.atualizarIncluirPrato({
      pedidoItemId: null,
      nome: value.nome,
      pratoId: value.pratoId,
      grupoId: value.grupoId,
      quantidade: 0,
      acompanhamentos: [],
    });
  }

  editarPedidoItem(pratoId: string) {
    const pedidoItem = this.pedidoStore.obterPedidoItem(pratoId);
    console.log('editarPedidoItem: ', pedidoItem);
    this.atualizarIncluirPrato({
      pedidoItemId: pedidoItem!._id!,
      nome: pedidoItem!.prato!.nome!,
      pratoId: pedidoItem!.prato!._id!,
      grupoId: pedidoItem!.prato!.grupo!._id,
      quantidade: pedidoItem!.quantidade!,
      acompanhamentos: pedidoItem!.acompanhamentos!,
      observacao: pedidoItem!.observacao,
    });
  }

  private atualizarIncluirPrato({
    pedidoItemId,
    nome,
    pratoId,
    grupoId,
    quantidade,
    acompanhamentos,
    observacao,
  }: {
    pedidoItemId?: string;
    nome: string;
    pratoId: string;
    grupoId: string;
    quantidade: number;
    acompanhamentos: Prato[];
    observacao?: string;
  }) {
    this.carregarModalQuantidade(
      nome,
      quantidade,
      acompanhamentos,
      observacao,
      pratoId,
      grupoId,
      pedidoItemId,
    );
  }

  private carregarModalQuantidade(
    titulo: string,
    quantidade: number,
    acompanhamentos: Prato[] = [],
    observacao?: string,
    pratoId?: string,
    grupoId?: string,
    pedidoItemId?: string,
  ) {
    this.alteracaoPedidoTitulo = titulo;
    this.alteracaoPedidoAcompanhamentos = acompanhamentos.map((m) => m._id!);
    this.alteracaoPedidoQuantidade = quantidade;
    this.alteracaoPedidoForm.get('observacao')?.setValue(observacao || '');
    this.alteracaoPratoId = pratoId;
    this.alteracaoGrupoId = grupoId;
    this.alteracaoPedidoItemId = pedidoItemId;

    this.drawer.open();
  }

  closeAlteracaoPedido() {
    this.limparCamposAlteracaoPedido();
  }

  salvarAlteracaoPedido() {
    if (
      !this.alteracaoPedidoQuantidade ||
      this.alteracaoPedidoQuantidade === 0
    ) {
      this._messageService.warning('Informe uma quantidade!');
      return;
    }

    const observacao =
      this.alteracaoPedidoForm.get('observacao')?.value || undefined;

    if (this.alteracaoPedidoItemId) {
      this.pedidoStore.atualizarPedidoItem({
        pedidoItemId: this.alteracaoPedidoItemId,
        pratoId: this.alteracaoPratoId,
        grupoId: this.alteracaoGrupoId,
        quantidade: this.alteracaoPedidoQuantidade,
        acompanhamentos: this.alteracaoPedidoAcompanhamentos,
        observacao: observacao,
      });
    } else {
      this.pedidoStore.incluirPedidoItem({
        pratoId: this.alteracaoPratoId,
        grupoId: this.alteracaoGrupoId,
        quantidade: this.alteracaoPedidoQuantidade,
        acompanhamentos: this.alteracaoPedidoAcompanhamentos,
        observacao: observacao,
      });
    }
  }

  private limparCamposAlteracaoPedido() {
    this.drawer.close();
    this.alteracaoPedidoTitulo = '';
    this.alteracaoPedidoAcompanhamentos = [];
    this.alteracaoPedidoQuantidade = undefined;
    this.alteracaoPedidoForm.get('observacao')?.setValue('');
    this.alteracaoPratoId = undefined;
    this.alteracaoGrupoId = undefined;
    this.alteracaoPedidoItemId = undefined;
  }
}
