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
import { PedidoItem } from '../model/pedido-item';

@Injectable({
  providedIn: 'root',
})
export class PratoStore extends BaseStore {
  private readonly _dataSource = new BehaviorSubject<Grupo[]>([]);
  readonly data$ = this._dataSource.asObservable();
  private readonly grupoService = inject(GrupoService);
  private readonly service = inject(PratoService);

  pedidoItemVinculado: any = {};

  constructor() {
    super();
    this.iniciarLoading();
    this.grupoService.data$.subscribe({
      next: (response) => {
        if (response) {
          this._dataSource.next(response);
        } else {
          this._dataSource.next([]);
        }
        this.finalizarLoading();
      },
    });
  }

  remover(item: Prato) {
    console.log(item);

    this.service.delete(item._id!).subscribe({
      error: (error) => {
        console.error(error);
        this.notify.error(LBL_ERRO, error.message);
      },
      next: (value) => {
        if (value) {
          this.notify.success(LBL_EXCLUSAO, MSG_EXCLUIR_SUCESSO);

          const grupoIndex = this._dataSource.value.findIndex(
            (f) => f._id === item.grupo?._id,
          );

          const pratoIndex = this._dataSource.value[
            grupoIndex
          ].pratos?.findIndex((f) => f._id === item._id)!;

          this._dataSource.value[grupoIndex].pratos?.splice(pratoIndex, 1);
        }
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
    data: {
      _id?: string;
      nome?: string;
      grupo?: string;
      composicoes?: string[];
      observacao?: string;
    },
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

          const grupo = registros.find((f) => f._id === response.grupo?._id);

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

  vincularPedidoItem(registros: PedidoItem[]) {
    this.pedidoItemVinculado = {};

    registros?.forEach((e: PedidoItem) => {
      this.pedidoItemVinculado[e.prato?._id!] = true;
    });
  }

  vincularPedidoItemPratoId(pratoId: string) {
    this.pedidoItemVinculado[pratoId] = true;
  }

  removerPedidoItemPratoId(pratoId: string) {
    delete this.pedidoItemVinculado[pratoId];
  }
}
