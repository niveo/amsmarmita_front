import { Component, OnInit, computed, inject } from '@angular/core';
import { Grupo, Prato } from '@navegador/model';
import { GrupoService } from '@navegador/services/grupo.service';
import { FormGroup, Validators } from '@angular/forms';
import { ModelFormPrato } from './pratos.component';
import { parseErroResponse, validarFormulario } from '@navegador/common/util';
import { PratoStore } from '@navegador/stores/prato.store';
import { EMPTY, catchError, finalize } from 'rxjs';
import { MSG_ERRO_PROCSSAMENTO } from '@navegador/common/constantes';
import { MatChipInputEvent } from '@angular/material/chips';
import { BaseFormComponent } from '@navegador/componentes/base-form.component';

@Component({
  selector: 'app-pratos-form-component',
  templateUrl: './pratos-form.component.html',
})
export class PratosFormComponent
  extends BaseFormComponent<Prato>
  implements OnInit {
  private readonly grupoService = inject(GrupoService);
  readonly pratoStore = inject(PratoStore);

  grupos?: Grupo[];

  form: FormGroup<ModelFormPrato> = this.formBuilder.group({
    _id: [''],
    nome: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(50)],
    ],
    grupo: ['', [Validators.required]],
    observacao: ['', Validators.maxLength(100)],
    pratoIngredientes: []
  });

  loading = computed(() => this.pratoStore?.loading() || false);

  ngOnInit() {
    this.grupoService.data$.subscribe((response) => (this.grupos = response));

    const data = this.data()!;
    this.form.setValue({
      _id: data._id || '',
      grupo: data.grupo?._id || '',
      nome: data.nome || '',
      observacao: data.observacao || '',
      pratoIngredientes: data.pratoIngredientes
    });
  }

  salvar() {
    if (!this.form.valid) {
      validarFormulario(this.form);
      return;
    }

    const data = this.form.value;

    this.pratoStore
      .salvar({
        _id: data._id,
        nome: data.nome!,
        composicoes: [],
        grupo: data.grupo!,
        ingredientes: [],
        observacao: data.observacao,
        icone: null,
        pratoIngredientes: data.pratoIngredientes
      })
      .pipe(
        catchError((error: any) => {
          console.error(error);
          this._messageService.error(MSG_ERRO_PROCSSAMENTO, parseErroResponse(error));
          return EMPTY;
        }),
        finalize(() => {
          this.form.setValue({
            _id: '',
            nome: '',
            grupo: '',
            observacao: '',
            pratoIngredientes: []
          });
        }),
      )
      .subscribe({
        next: () => {
          this.visibleChange.emit(false);
        },
      });
  }

  /*removeKeyword(keyword: string) {
    const index = this.form.value.composicoes!.indexOf(keyword);
    if (index >= 0) {
      this.form.value.composicoes!.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.form.value.composicoes!.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }*/
}
