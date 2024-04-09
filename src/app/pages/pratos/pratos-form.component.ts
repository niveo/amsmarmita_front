import { Component, OnInit, inject, input, output } from '@angular/core';
import { Grupo, Prato } from '../../model';
import { GrupoService } from '../../services/grupo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModelFormPrato } from './pratos.component';
import { validarFormulario } from '../../common/util';
import { PratoStore } from '../../stores/prato.store';
import { EMPTY, catchError, finalize } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LBL_ERRO, MSG_ERRO_PROCSSAMENTO } from '../../common/constantes';
import { MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-pratos-form-component',
  templateUrl: './pratos-form.component.html',
})
export class PratosFormComponent implements OnInit {
  private readonly grupoService = inject(GrupoService);
  private readonly formBuilder = inject(FormBuilder);
  readonly pratoStore = inject(PratoStore);
  private readonly notify = inject(NzNotificationService);

  grupos?: Grupo[];

  announcer = inject(LiveAnnouncer);

  visible = input.required<boolean>();
  visibleChange = output<boolean>();
  isConfirmLoading = false;
  data = input.required<Prato>();

  form: FormGroup<ModelFormPrato> = this.formBuilder.group({
    _id: [''],
    nome: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(50)],
    ],
    grupo: ['', [Validators.required]],
    composicoes: [['']],
    observacao: ['', Validators.maxLength(100)],
    ingredientes: [['']],
  });

  ngOnInit() {
    this.grupoService.data$.subscribe((response) => (this.grupos = response));

    this.form.setValue({
      _id: this.data()._id || '',
      grupo: this.data().grupo?._id || '',
      nome: this.data().nome || '',
      composicoes: this.data().composicoes || [],
      observacao: this.data().observacao || '',
      ingredientes: this.data().ingredientes || [],
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
        composicoes: data.composicoes,
        grupo: data.grupo!,
        ingredientes: data.ingredientes,
        observacao: data.observacao,
      })
      .pipe(
        catchError((error: any) => {
          console.error(error);
          this.notify.error(LBL_ERRO, MSG_ERRO_PROCSSAMENTO);
          this.isConfirmLoading = false;
          return EMPTY;
        }),
        finalize(() => {
          this.form.setValue({
            _id: '',
            nome: '',
            grupo: '',
            composicoes: [],
            observacao: '',
            ingredientes: [],
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

  removeKeyword(keyword: string) {
    const index = this.form.value.composicoes!.indexOf(keyword);
    if (index >= 0) {
      this.form.value.composicoes!.splice(index, 1);

      this.announcer.announce(`removed ${keyword}`);
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
  }
}
