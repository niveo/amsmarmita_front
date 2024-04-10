import { v1 } from 'uuid';
import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  EMPTY,
  catchError,
  iif,
  mergeMap,
  of,
  tap,
} from 'rxjs';
import { GrupoService } from '../services/grupo.service';
import { BaseStore } from './base.store';
import { PratoService } from '../services/prato.service';
import { Grupo, Prato } from '../model';
import {
  MSG_ATUALIZADO_SUCESSO,
  MSG_ERRO_PROCSSAMENTO,
  MSG_EXCLUIR_SUCESSO,
} from '../common/constantes';
import { PedidoItem } from '../model/pedido-item';

const KEY_NOFITY_SALVAR = v1().toString();

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
    this.service.delete(item._id!).subscribe({
      error: (error) => {
        console.error(error);
        this._snackBar.open(MSG_ERRO_PROCSSAMENTO, 'OK');
      },
      next: (value) => {
        if (value) {
          this._snackBar.open(MSG_EXCLUIR_SUCESSO, 'OK', { duration: 300 });

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
          this._snackBar.open(MSG_ERRO_PROCSSAMENTO, 'OK');
          return EMPTY;
        }),
      )
      .subscribe({
        next: () => {
          this._snackBar.open(MSG_ATUALIZADO_SUCESSO, 'OK', { duration: 300 });
          //  this.carregar();
        },
      });
  }

  salvar({
    _id,
    nome,
    grupo,
    composicoes,
    observacao,
    ingredientes,
  }: {
    _id?: string | null;
    nome?: string;
    grupo?: string;
    composicoes?: string[] | null;
    observacao?: string | null;
    ingredientes?: string[] | null;
  }) {
    return of(_id)
      .pipe(
        mergeMap((value) =>
          iif(
            () => !value,
            this.service.inlcluir({
              nome: nome!,
              grupoId: grupo!,
              composicoes: composicoes,
              observacao: observacao,
              ingredientes: ingredientes,
            }),
            this.service.atualizar({
              id: value!,
              nome: nome!,
              grupoId: grupo!,
              composicoes: composicoes,
              observacao: observacao,
              ingredientes: ingredientes,
            }),
          ),
        ),
      )
      .pipe(
        tap({
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
          },
        }),
      );
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
