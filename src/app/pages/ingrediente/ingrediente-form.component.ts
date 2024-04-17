import { Component, computed, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY, catchError, finalize, iif, mergeMap, of } from 'rxjs';
import { MSG_ERRO_PROCSSAMENTO } from '@navegador/common/constantes';
import { Ingrediente } from '@navegador/model';
import { IngredienteService } from '@navegador/services/ingrediente.service';
import { BaseFormComponent } from '@navegador/componentes/base-form.component';

@Component({
  selector: 'app-ingrediente-form-component',
  templateUrl: './ingrediente-form.component.html',
})
export class IngredienteFormComponent extends BaseFormComponent<Ingrediente> {
  private readonly service = inject(IngredienteService);

  loading = computed(() => this.service?.loading() || false);

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
      _id: this.data()._id || '',
      nome: this.data().nome || '',
      observacao: this.data().observacao || '',
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
          this._messageService.error(MSG_ERRO_PROCSSAMENTO, JSON.parse(error));
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
          this.visibleChange.emit(false);
        },
      });
  }
}
