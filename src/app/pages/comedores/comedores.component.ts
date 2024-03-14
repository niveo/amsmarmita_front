import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  Output,
  booleanAttribute,
  inject,
} from '@angular/core';
import {
  EMPTY,
  Observable,
  catchError,
  finalize,
  iif,
  isEmpty,
  map,
  mergeMap,
  of,
} from 'rxjs';
import { ComedoresService } from 'src/app/services/comedores.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Comedor } from '../../model/comedor';
import {
  MSG_EXCLUIR_SUCESSO,
  MSG_ATUALIZADO_SUCESSO,
} from 'src/app/common/constantes';

@Component({
  selector: 'app-comedores-component',
  templateUrl: './comedores.component.html',
})
export class ComedoresComponent {
  private readonly comedoreService = inject(ComedoresService);
  private readonly notify = inject(NzNotificationService);
  protected readonly destroyRef = inject(DestroyRef);
  data$!: Observable<any[]>;
  loading = true;
  loadingBtn = false;
  comedoreId?: string;
  comedoreNome?: string;

  @Input({ transform: booleanAttribute })
  tipoSelecao = false;

  @Output()
  eventComedorTipoSelecao = new EventEmitter<string>();

  ngOnInit() {
    this.carregar();
  }
  
  private carregar() {
    this.loading = true;
    this.data$ = this.comedoreService
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

  editar(item: Comedor) {
    this.comedoreNome = item.nome;
    this.comedoreId = item._id;
  }

  remover(item: Comedor) {
    this.loadingBtn = true;
    this.comedoreService
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
    if (!this.comedoreNome) return;

    this.loadingBtn = true;

    of(this.comedoreId!)
      .pipe(
        mergeMap((value) =>
          iif(
            () => !value,
            this.comedoreService.inlcluir(this.comedoreNome!),
            this.comedoreService.atualizar(value, this.comedoreNome!)
          )
        ),
        catchError((error: any) => {
          console.error(error);
          this.notify.error('Erro', error.message);
          return EMPTY;
        }),
        finalize(() => {
          this.loadingBtn = false;
          this.comedoreNome = undefined;
          this.comedoreId = undefined;
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

  selecionarComedor(comedor: Comedor) {
    this.eventComedorTipoSelecao.emit(comedor._id);
  }
}
