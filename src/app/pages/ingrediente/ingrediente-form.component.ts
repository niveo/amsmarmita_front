import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { EMPTY, catchError, finalize, iif, mergeMap, of } from 'rxjs';
import {
  LBL_ATUALIZACAO,
  MSG_ATUALIZADO_SUCESSO,
} from '../../common/constantes';
import { Ingrediente } from '../../model';
import { IngredienteService } from '../../services/ingrediente.service';
import { v1 } from 'uuid';

const KEY_NOFITY_SALVAR = v1().toString();

@Component({
  selector: 'app-ingrediente-form-component',
  templateUrl: './ingrediente-form.component.html',
})
export class IngredienteFormComponent {
  private readonly service = inject(IngredienteService);
  private readonly notify = inject(NzNotificationService);
  private readonly formBuilder = inject(FormBuilder);

  readonly #modal = inject(NzModalRef);
  readonly nzModalData: Ingrediente = inject(NZ_MODAL_DATA);

  constructor() {
    this.#modal.updateConfig({
      nzFooter: [
        {
          label: 'Sair',
          onClick: () => this.#modal.close(),
        },
        {
          label: 'Salvar',
          type: 'primary',
          onClick: () =>
            new Promise((resolve, reject) => this.salvar(resolve, reject)),
        },
      ],
    });
  }

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
    this.form.setValue({
      _id: this.nzModalData._id || '',
      nome: this.nzModalData.nome || '',
      observacao: this.nzModalData.observacao || '',
    });
  }

  salvar(resolve: (value: any) => void, reject: (value: any) => void) {
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
          reject(error);
          return EMPTY;
        }),
        finalize(() => {
          this.form.setValue({
            _id: null,
            nome: null,
            observacao: null,
          });
        }),
      )
      .subscribe({
        next: () => {
          resolve(true);
          this.notify.success(LBL_ATUALIZACAO, MSG_ATUALIZADO_SUCESSO, {
            nzKey: KEY_NOFITY_SALVAR,
          });
          this.#modal.close();
        },
      });
  }
}
