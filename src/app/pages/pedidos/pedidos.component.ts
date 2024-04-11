import { ConfirmacaoDialog } from 'src/app/common/confirmacao-dialog';
import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  Signal,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subject } from 'rxjs';
import { PedidoStore } from '../../stores/pedido.store';
import { Prato } from '../../model';
import { PedidoItem } from '../../model/pedido-item';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSidenav } from '@angular/material/sidenav';
import { MSG_CONFIRMAR_EXCLUSAO } from '@navegador/common/constantes';

@Component({
  selector: 'app-pedidos-component',
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss',
})
export class PedidosComponent implements OnInit, OnDestroy {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly pedidoStore = inject(PedidoStore);
  private readonly formBuilder = inject(FormBuilder);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _confirmacaoDialog = inject(ConfirmacaoDialog);

  @ViewChild('drawer', { static: true }) drawer!: MatSidenav;

  data$: Observable<PedidoItem[]> = this.pedidoStore.data$;

  alteracaoPedidoTitulo = '';
  alteracaoPedidoQuantidade?: number;
  alteracaoPedidoAcompanhamentos: string[] = [];

  alteracaoPedidoForm: FormGroup<{
    observacao: FormControl<string | null>;
  }> = this.formBuilder.group({
    observacao: ['', [Validators.maxLength(100)]],
  });

  listaQuantidadePedido: number[] = [];

  subjectAlteracaoPedido = new Subject<{
    quantidade: number;
    acompanhamentos: string[];
    observacao?: string;
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

  removerPedidoItem(pratoId: string) {
    this._confirmacaoDialog
      .confirmacao({ mensagem: MSG_CONFIRMAR_EXCLUSAO })
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
    this.carregarModalQuantidade(nome, quantidade, acompanhamentos, observacao);
    const sub = this.subjectAlteracaoPedido.subscribe(
      ({ quantidade, acompanhamentos, observacao }) => {
        if (pedidoItemId) {
          this.pedidoStore.atualizarPedidoItem({
            pedidoItemId,
            pratoId,
            grupoId,
            quantidade,
            acompanhamentos,
            observacao,
          });
        } else {
          this.pedidoStore.incluirPedidoItem({
            pratoId: pratoId,
            grupoId: grupoId,
            quantidade: quantidade,
            acompanhamentos: acompanhamentos,
            observacao,
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
    observacao?: string,
  ) {
    this.alteracaoPedidoTitulo = titulo;
    this.alteracaoPedidoAcompanhamentos = acompanhamentos.map((m) => m._id!);
    this.alteracaoPedidoQuantidade = quantidade;
    this.alteracaoPedidoForm.get('observacao')?.setValue(observacao || '');

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
      this._snackBar.open('Informe uma quantidade!', 'OK', { duration: 300 });
      return;
    }

    this.subjectAlteracaoPedido.next({
      quantidade: this.alteracaoPedidoQuantidade!,
      acompanhamentos: this.alteracaoPedidoAcompanhamentos,
      observacao:
        this.alteracaoPedidoForm.get('observacao')?.value || undefined,
    });

    this.limparCamposAlteracaoPedido();
  }

  private limparCamposAlteracaoPedido() {
    this.drawer.close();
    this.alteracaoPedidoTitulo = '';
    this.alteracaoPedidoAcompanhamentos = [];
    this.alteracaoPedidoQuantidade = undefined;
    this.alteracaoPedidoForm.get('observacao')?.setValue('');
  }
}
