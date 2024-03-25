import {
  LBL_ATUALIZACAO,
  LBL_ERRO,
  LBL_EXCLUSAO,
  MSG_ATUALIZADO_SUCESSO,
  MSG_EXCLUIR_SUCESSO,
} from './../common/constantes';
import { Injectable, inject } from '@angular/core';
import { Prato } from '../model';
import { PedidoService } from '../services/pedido.service';
import { BehaviorSubject, EMPTY, catchError, finalize } from 'rxjs';
import { PratoStore } from './prato.store';
import { PedidoPratoService } from '../services/pedido-prato.service';
import { BaseStore } from './base.store';

@Injectable({
  providedIn: 'root',
})
export class PedidoStore extends BaseStore {
  private readonly _dataSource = new BehaviorSubject<any>(null);
  readonly data$ = this._dataSource.asObservable();
  private readonly pedidoService = inject(PedidoService);
  private readonly pedidoPratoService = inject(PedidoPratoService);
  private readonly pratoStore = inject(PratoStore);

  private pedidoId?: string;

  carregarRegistros(marmitaId: string, comedorId: string) {
    this.pedidoService.getMarmitaId(marmitaId, comedorId).subscribe({
      next: (response: any) => {
        this.pedidoId = response.pedido._id;

        this.pratoStore.vincularPedidoPrato(response);

        this._dataSource.next(response);
      },
      error: (response: any) => {
        console.log(response);
      },
    });
  }

  removerPratoPedido(value: {
    pedidoPratoId: string;
    pratoId: string;
    grupoId: string;
  }) {
    this.iniciarLoading();
    //console.log(`Removendo prato pedido ${JSON.stringify(value)}`);
    this.pedidoPratoService
      .delete(value.pedidoPratoId)
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
          this.pratoStore.removerPratoPedido(value);
          this.notify.success(LBL_EXCLUSAO, MSG_EXCLUIR_SUCESSO);
        },
      });
  }

  atualizarQuantidadePratoPedido(value: {
    pedidoPratoId: string;
    pratoId: string;
    grupoId: string;
    quantidade: number;
  }) {
    this.pedidoPratoService
      .atualizar(value.pedidoPratoId, value.quantidade)
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
          this.pratoStore.atualizarQuantidadePratoPedido(value);
          this.notify.success(LBL_ATUALIZACAO, MSG_ATUALIZADO_SUCESSO);
        },
      });
  }

  incluirPratoPedido(value: {
    pratoId: string;
    grupoId: string;
    quantidade: any;
  }) {
    this.pedidoPratoService
      .inlcluir(this.pedidoId!, value.pratoId, value.quantidade)
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
          this.pratoStore.incluirPratoPedido({
            ...value,
            pedidoPratoId: response,
          });
          this.notify.success(LBL_ATUALIZACAO, MSG_ATUALIZADO_SUCESSO);
        },
      });
  }
}
