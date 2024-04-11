import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EMPTY, catchError, finalize, iif, mergeMap, of } from 'rxjs';
import { LBL_ERRO, MSG_ERRO_PROCSSAMENTO } from '@navegador/common/constantes';
import { Grupo } from '@navegador/model';
import { GrupoService } from '@navegador/services/grupo.service';
import { validarFormulario } from '@navegador/common/util';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-grupos-form-component',
  templateUrl: './grupos-form.component.html',
  styles: `
    :host {
      background-color: white;
      height: 100%;
    }
  `,
})
export class GrupoFormComponent {
  private readonly service = inject(GrupoService);
  private readonly formBuilder = inject(FormBuilder);
  protected readonly _snackBar = inject(MatSnackBar);

  visible = input.required<boolean>();
  visibleChange = output<boolean>();
  isConfirmLoading = false;
  data = input.required<Grupo>();

  form = this.formBuilder.group({
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

  ngOnInit() {
    this.form.setValue({
      _id: this.data()._id || '',
      nome: this.data().nome! || '',
      principal: this.data().principal || false,
      multiplo: this.data().multiplo || false,
      observacao: this.data().observacao || '',
      cor: this.data().cor || '',
    });
  }

  salvar() {
    if (!this.form.valid) {
      validarFormulario(this.form);
      return;
    }

    const data = this.form.value;

    this.isConfirmLoading = true;

    of(this.form.value._id)
      .pipe(
        mergeMap((value) =>
          iif(
            () => !value,
            this.service.inlcluir({
              nome: data.nome!,
              principal: data.principal!,
              multiplo: data.multiplo!,
              observacao: data.observacao || '',
              cor: data.cor || '',
            }),
            this.service.atualizar({
              id: value!,
              nome: data.nome!,
              principal: data.principal!,
              multiplo: data.multiplo!,
              observacao: data.observacao || '',
              cor: data.cor || '',
            }),
          ),
        ),
        catchError((error: any) => {
          console.error(error);
          this._snackBar.open(MSG_ERRO_PROCSSAMENTO, 'OK');
          this.isConfirmLoading = false;
          return EMPTY;
        }),
        finalize(() => {
          this.form.setValue({
            _id: '',
            nome: '',
            principal: false,
            multiplo: false,
            observacao: '',
            cor: '',
          });
          this.isConfirmLoading = false;
        }),
      )
      .subscribe({
        next: () => {
          this.visibleChange.emit(false);
        },
      });
  }
}
