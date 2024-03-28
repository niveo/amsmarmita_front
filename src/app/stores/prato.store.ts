import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  EMPTY,
  catchError,
  finalize,
  iif,
  map,
  mergeMap,
  of,
} from 'rxjs';
import { GrupoService } from '../services/grupo.service';
import { BaseStore } from './base.store';
import { PratoService } from '../services/prato.service';
import { Grupo, Prato } from '../model';
import {
  LBL_ATUALIZACAO,
  LBL_ERRO,
  LBL_EXCLUSAO,
  MSG_ATUALIZADO_SUCESSO,
  MSG_EXCLUIR_SUCESSO,
} from '../common/constantes';

@Injectable({
  providedIn: 'root',
})
export class PratoStore extends BaseStore {
  private readonly _dataSource = new BehaviorSubject<Grupo[]>([]);
  readonly data$ = this._dataSource.asObservable();
  private readonly grupoService = inject(GrupoService);
  private readonly service = inject(PratoService);
  pedidoPratoVincular: any;

  constructor() {
    super();
    this.iniciarLoading();
    this.grupoService.data$
      .pipe(map((m) => m.filter((f) => f.principal)))
      .pipe(
        map((m) => {
          if (this.pedidoPratoVincular) {
            this.pedidoPratoVincular.forEach((e: any) => {
              const grupo = m.find((f) => f._id === e.prato.grupo);
              const prato = grupo?.pratos?.find((f) => f._id === e.prato._id);
              if (prato)
                prato['pedido'] = {
                  _id: e._id,
                  quantidade: e.quantidade,
                };
            });
          }
          return m;
        }),
      )
      .subscribe({
        next: (response) => {
          console.log('A');
          if (response) {
            this._dataSource.next(response);
          } else {
            this._dataSource.next([]);
          }
          this.finalizarLoading();
        }
      });
  }

  remover(item: Prato) {
    this.service.delete(item._id!).subscribe({
      error: (error) => {
        console.error(error);
        this.notify.error(LBL_ERRO, error.message);
      },
      next: (value) => {
        console.log(value);
        this.notify.success(LBL_EXCLUSAO, MSG_EXCLUIR_SUCESSO);
        //  this.carregar();
      },
    });
  }

  duplicar(item: Prato) {
    this.service
      .duplicar(item._id!!)
      .pipe(
        catchError((error: any) => {
          console.error(error);
          this.notify.error(LBL_ERRO, error.message);
          return EMPTY;
        }),
      )
      .subscribe({
        next: () => {
          this.notify.success(LBL_ATUALIZACAO, MSG_ATUALIZADO_SUCESSO);
          //  this.carregar();
        },
      });
  }

  salvar(
    data: any,
    resolve: (value: any) => void,
    reject: (error: any) => void,
  ) {
    of(data._id)
      .pipe(
        mergeMap((value) =>
          iif(
            () => !value,
            this.service.inlcluir({
              nome: data.nome!,
              grupoId: data.grupo!,
              composicoes: data.composicoes,
              observacao: data.observacao,
            }),
            this.service.atualizar({
              id: value!,
              nome: data.nome!,
              grupoId: data.grupo!,
              composicoes: data.composicoes,
              observacao: data.observacao,
            }),
          ),
        ),
        catchError((error: any) => {
          console.error(error);
          this.notify.error(LBL_ERRO, error.message);

          reject(error);

          return EMPTY;
        }),
        finalize(() => {
          resolve(true);
        }),
      )
      .subscribe({
        next: (response: Prato) => {
          const registros = this._dataSource.getValue();

          const grupo = registros.find((f) => f._id === response.grupo);

          const pratoIndex = grupo!.pratos?.findIndex(
            (f) => f._id === response._id,
          )!;

          if (pratoIndex !== -1) {
            grupo!.pratos![pratoIndex] = response;
          } else {
            grupo!.pratos!.push(response);
          }

          this._dataSource.next([...registros]);

          this.notify.success(LBL_ATUALIZACAO, MSG_ATUALIZADO_SUCESSO);
        },
      });
  }

  limparData() {
    this._dataSource.next([]);
  }

  vincularPedidoPrato(pedidoPratos: any) {
    this.pedidoPratoVincular = pedidoPratos;
    if (this.pedidoPratoVincular) {
      this.pedidoPratoVincular.forEach((e: any) => {
        const grupo = this._dataSource.value.find(
          (f) => f._id === e.prato.grupo,
        );
        const prato = grupo?.pratos!.find((f) => f._id === e.prato._id);
        if (prato)
          prato['pedido'] = {
            _id: e._id,
            quantidade: e.quantidade,
          };
      });
    }
  }

  removerPratoPedido(value: { pratoId: string; grupoId: string }) {
    const grupoIndex = this._dataSource.value.findIndex(
      (f) => f._id === value.grupoId,
    );
    const pratoIndex = this._dataSource.value[grupoIndex].pratos!.findIndex(
      (f) => f._id === value.pratoId,
    );

    delete this._dataSource.value[grupoIndex].pratos![pratoIndex].pedido;

    this._dataSource.next([...this._dataSource.value]);
  }

  atualizarQuantidadePratoPedido(value: {
    pedidoPratoId: string;
    pratoId: string;
    grupoId: string;
    quantidade: number;
  }) {
    const grupoIndex = this._dataSource.value.findIndex(
      (f) => f._id === value.grupoId,
    );
    const pratoIndex = this._dataSource.value[grupoIndex].pratos!.findIndex(
      (f) => f._id === value.pratoId,
    );

    this._dataSource.value[grupoIndex].pratos![pratoIndex].pedido.quantidade =
      value.quantidade;
  }

  incluirPratoPedido(value: {
    pedidoPratoId: string;
    pratoId: string;
    grupoId: string;
    quantidade: number;
  }) {
    const grupoIndex = this._dataSource.value.findIndex(
      (f) => f._id === value.grupoId,
    );
    const pratoIndex = this._dataSource.value[grupoIndex].pratos!.findIndex(
      (f) => f._id === value.pratoId,
    );

    this._dataSource.value[grupoIndex].pratos![pratoIndex]['pedido'] = {
      _id: value.pedidoPratoId,
      quantidade: value.quantidade,
    };
  }
}
