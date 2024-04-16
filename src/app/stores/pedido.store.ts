import { MSG_ERRO_PROCSSAMENTO } from './../common/constantes';
import { Injectable, inject, signal } from '@angular/core';
import { PedidoService } from '../services/pedido.service';
import { BehaviorSubject, EMPTY, Subject, catchError, finalize } from 'rxjs';
import { PratoStore } from './prato.store';
import { PedidoItemService } from '../services/pedido-prato.service';
import { BaseStore } from './base.store';
import { HttpErrorResponse } from '@angular/common/http';
import { PedidoItem } from '../model/pedido-item';

@Injectable({
  providedIn: 'root',
})
export class PedidoStore extends BaseStore {
  private readonly _dataSource = new BehaviorSubject<PedidoItem[]>([]);
  readonly data$ = this._dataSource.asObservable();
  private readonly pedidoService = inject(PedidoService);
  private readonly pedidoItemService = inject(PedidoItemService);
  private readonly pratoStore = inject(PratoStore);

  private comedorId!: string;
  private marmitaId!: string;

  readonly quantidadeItens = signal(0);
  readonly quantidadeRegistros = signal(0);

  subSucess = new Subject<void>();

  constructor() {
    super();
    this.data$.subscribe(() => this.calcularQuantidade());
  }

  carregarRegistros(marmitaId: string, comedorId: string) {
    this.marmitaId = marmitaId;
    this.comedorId = comedorId;
    this.quantidadeRegistros.set(0);
    this.iniciarLoading();
    const subs = this.pratoStore.data$.subscribe((data) => {
      if (data === null || data === undefined || data.length === 0) return;
      this.pedidoService
        .getMarmitaId(marmitaId, comedorId)
        .pipe(finalize(() => this.finalizarLoading()))
        .pipe(
          catchError((response: HttpErrorResponse) => {
            console.error(response.error);
            if (response.error.tipo === 0)
              this.errorMessage(MSG_ERRO_PROCSSAMENTO, response.error);

            this.pratoStore.vincularPedidoItem([]);
            this._dataSource.next([]);

            return EMPTY;
          }),
        )
        .subscribe({
          next: ({ pratos }) => {
            this.quantidadeRegistros.set(pratos.length);
            this.pratoStore.vincularPedidoItem(pratos);
            this._dataSource.next(pratos);
          },
          complete: () => {
            subs.unsubscribe();
          },
        });
    });
  }

  removerPedidoItem(pratoId: string) {
    this.iniciarLoading();

    const pedidoItem = this.obterPedidoItem(pratoId);

    this.pedidoItemService
      .delete(pedidoItem!._id!)
      .pipe(
        catchError((error: any) => {
          console.error(error);
          this.errorMessage(MSG_ERRO_PROCSSAMENTO, error);
          return EMPTY;
        }),
      )
      .pipe(finalize(() => this.finalizarLoading()))
      .subscribe({
        next: () => {
          const pedidoIndex = this._dataSource.value.findIndex(
            (f: any) => f._id === pedidoItem!._id!,
          );

          this.pratoStore.removerPedidoItemPratoId(pedidoItem?.prato?._id!);

          this._dataSource.value.splice(pedidoIndex, 1);

          this.calcularQuantidade();
        },
      });
  }

  atualizarPedidoItem(value: {
    pedidoItemId: string;
    pratoId: string;
    grupoId: string;
    quantidade: number;
    acompanhamentos: string[];
    observacao?: string;
  }) {
    if (value.quantidade === 0) {
      this.removerPedidoItem(value.pratoId);
      return;
    }
    this.pedidoItemService
      .atualizar(
        value.pedidoItemId,
        value.quantidade,
        value.acompanhamentos,
        value.observacao,
      )
      .pipe(
        catchError((error: any) => {
          console.error(error);
          this.errorMessage(MSG_ERRO_PROCSSAMENTO, error);
          return EMPTY;
        }),
      )
      .pipe(finalize(() => this.finalizarLoading()))
      .subscribe({
        next: (response) => {
          const pedidoIndex = this._dataSource.value.findIndex(
            (f: any) => f._id === value.pedidoItemId,
          );

          const pedido = this._dataSource.value[pedidoIndex];

          pedido.quantidade = response.quantidade;
          pedido.acompanhamentos = response.acompanhamentos;
          pedido.observacao = response.observacao;

          this.calcularQuantidade();

          this.subSucess.next();
        },
      });
  }

  incluirPedidoItem(value: {
    pratoId: string;
    grupoId: string;
    quantidade: any;
    acompanhamentos: string[];
    observacao?: string;
  }) {
    this.pedidoItemService
      .inlcluir(
        this.marmitaId,
        this.comedorId,
        value.pratoId,
        value.quantidade,
        value.acompanhamentos,
        value.observacao,
      )
      .pipe(
        catchError((error: any) => {
          console.error(error);
          this.errorMessage(MSG_ERRO_PROCSSAMENTO, error);
          return EMPTY;
        }),
      )
      .pipe(finalize(() => this.finalizarLoading()))
      .subscribe({
        next: (response) => {
          this._dataSource.value.push(response);

          this.calcularQuantidade();

          this.pratoStore.vincularPedidoItemPratoId(value.pratoId);

          this.subSucess.next();
        },
      });
  }

  private calcularQuantidade() {
    const quantidade = this._dataSource.value.reduce((p, c) => {
      return p + c.quantidade!;
    }, 0);
    this.quantidadeItens.set(quantidade);
    this.quantidadeRegistros.set(this._dataSource.value.length);
  }

  obterPedidoItem(pratoId: string) {
    return this._dataSource.value.find((f) => f.prato?._id === pratoId);
  }
}
