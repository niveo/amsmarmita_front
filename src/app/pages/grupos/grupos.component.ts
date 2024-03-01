import { Component, DestroyRef, inject } from '@angular/core';
import {
  EMPTY,
  Observable,
  catchError,
  finalize,
  iif,
  mergeMap,
  of,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
  MSG_EXCLUIR_SUCESSO,
  MSG_ATUALIZADO_SUCESSO,
} from '../../common/constantes';
import { GrupoService } from '../../services/grupo.service';
import { Grupo } from '../../model/grupo';

@Component({
  selector: 'app-grupos-component',
  templateUrl: './grupos.component.html',
})
export class GrupoComponent {
  private readonly service = inject(GrupoService);
  private readonly notify = inject(NzNotificationService);
  protected readonly destroyRef = inject(DestroyRef);
  data$!: Observable<any[]>;
  loading = true;
  loadingBtn = false;

  grupoId?: string;
  grupoNome?: string;
  grupoPrincipal: boolean = false;

  isVisible = false;

  ngOnInit() {
    this.carregar();
  }

  private carregar() {
    this.loading = true;
    this.data$ = this.service
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .pipe(
        catchError((error: any) => {
          this.notify.error('Erro', error.message);
          return EMPTY;
        })
      )
      .pipe(finalize(() => (this.loading = false)));
  }

  editar(item: Grupo) {
    this.grupoNome = item.nome;
    this.grupoPrincipal = item.principal;
    this.grupoId = item._id;
    this.isVisible = true;
  }

  remover(item: Grupo) {
    this.loadingBtn = true;
    this.service
      .delete(item._id!)
      .pipe(
        finalize(() => {
          this.loadingBtn = false;
        })
      )
      .subscribe({
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

  salvar() {
    if (!this.grupoNome) return;

    this.loadingBtn = true;

    of(this.grupoId!)
      .pipe(
        mergeMap((value) =>
          iif(
            () => !value,
            this.service.inlcluir(this.grupoNome!, this.grupoPrincipal),
            this.service.atualizar(value, this.grupoNome!, this.grupoPrincipal)
          )
        ),
        catchError((error: any) => {
          console.error(error);
          this.notify.error('Erro', error.message);
          return EMPTY;
        }),
        finalize(() => {
          this.loadingBtn = false;
          this.grupoId = undefined;
          this.grupoNome = undefined;
          this.grupoPrincipal = false;
          this.isVisible = false;
        })
      )
      .subscribe({
        next: (value) => {
          console.log(value);
          this.notify.success('Atualização', MSG_ATUALIZADO_SUCESSO);
          this.carregar();
        },
      });
  }
}
