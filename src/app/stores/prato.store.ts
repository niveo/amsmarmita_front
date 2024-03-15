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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PratoService } from '../services/prato.service';
import { Prato } from '../model';
import {
  MSG_ATUALIZADO_SUCESSO,
  MSG_EXCLUIR_SUCESSO,
} from '../common/constantes';
import { skipNull } from '../common/rxjs.utils';

@Injectable({
  providedIn: 'root',
})
export class PratoStore extends BaseStore {
  private readonly _dataSource = new BehaviorSubject<
    {
      pratos: Prato[];
      _id: string;
      nome: string;
      principal: boolean;
      observacao?: string | undefined;
    }[]
  >([]);
  readonly data$ = this._dataSource.asObservable();
  private readonly grupoService = inject(GrupoService);
  private readonly service = inject(PratoService);
  pedidoPratoVincular: any;

  constructor() {
    super();
    this.carregar();
  }

  carregar() {
    this.iniciarLoading();

    this.grupoService.data$
      .pipe(
        mergeMap((mp) => {
          return this.service
            .getAll()
            .pipe(
              map((m) => {
                return mp.map((n) => {
                  return {
                    ...n,
                    pratos: m.filter((f) => f.grupo === n._id),
                  };
                });
              }),
            )
            .pipe(
              map((m) => {
                if (this.pedidoPratoVincular) {
                  this.pedidoPratoVincular.pratos.forEach((e: any) => {
                    const grupo = m.find((f) => f._id === e.prato.grupo);
                    const prato = grupo?.pratos.find(
                      (f) => f._id === e.prato._id,
                    );
                    if (prato)
                      prato['pedido'] = {
                        id: e._id,
                        quantidade: e.quantidade,
                      };
                  });
                }
                return m;
              }),
            )
            .pipe(finalize(() => this.finalizarLoading()))
            .pipe(
              catchError((error: any) => {
                this.notify.error('Erro', error.message);
                return EMPTY;
              }),
            )
            .pipe(takeUntilDestroyed(this.destroyRef));
        }),
      )

      .subscribe({
        next: (response) => {
          if (response) {
            this._dataSource.next(response);
          } else {
            this._dataSource.next([]);
          }
        },
      });
  }

  remover(item: Prato) {
    this.service.delete(item._id!).subscribe({
      error: (error) => {
        console.error(error);
        this.notify.error('Erro', error.message);
      },
      next: (value) => {
        console.log(value);
        this.notify.success('Remoção', MSG_EXCLUIR_SUCESSO);
        this.carregar();
      },
    });
  }

  duplicar(item: Prato) {
    this.service
      .duplicar(item._id!!)
      .pipe(
        catchError((error: any) => {
          console.error(error);
          this.notify.error('Erro', error.message);
          return EMPTY;
        }),
      )
      .subscribe({
        next: () => {
          this.notify.success('Atualização', MSG_ATUALIZADO_SUCESSO);
          this.carregar();
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
          this.notify.error('Erro', error.message);

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
          );

          if (pratoIndex !== -1) {
            grupo!.pratos[pratoIndex] = response;
          } else {
            grupo!.pratos.push(response);
          }

          this._dataSource.next([...registros]);

          this.notify.success('Atualização', MSG_ATUALIZADO_SUCESSO);
        },
      });
  }

  limparData() {
    this._dataSource.next([]);
  }

  vincularPedidoPrato(pedidoPratos: any) {
    this.pedidoPratoVincular = pedidoPratos;
    //this.carregar();
    /*    console.log(this._dataSource.getValue());

    this.data$.subscribe();
    

    pedidoPratos.pratos.forEach((e: Prato) => {
  
      console.log(e);
      

      const grupoIndex = this._dataSource
        .getValue()
        .findIndex((f) => f._id === e.grupo);

      const grupo = this._dataSource.getValue()[grupoIndex];

      console.log(grupo);
    }); */
  }
}
