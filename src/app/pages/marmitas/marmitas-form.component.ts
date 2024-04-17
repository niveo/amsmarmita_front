import { Component, computed, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY, catchError, finalize, iif, mergeMap, of } from 'rxjs';
import { MSG_ERRO_PROCSSAMENTO } from '@navegador/common/constantes';
import { Marmita } from '@navegador/model';
import { MarmitaService } from '@navegador/services/marmita.service';
import { BaseFormComponent } from '@navegador/componentes/base-form.component';

@Component({
  selector: 'app-marmitas-form-component',
  templateUrl: './marmitas-form.component.html',
})
export class MarmitasFormComponent extends BaseFormComponent<Marmita> {
  private readonly service = inject(MarmitaService);

  loading = computed(() => this.service?.loading() || false);

  form: FormGroup<{
    _id: FormControl<string | null>;
    lancamento: FormControl<any | null>;
    observacao: FormControl<string | null>;
  }> = this.formBuilder.group({
    _id: [''],
    lancamento: ['', [Validators.required]],
    observacao: ['', Validators.maxLength(100)],
  });

  ngOnInit() {
    this.form.setValue({
      _id: this.data()._id || '',
      lancamento: this.data().lancamento || null,
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
            this.service.inlcluir(data.lancamento!, data.observacao),
            this.service.atualizar(value!, data.lancamento!, data.observacao),
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
            lancamento: null,
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
