import { MSG_ATUALIZADO_SUCESSO } from './../../common/constantes';
import { Component, computed, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY, catchError, finalize, iif, mergeMap, of } from 'rxjs';
import { MSG_ERRO_PROCSSAMENTO } from '@navegador/common/constantes';
import { Ingrediente } from '@navegador/model';
import { IngredienteService } from '@navegador/services/ingrediente.service';
import { BaseFormComponent } from '@navegador/componentes/base-form.component';
import { parseErroResponse } from '@navegador/common/util';
import { TipoMedida } from '@navegador/enuns/tipomedida.enum';
import { TipoIngrediente } from '@navegador/enuns/tipoingrediente.enum';

@Component({
  selector: 'app-ingrediente-form-component',
  templateUrl: './ingrediente-form.component.html',
})
export class IngredienteFormComponent extends BaseFormComponent<Ingrediente> {
  private readonly service = inject(IngredienteService);

  loading = computed(() => this.service?.loading() || false);

  tipos = Object.values(TipoIngrediente)
  medidas = Object.values(TipoMedida)

  form: FormGroup<{
    _id: FormControl<string | null>;
    nome: FormControl<string | null>;
    observacao: FormControl<string | null>;
    tipo: FormControl<string | null>;
    embalagemQuantidade: FormControl<number | null>;
    embalagemMedida: FormControl<string | null>;
  }> = this.formBuilder.group({
    _id: [''],
    nome: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
    ],
    observacao: ['', Validators.maxLength(100)],
    tipo: [''],
    embalagemQuantidade: [],
    embalagemMedida: [''],
  });

  ngOnInit() {
    this.form.setValue({
      _id: this.data()._id || '',
      nome: this.data().nome || '',
      observacao: this.data().observacao || '',
      tipo: this.data().tipo || null,
      embalagemQuantidade: this.data().embalagemQuantidade || null,
      embalagemMedida: this.data().embalagemMedida || null,
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
            this.service.inlcluir(data.nome, data.observacao, data.tipo,data.embalagemQuantidade, data.embalagemMedida),
            this.service.atualizar(value!, data.nome, data.observacao, data.tipo, data.embalagemQuantidade, data.embalagemMedida),
          ),
        ),
        catchError((error: any) => {
          console.error(error);
          this._messageService.error(MSG_ERRO_PROCSSAMENTO, parseErroResponse(error));
          return EMPTY;
        }),
        finalize(() => {
          this.form.setValue({
            _id: null,
            nome: null,
            observacao: null,
            tipo: null,
            embalagemQuantidade: null,
            embalagemMedida: null,
          });
        }),
      )
      .subscribe({
        next: () => {
          this.visibleChange.emit(false);
          this._messageService.info(MSG_ATUALIZADO_SUCESSO);
        },
      });
  }
}
