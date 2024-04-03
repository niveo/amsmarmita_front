import { v1 } from 'uuid';
import { Component, DestroyRef, inject, input, output } from '@angular/core';
import {
  EMPTY,
  Observable,
  catchError,
  finalize,
  iif,
  mergeMap,
  of,
} from 'rxjs';
import { ComedoresService } from '../../services/comedores.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Comedor } from '../../model/comedor';
import {
  MSG_EXCLUIR_SUCESSO,
  MSG_ATUALIZADO_SUCESSO,
  LBL_ATUALIZACAO,
  LBL_ERRO,
  LBL_EXCLUSAO,
} from '../../common/constantes';
import { isBooleanTransform } from '../../common/util';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

const KEY_NOFITY_SALVAR = v1().toString();

@Component({
  selector: 'app-comedores-component',
  templateUrl: './comedores.component.html',
  styleUrl: './comedores.component.scss',
})
export class ComedoresComponent {
  private readonly comedoreService = inject(ComedoresService);
  private readonly notify = inject(NzNotificationService);
  protected readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(FormBuilder);

  data$!: Observable<any[]>;
  loading = true;
  loadingBtn = false;

  tipoSelecao = input(false, { transform: isBooleanTransform });
  eventComedorTipoSelecao = output<string>();

  form: FormGroup<{
    _id: FormControl<string | null>;
    nome: FormControl<string | null>;
  }> = this.formBuilder.group({
    _id: [''],
    nome: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(25)],
    ],
  });

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
          this.notify.error(LBL_ERRO, error.message);
          return EMPTY;
        }),
      )
      .pipe(finalize(() => (this.loading = false)));
  }

  editar(item: Comedor) {
    this.form.setValue({
      _id: item._id!,
      nome: item.nome!,
    });
  }

  remover(item: Comedor) {
    this.loadingBtn = true;
    this.comedoreService
      .delete(item._id!)
      .pipe(
        finalize(() => {
          this.loadingBtn = false;
        }),
      )
      .subscribe({
        error: (error) => {
          console.error(error);
          this.notify.error(LBL_ERRO, error.message);
        },
        next: () => {
          this.notify.success(LBL_EXCLUSAO, MSG_EXCLUIR_SUCESSO);
          this.carregar();
        },
      });
  }

  salvar() {
    if (!this.form.valid) return;

    this.loadingBtn = true;

    const data = this.form.value;

    of(data._id)
      .pipe(
        mergeMap((value) =>
          iif(
            () => !value,
            this.comedoreService.inlcluir(data.nome!),
            this.comedoreService.atualizar(value!, data.nome!),
          ),
        ),
        catchError((error: any) => {
          console.error(error);
          this.notify.error(LBL_ERRO, error.message);
          return EMPTY;
        }),
        finalize(() => {
          this.loadingBtn = false;
          this.form.setValue({
            _id: null,
            nome: '',
          });
        }),
      )
      .subscribe({
        next: () => {
          this.notify.success(LBL_ATUALIZACAO, MSG_ATUALIZADO_SUCESSO, {
            nzKey: KEY_NOFITY_SALVAR,
          });
          this.carregar();
        },
      });
  }

  selecionarComedor(comedor: Comedor) {
    if (this.tipoSelecao()) this.eventComedorTipoSelecao.emit(comedor._id!);
  }
}
