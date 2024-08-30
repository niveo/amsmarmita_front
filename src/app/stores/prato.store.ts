import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  EMPTY,
  catchError,
  from,
  iif,
  map,
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

  remover(registroId: string) {
    this.service.delete(registroId).subscribe({
      error: (error) => {
        console.error(error);
        super.errorMessage(MSG_ERRO_PROCSSAMENTO, error);
      },
      next: (value) => {
        if (value) {
          super.sucessMessage(MSG_EXCLUIR_SUCESSO);

          this._dataSource.value.forEach((g) => {
            g.pratos?.findIndex((p) => p._id === registroId);
          });

          from(this._dataSource.value)
            .pipe(
              map((mp, index) => {
                return {
                  grupoIndex: index,
                  pratoIndex: mp.pratos?.findIndex(
                    (f) => f._id === registroId,
                  )!,
                };
              }),
            )
            .subscribe((response) => {
              this._dataSource.value[response.grupoIndex].pratos?.splice(
                response.pratoIndex,
                1,
              );
            });
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
          super.errorMessage(MSG_ERRO_PROCSSAMENTO, error);
          return EMPTY;
        }),
      )
      .subscribe({
        next: () => {
          super.sucessMessage(MSG_ATUALIZADO_SUCESSO);
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
    icone,
    pratoIngredientes
  }: {
    _id?: string | null;
    nome?: string;
    grupo?: string;
    composicoes?: string[] | null;
    observacao?: string | null;
    ingredientes?: string[] | null;
    icone?: string | null;
    pratoIngredientes?: any[] | null;
  }) {
    return of(_id)
      .pipe(
        mergeMap((value) =>
          iif(
            () => !value,
            this.service.inlcluir({
              nome: nome!,
              grupoId: grupo!,
              composicoes,
              observacao,
              ingredientes,
              icone,
              pratoIngredientes
            }),
            this.service.atualizar({
              id: value!,
              nome: nome!,
              grupoId: grupo!,
              composicoes,
              observacao,
              ingredientes,
              icone,
              pratoIngredientes
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
