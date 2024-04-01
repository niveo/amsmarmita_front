import {
  LBL_ALERTA,
  LBL_ERRO,
} from './../common/constantes';
import { Injectable, inject } from '@angular/core';
import { PedidoService } from '../services/pedido.service';
import { BehaviorSubject, EMPTY, catchError, finalize } from 'rxjs';
import { PratoStore } from './prato.store';
import { PedidoPratoService } from '../services/pedido-prato.service';
import { BaseStore } from './base.store';
import { HttpErrorResponse } from '@angular/common/http';
import { PedidoPrato } from '../model/pedido-prato';

@Injectable({
  providedIn: 'root',
})
export class PedidoStore extends BaseStore {
  private readonly _dataSource = new BehaviorSubject<PedidoPrato[]>([]);
  readonly data$ = this._dataSource.asObservable();
  private readonly pedidoService = inject(PedidoService);
  private readonly pedidoPratoService = inject(PedidoPratoService);
  private readonly pratoStore = inject(PratoStore);

  private readonly _quantidade = new BehaviorSubject<number>(0);
  readonly quantidade$ = this._quantidade.asObservable();

  //private pedidoId?: string;

  private comedorId!: string;
  private marmitaId!: string;

  constructor() {
    super();
    this.data$.subscribe(() => this.calcularQuantidade())
  }

  carregarRegistros(marmitaId: string, comedorId: string) {
    this.marmitaId = marmitaId;
    this.comedorId = comedorId;
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
              this.notify.error(LBL_ERRO, response.error.message);
            return EMPTY;
          }),
        )
        .subscribe({
          next: ({ pedido,pratos }) => {
            console.log(pedido, pratos);
            //this.pedidoId = response.pedido._id;
            this.pratoStore.vincularPedidoPrato(pratos);
            this._dataSource.next(pratos);
          },
          error: (response: any) => {
            console.error(response);
          },
          complete: () => {
            subs.unsubscribe();
          }
        });
    })
  }

  removerPratoPedido(pratoId: string) {
    this.iniciarLoading();
    //console.log(`Removendo prato pedido ${JSON.stringify(value)}`);

    const pedidoPrato = this.obterPedidoPrato(pratoId);

    this.pedidoPratoService
      .delete(pedidoPrato!._id!)
      .pipe(
        catchError((error: any) => {
          console.error(error);
          this.notify.error(LBL_ERRO, error.message);
          return EMPTY;
        }),
      )
      .pipe(finalize(() => this.finalizarLoading()))
      .subscribe({
        next: () => {

          const pedidoIndex = this._dataSource.value
            .findIndex((f: any) => f._id === pedidoPrato!._id!);

          this._dataSource.value.splice(pedidoIndex, 1);

          this.calcularQuantidade()

          this.pratoStore.removerPratoPedido(pedidoPrato!.prato!._id!, pedidoPrato!.prato!.grupo!._id);
          // this.notify.success(LBL_EXCLUSAO, MSG_EXCLUIR_SUCESSO);
        },
      });
  }

  atualizarPratoPedido(value: {
    pedidoPratoId: string;
    pratoId: string;
    grupoId: string;
    quantidade: number;
    acompanhamentos: string[]
  }) {
    if (value.quantidade === 0) {
      this.removerPratoPedido(value.pratoId);
      return;
    }
    this.pedidoPratoService
      .atualizar(value.pedidoPratoId, value.quantidade, value.acompanhamentos)
      .pipe(
        catchError((error: any) => {
          console.error(error);
          this.notify.error(LBL_ERRO, error.message);
          return EMPTY;
        }),
      )
      .pipe(finalize(() => this.finalizarLoading()))
      .subscribe({
        next: (response) => {

          console.log(response);
          

          const pedidoIndex = this._dataSource.value
            .findIndex((f: any) => f._id === value.pedidoPratoId);

          const pedido = this._dataSource.value[pedidoIndex];

          pedido.quantidade = response.quantidade;
          pedido.acompanhamentos = response.acompanhamentos;

          this.calcularQuantidade();

          this.pratoStore.atualizarPratoPedido(value);
          // this.notify.success(LBL_ATUALIZACAO, MSG_ATUALIZADO_SUCESSO);
        },
      });
  }

  incluirPratoPedido(value: {
    pratoId: string;
    grupoId: string;
    quantidade: any;
    acompanhamentos: string[]
  }) {
    this.pedidoPratoService
      .inlcluir(this.marmitaId, this.comedorId, value.pratoId, value.quantidade, value.acompanhamentos)
      .pipe(
        catchError((error: any) => {
          console.error(error);
          this.notify.error(LBL_ERRO, error.message);
          return EMPTY;
        }),
      )
      .pipe(finalize(() => this.finalizarLoading()))
      .subscribe({
        next: (response) => {

          this._dataSource.value.push(response);

          this.calcularQuantidade();

          this.pratoStore.incluirPratoPedido({
            ...value,
            pedidoPratoId: response._id,
          });
          // this.notify.success(LBL_ATUALIZACAO, MSG_ATUALIZADO_SUCESSO);
        },
      });
  }

  private calcularQuantidade() {
    const quantidade = this._dataSource.value.reduce((p, c) => {
      return p + c.quantidade!
    }, 0);
    this._quantidade.next(quantidade);
  }

  obterPedidoPrato(pratoId: string) {
    return this._dataSource.value.find(f => f.prato?._id === pratoId)
  }
}
