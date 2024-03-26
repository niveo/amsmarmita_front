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
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { getFormValidacoes, validarFormulario } from '../../common/util';

@Component({
  selector: 'app-grupos-component',
  templateUrl: './grupos.component.html',
})
export class GrupoComponent {
  private readonly service = inject(GrupoService);
  private readonly notify = inject(NzNotificationService);
  protected readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(NonNullableFormBuilder);

  data$!: Observable<any[]>;
  loading = true;
  loadingBtn = false;

  validateForm: FormGroup<{
    id: FormControl<string>;
    nome: FormControl<string>;
    principal: FormControl<boolean>;
    multiplo: FormControl<boolean>;
    observacao: FormControl<string>;
  }> = this.fb.group({
    id: [''],
    nome: ['', [Validators.required, ...getFormValidacoes(50)]],
    principal: [false, Validators.required],
    multiplo: [false, Validators.required],
    observacao: [''],
  });

  isVisible = false;

  constructor() {
    this.data$ = this.service.data$;
    this.service.data$.pipe(takeUntilDestroyed(this.destroyRef));
    this.service.data$.subscribe(() => (this.loading = false));
  }

  editar(item: Grupo) {
    this.validateForm.setValue({
      id: item._id,
      nome: item.nome!,
      principal: item.principal,
      multiplo: item.multiplo,
      observacao: item.observacao || '',
    });
    this.isVisible = true;
  }

  remover(item: Grupo) {
    this.loadingBtn = true;
    this.service
      .delete(item._id!)
      .pipe(
        finalize(() => {
          this.loadingBtn = false;
        }),
      )
      .subscribe({
        error: (error) => {
          console.error(error);
          this.notify.error('Erro', error.message);
        },
        next: (value) => {
          console.log(value);
          this.notify.success('Remoção', MSG_EXCLUIR_SUCESSO);
 
        },
      });
  }

  salvar() {
    if (!this.validateForm.valid) {
      validarFormulario(this.validateForm);
      return;
    }

    this.loadingBtn = true;

    const data = this.validateForm.value;

    of(this.validateForm.value.id)
      .pipe(
        mergeMap((value) =>
          iif(
            () => !value,
            this.service.inlcluir({
              nome: data.nome!,
              principal: data.principal!,
              multiplo: data.multiplo!,
              observacao: data.observacao,
            }),
            this.service.atualizar({
              id: value!,
              nome: data.nome!,
              principal: data.principal!,
              multiplo: data.multiplo!,
              observacao: data.observacao,
            }),
          ),
        ),
        catchError((error: any) => {
          console.error(error);
          this.notify.error('Erro', error.message);
          return EMPTY;
        }),
        finalize(() => {
          this.loadingBtn = false;

          this.validateForm.setValue({
            id: '',
            nome: '',
            principal: false,
            multiplo: false,
            observacao: '',
          });

          this.isVisible = false;
        }),
      )
      .subscribe({
        next: (value) => {
          console.log(value);
          this.notify.success('Atualização', MSG_ATUALIZADO_SUCESSO);
 
        },
      });
  }
}
