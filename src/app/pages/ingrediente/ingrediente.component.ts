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
  LBL_ATUALIZACAO,
  LBL_EXCLUSAO,
  LBL_ERRO,
} from '../../common/constantes';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IngredienteService } from '../../services/ingrediente.service';
import { Ingrediente } from '../../model';

@Component({
  selector: 'app-ingrediente-component',
  templateUrl: './ingrediente.component.html',
  styles: [
    `
      :host {
        height: 100%;
        background-color: white;
      }
    `,
  ],
})
export class IngredienteComponent {
  private readonly service = inject(IngredienteService);
  private readonly notify = inject(NzNotificationService);
  protected readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(FormBuilder);

  data$!: Observable<any[]>;
  loading = true;
  isVisible = false;

  form: FormGroup<{
    _id: FormControl<string | null>;
    nome: FormControl<string | null>;
    observacao: FormControl<string | null>;
  }> = this.formBuilder.group({
    _id: [''],
    nome: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
    ],
    observacao: ['', Validators.maxLength(100)],
  });

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
        }),
      )
      .pipe(finalize(() => (this.loading = false)));
  }

  editar(item: Ingrediente) {
    this.form.setValue({
      _id: item._id!,
      nome: item.nome!,
      observacao: item.observacao!,
    });
  }

  remover(item: Ingrediente) {
    this.service.delete(item._id!).subscribe({
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

    const data = this.form.value;

    of(data._id)
      .pipe(
        mergeMap((value) =>
          iif(
            () => !value,
            this.service.inlcluir(data.nome!, data.observacao!),
            this.service.atualizar(value!, data.nome!, data.observacao!),
          ),
        ),
        catchError((error: any) => {
          console.error(error);
          this.notify.error('Erro', error.message);
          return EMPTY;
        }),
        finalize(() => {
          this.form.setValue({
            _id: null,
            nome: null,
            observacao: null,
          });
          this.isVisible = false;
        }),
      )
      .subscribe({
        next: () => {
          this.notify.success(LBL_ATUALIZACAO, MSG_ATUALIZADO_SUCESSO);
          this.carregar();
        },
      });
  }
}
