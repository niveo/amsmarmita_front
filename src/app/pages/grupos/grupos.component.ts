import { v1 } from 'uuid';
import { Component, DestroyRef, Signal, computed, inject } from '@angular/core';
import {
  EMPTY,
  Observable,
  catchError,
  finalize,
  iif,
  mergeMap,
  of,
} from 'rxjs'; 
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
  MSG_EXCLUIR_SUCESSO,
  MSG_ATUALIZADO_SUCESSO,
  LBL_ATUALIZACAO,
  LBL_EXCLUSAO,
  LBL_ERRO,
} from '../../common/constantes';
import { GrupoService } from '../../services/grupo.service';
import { Grupo } from '../../model/grupo';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { validarFormulario } from '../../common/util';

const KEY_NOFITY_SALVAR = v1().toString();

@Component({
  selector: 'app-grupos-component',
  templateUrl: './grupos.component.html',
  styles: [
    `
      :host {
        height: 100%;
        background-color: white;
      }
    `,
  ],
})
export class GrupoComponent {
  private readonly service = inject(GrupoService);
  private readonly notify = inject(NzNotificationService);
  protected readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(NonNullableFormBuilder);

  data$!: Observable<any[]>;
  loading: Signal<boolean> = computed(() => this.service.loading());
  loadingBtn = false;

  validateForm = this.fb.group({
    _id: [''],
    nome: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(25)],
    ],
    principal: [false, Validators.required],
    multiplo: [false, Validators.required],
    observacao: ['', Validators.maxLength(100)],
    cor: [''],
  });

  isVisible = false;

  constructor() {
    this.data$ = this.service.data$;
  }

  editar(item: Grupo) {
    this.validateForm.setValue({
      _id: item._id,
      nome: item.nome!,
      principal: item.principal,
      multiplo: item.multiplo || false,
      observacao: item.observacao || '',
      cor: item.cor || '',
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
          this.notify.error(LBL_ERRO, error.message);
        },
        next: () => {
          this.notify.success(LBL_EXCLUSAO, MSG_EXCLUIR_SUCESSO);
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

    of(this.validateForm.value._id)
      .pipe(
        mergeMap((value) =>
          iif(
            () => !value,
            this.service.inlcluir({
              nome: data.nome!,
              principal: data.principal!,
              multiplo: data.multiplo!,
              observacao: data.observacao,
              cor: data.cor,
            }),
            this.service.atualizar({
              id: value!,
              nome: data.nome!,
              principal: data.principal!,
              multiplo: data.multiplo!,
              observacao: data.observacao,
              cor: data.cor,
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
            _id: '',
            nome: '',
            principal: false,
            multiplo: false,
            observacao: '',
            cor: '',
          });

          this.isVisible = false;
        }),
      )
      .subscribe({
        next: () => {
          this.service.updateData();
          this.notify.success(LBL_ATUALIZACAO, MSG_ATUALIZADO_SUCESSO, {
            nzKey: KEY_NOFITY_SALVAR,
          });
        },
      });
  }
}
