import { Component, computed, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY, catchError, finalize, iif, mergeMap, of } from 'rxjs';
import { MSG_ERRO_PROCSSAMENTO } from '@navegador/common/constantes';
import { Comedor } from '@navegador/model';
import { ComedoresService } from '@navegador/services/comedores.service';
import { BaseFormComponent } from '@navegador/componentes/base-form.component';

@Component({
  selector: 'app-comedores-form-component',
  templateUrl: './comedores-form.component.html',
  styles: `
    :host {
      background-color: white;
      height: 100%;
    }
  `,
})
export class ComedoresFormComponent extends BaseFormComponent<Comedor> {
  private readonly service = inject(ComedoresService);

  loading = computed(() => this.service?.loading() || false);

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
    this.form.setValue({
      _id: this.data()._id || '',
      nome: this.data().nome || '',
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
            this.service.inlcluir(data.nome!),
            this.service.atualizar(value!, data.nome!),
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
            nome: '',
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
