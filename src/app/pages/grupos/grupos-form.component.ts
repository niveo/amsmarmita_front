import { Component, computed, inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { EMPTY, catchError, finalize, iif, mergeMap, of } from 'rxjs';
import { MSG_ERRO_PROCSSAMENTO } from '@navegador/common/constantes';
import { Grupo } from '@navegador/model';
import { GrupoService } from '@navegador/services/grupo.service';
import { validarFormulario } from '@navegador/common/util';
import { BaseFormComponent } from '@navegador/componentes/base-form.component';

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
export class GrupoFormComponent extends BaseFormComponent<Grupo> {
  private readonly service = inject(GrupoService);

  loading = computed(() => this.service?.loading() || false);

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
    somarRelatorio: [false],
  });

  ngOnInit() {
    this.form.setValue({
      _id: this.data()._id || '',
      nome: this.data().nome! || '',
      principal: this.data().principal || false,
      multiplo: this.data().multiplo || false,
      observacao: this.data().observacao || '',
      cor: this.data().cor || '',
      somarRelatorio: this.data().somarRelatorio || false,
    });
  }

  salvar() {
    if (!this.form.valid) {
      validarFormulario(this.form);
      return;
    }

    const data = this.form.value;

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
              somarRelatorio: data.somarRelatorio,
            }),
          ),
        ),
        catchError((error: any) => {
          console.error(error);
          this._messageService.error(MSG_ERRO_PROCSSAMENTO, JSON.parse(error));
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
            somarRelatorio: false,
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
